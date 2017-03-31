const mapHistoryToUniqueDomainsObj = (allHistory) => {
  // ============= add parsed domain to each history object in allData array ================
  let url, domain;
  allHistory.map((historyItem) => {
    url = historyItem.url;
    if (url.indexOf('://') > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
    if (domain.slice(0, 4) === 'www.') {
      domain = domain.slice(4);
    }
    domain = domain.split(':')[0];
    historyItem.domain = domain;
    return historyItem;
  });

  // ================ add unique domains to uniqueDomains object ============
  const uniqueDomains = {};

  allHistory.map((historyItem) => {
    if (uniqueDomains[historyItem.domain]) {
      return uniqueDomains[historyItem.domain].push(historyItem);
    }
    uniqueDomains[historyItem.domain] = [historyItem];
    return uniqueDomains[historyItem.domain];
  });

  return uniqueDomains;
};

module.exports = mapHistoryToUniqueDomainsObj;
