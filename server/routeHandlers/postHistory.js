'use strict';

const postHistoryData = require('./helpers/postHistoryData');

module.exports.postHistory = (req, res) => {
  const chromeID = req.session.chromeID;
  const allHistory = req.body.history;

  postHistoryData(allHistory, chromeID)
    .then((visData) => {
      res.status(200).json(visData);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
};

