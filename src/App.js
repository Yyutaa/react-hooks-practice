/*
 * @Author: your name
 * @Date: 2021-03-29 10:50:51
 * @LastEditTime: 2021-03-30 16:58:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/App.js
 */
import React, { useState } from 'react'
import './App.css';

import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
import HistoryChartGroup from "./components/HistoryChartGroup";
import { useCoronaAPI } from './hooks/useCoronaAPI'

function App() {
  const [key, changeSelectKey] = useState('case');
  const [country, setCountry] = useState(null);

  const globalStats = useCoronaAPI("/all", {
    initialData: {},
    // refetchInterval: 60000,
  });

  const countries = useCoronaAPI(`/countries?sort=${key}`, {
    initialData: [],
    converter: (data) => data.slice(0, 10)
  })

  const history = useCoronaAPI(`/historical/${country}`, {
    initialData: {},
    converter: (data) => data.timeline,
  })

  const onChange = (e) => {
    changeSelectKey(e.target.value);
  }

  return (
    <div className="App">
      <h1>COVID-19</h1>
      <GlobalStats stats={globalStats} />
      <SelectDataKey onChange={onChange} />
      <CountriesChart data={countries} dataKey={key} onClick={(payload) => setCountry(payload.activeLabel)} />
      {country ? (
        <>
          <h2>History for {country}</h2>
          <HistoryChartGroup history={history} />
        </> 
      ) : (
          <h2>Click on a country to show its history.</h2>
      )}
    </div>
  );
}

export default App;
