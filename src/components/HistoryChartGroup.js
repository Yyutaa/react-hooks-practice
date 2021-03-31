/*
 * @Author: your name
 * @Date: 2021-03-30 15:42:18
 * @LastEditTime: 2021-03-31 11:45:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/components/HistoryChartGroup.js
 */
import React, { useContext } from "react";

import HistoryChart from "./HistoryChart";
import { transformHistory } from "../utils";
import { AppDispatch } from '../App'

function HistoryChartGroup({ history = {}, lastDays = {} }) {
  const dispatch = useContext(AppDispatch);

  const onChange = (e, key) => {
    dispatch(({ type: "SET_LASTDAYS", key,  days: e.target.value}));
  }

  return (
    <div className="history-group">
      <HistoryChart
        title="Cases"
        data={transformHistory(history.cases)}
        lastDays={lastDays.cases}
        onChange={(e) => onChange(e, 'cases')}
      />
      <HistoryChart
        title="Deaths"
        data={transformHistory(history.cases)}
        lastDays={lastDays.deaths}
        onChange={(e) => onChange(e, 'deaths')}
      />
      <HistoryChart
        title="Recovered"
        data={transformHistory(history.cases)}
        lastDays={lastDays.recovered}
        onChange={(e) => onChange(e, 'recovered')}
      />
    </div>
  );
}

export default HistoryChartGroup;