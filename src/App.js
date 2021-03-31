/*
 * @Author: your name
 * @Date: 2021-03-29 10:50:51
 * @LastEditTime: 2021-03-31 11:51:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/App.js
 */
import React, { useReducer } from 'react'
import GlobalStats from "./components/GlobalStats";
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
import HistoryChartGroup from "./components/HistoryChartGroup";
import { useCoronaAPI } from './hooks/useCoronaAPI'
import './App.css';

const initialState = {
  key: 'cases',
  country: null,
  lastDays: {
    cases: 30,
    deaths: 30,
    recovered: 30,
  }
}

const reducer = (state, action) => {
  const { key, country, days } = action;

  switch(action.type) {
    case 'SET_KEY':
      return {
        ...state,
        key: key,
      }
    case 'SET_COUNTRY':
      return {
        ...state,
        country: country,
      }
    case 'SET_LASTDAYS':
      return {
        ...state,
        lastDays: {
          ...state.lastDays,
          [key]: days,
        }
      }
      default:
        return state;
  }
}

// 用于传递给 dispatch 创建一个context
export const AppDispatch = React.createContext(null);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { key, country, lastDays } = state;

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

  return (
    <AppDispatch.Provider value={dispatch}>
      <div className="App">
        <h1>COVID-19</h1>
        <GlobalStats stats={globalStats} />
        <SelectDataKey />
        <CountriesChart data={countries} dataKey={key} />
        {country ? (
          <>
            <h2>History for {country}</h2>
            <HistoryChartGroup history={history} lastDays={lastDays} />
          </>
        ) : (
            <h2>Click on a country to show its history.</h2>
        )}
      </div>
    </AppDispatch.Provider>
  );
}

export default App;
