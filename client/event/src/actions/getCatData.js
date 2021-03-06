'use strict';

import axios from 'axios';
import HostPort from './hostPort';

function finalGetCatData (catData) {
  const data = {
    type: 'GET_CAT_DATA',
    payload: catData,
  };

  return data;
}

function getTimeHistoryLastFetched (time) {
  const data = {
    type: 'CATDATA_LAST_FETCHED',
    payload: time,
  };

  return data;
}

export default function getCatData() {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `${HostPort}/api/catData`,
    }).then((response) => {
      dispatch(finalGetCatData(response.data));
      const time = (new Date).getTime();
      dispatch(getTimeHistoryLastFetched(time));
    });
  };
}
