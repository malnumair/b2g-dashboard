// B2G Dashboard — Google Apps Script Write-Back
// Deploy as: Extensions → Apps Script → Deploy → New Deployment → Web App
// Execute as: Me | Access: Anyone
// After deploying, copy the URL and paste it into Dashboard Settings → Apps Script URL

var BD_SHEET     = 'Opertotioty'; // intentional — matches existing tab name
var PM_PROJ_SHEET = 'PM Projects';
var PM_TASK_SHEET = 'PM Tasks';
var LOG_SHEET     = '_log';

function doPost(e) {
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var action = payload.action || 'insert';

    // ── BD Pipeline actions ──
    if (action === 'insert') {
      var sheet = getOrCreateSheet(ss, BD_SHEET, ['Proposal Name','Client','Contact Person','Date Submitted','Value (SAR)','Probability','Stage','Status','Channel','Expected Decision','Actual Decision','Cycle Time (Days)','Reason Won/Lost','Owner','Active/Inactive','Next Action','Priority','Risk Level','Notes']);
      var row = [
        payload.proposalName || '', payload.client || '', payload.contactPerson || '',
        payload.dateSubmitted || '', payload.valueSAR || '', payload.probability || '',
        payload.stage || 'Proposal Submitted', payload.status || 'Pending', payload.channel || '',
        '', '', '', '',
        payload.owner || '', payload.activeStatus || 'Active',
        payload.nextAction || '', payload.priority || '',
        payload.risk || '', payload.notes || ''
      ];
      sheet.appendRow(row);
      writeLog(ss, action, payload.proposalName, payload.client, sheet.getLastRow());
      return jsonResponse({status: 'ok', row: sheet.getLastRow()});
    }

    if (action === 'update') {
      var sheet = ss.getSheetByName(BD_SHEET);
      if (!sheet) return jsonResponse({status: 'error', message: 'Sheet not found'});
      var rowNum = parseInt(payload.rowNum);
      if (!rowNum || rowNum < 2) return jsonResponse({status: 'error', message: 'Invalid row'});
      // Find the Active/Inactive column dynamically
      var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      var activeCol = -1;
      for (var h = 0; h < headers.length; h++) {
        var hv = String(headers[h]).toLowerCase().trim();
        if (hv === 'active/inactive' || hv === 'active / inactive' || hv === 'active') { activeCol = h + 1; break; }
      }
      // Update core columns 1-9
      var vals = [
        payload.proposalName || '', payload.client || '', payload.contactPerson || '',
        payload.dateSubmitted || '', payload.valueSAR || '', payload.probability || '',
        payload.stage || '', payload.status || '', payload.channel || ''
      ];
      sheet.getRange(rowNum, 1, 1, 9).setValues([vals]);
      // Update Owner (col 14)
      sheet.getRange(rowNum, 14).setValue(payload.owner || '');
      // Update Active/Inactive if column found
      if (activeCol > 0) sheet.getRange(rowNum, activeCol).setValue(payload.activeStatus || 'Active');
      // Find and update remaining columns by header
      var colMap = {};
      for (var ci = 0; ci < headers.length; ci++) colMap[String(headers[ci]).trim()] = ci + 1;
      if (colMap['Next Action']) sheet.getRange(rowNum, colMap['Next Action']).setValue(payload.nextAction || '');
      if (colMap['Priority']) sheet.getRange(rowNum, colMap['Priority']).setValue(payload.priority || '');
      if (colMap['Risk Level'] || colMap['Risk']) sheet.getRange(rowNum, colMap['Risk Level'] || colMap['Risk']).setValue(payload.risk || '');
      if (colMap['Notes']) sheet.getRange(rowNum, colMap['Notes']).setValue(payload.notes || '');
      writeLog(ss, action, payload.proposalName, payload.client, rowNum);
      return jsonResponse({status: 'ok', row: rowNum});
    }

    // ── PM Projects actions ──
    if (action === 'insertProject') {
      var sheet = getOrCreateSheet(ss, PM_PROJ_SHEET, ['Project Name','Client','Contract Value','Start Date','End Date','Status','% Complete','PM Owner','BD Proposal','Notes']);
      var row = [
        payload.projectName || '', payload.client || '', payload.contractValue || '',
        payload.startDate || '', payload.endDate || '', payload.status || 'Active',
        payload.pctComplete || 0, payload.pmOwner || '', payload.bdProposal || '',
        payload.notes || ''
      ];
      sheet.appendRow(row);
      writeLog(ss, action, payload.projectName, payload.client, sheet.getLastRow());
      return jsonResponse({status: 'ok', row: sheet.getLastRow()});
    }

    if (action === 'updateProject') {
      var sheet = ss.getSheetByName(PM_PROJ_SHEET);
      if (!sheet) return jsonResponse({status: 'error', message: 'PM Projects sheet not found'});
      var rowNum = parseInt(payload.rowNum);
      if (!rowNum || rowNum < 2) return jsonResponse({status: 'error', message: 'Invalid row'});
      var vals = [
        payload.projectName || '', payload.client || '', payload.contractValue || '',
        payload.startDate || '', payload.endDate || '', payload.status || '',
        payload.pctComplete || 0, payload.pmOwner || '', payload.bdProposal || '',
        payload.notes || ''
      ];
      sheet.getRange(rowNum, 1, 1, 10).setValues([vals]);
      writeLog(ss, action, payload.projectName, payload.client, rowNum);
      return jsonResponse({status: 'ok', row: rowNum});
    }

    // ── PM Tasks actions ──
    if (action === 'insertTask') {
      var sheet = getOrCreateSheet(ss, PM_TASK_SHEET, ['Task Name','Project','Assignee','Due Date','Status','Priority','Notes']);
      var row = [
        payload.taskName || '', payload.project || '', payload.assignee || '',
        payload.dueDate || '', payload.status || 'To Do', payload.priority || 'Medium',
        payload.notes || ''
      ];
      sheet.appendRow(row);
      writeLog(ss, action, payload.taskName, payload.project, sheet.getLastRow());
      return jsonResponse({status: 'ok', row: sheet.getLastRow()});
    }

    if (action === 'updateTask') {
      var sheet = ss.getSheetByName(PM_TASK_SHEET);
      if (!sheet) return jsonResponse({status: 'error', message: 'PM Tasks sheet not found'});
      var rowNum = parseInt(payload.rowNum);
      if (!rowNum || rowNum < 2) return jsonResponse({status: 'error', message: 'Invalid row'});
      var vals = [
        payload.taskName || '', payload.project || '', payload.assignee || '',
        payload.dueDate || '', payload.status || '', payload.priority || '',
        payload.notes || ''
      ];
      sheet.getRange(rowNum, 1, 1, 7).setValues([vals]);
      writeLog(ss, action, payload.taskName, payload.project, rowNum);
      return jsonResponse({status: 'ok', row: rowNum});
    }

    return jsonResponse({status: 'error', message: 'Unknown action: ' + action});

  } catch (err) {
    return jsonResponse({status: 'error', message: err.message});
  }
}

function doGet(e) {
  return jsonResponse({status: 'ok', message: 'B2G Dashboard Writer ready — supports BD + PM'});
}

// Creates sheet with headers if it doesn't exist
function getOrCreateSheet(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    // Bold + freeze header row
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function writeLog(ss, action, name, secondary, rowNum) {
  try {
    var log = ss.getSheetByName(LOG_SHEET);
    if (!log) {
      log = ss.insertSheet(LOG_SHEET);
      log.appendRow(['Timestamp', 'Action', 'Name', 'Secondary', 'Row']);
    }
    log.appendRow([new Date().toISOString(), action, name || '', secondary || '', rowNum]);
  } catch (e) {
    // Log failures are non-fatal
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
