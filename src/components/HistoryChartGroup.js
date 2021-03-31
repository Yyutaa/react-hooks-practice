/*
 * @Author: your name
 * @Date: 2021-03-30 15:42:18
 * @LastEditTime: 2021-03-30 16:50:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/components/HistoryChartGroup.js
 */
import React, { useState } from "react";

import HistoryChart from "./HistoryChart";
import { transformHistory } from "../utils";

function HistoryChartGroup({ history = {} }) {
  const [lastDays, onChangeLastDays] = useState({
    cases: 30,
    deaths: 30,
    recovered: 30
  })

  const onChange = (e, key) => {
    onChangeLastDays((prev) => ({ ...prev, [key]: e.target.value }));
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