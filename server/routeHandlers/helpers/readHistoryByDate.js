const DateRange = require('./createDateArray');
const getUser = require('./getUser');
const getAllUserDomainIdsByDatesAndUserId = require('./getAllUserDomainIdsByDatesAndUserId');
const mapDomainIdsArrayToDatesDataObject = require('./mapDomainIdsArrayToDatesDataObject');
const getFinalDatesDataObject = require('./getFinalDatesDataObject');


const readHistoryByDate = (chromeID, dateRange) => {
  let dates;

  let startDay = dateRange.startDate.day;
  let endDay = startDay - dateRange.daysAgo;
  let year = dateRange.startDate.year;
  let month = dateRange.startDate.month;

  dates = new DateRange(startDay, month, year, endDay).createDateArray();

  return getUser(chromeID)
    .then((userID) => {
      return getAllUserDomainIdsByDatesAndUserId(userID, dates);
    })
    .then((domainIdsArray) => {  
      return mapDomainIdsArrayToDatesDataObject(domainIdsArray);
    })
    .then((domainIdsDatesDataObject) => {
      return getFinalDatesDataObject(domainIdsDatesDataObject);
    });
}

module.exports = readHistoryByDate;
