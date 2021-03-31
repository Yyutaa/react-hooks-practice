/*
 * @Author: your name
 * @Date: 2021-03-29 13:56:47
 * @LastEditTime: 2021-03-29 15:06:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/hooks/useCoronaAPI.js
 */
import { useState, useEffect, useCallback } from 'react';

const BASE_URL = "https://corona.lmao.ninja/v2";

export function  useCoronaAPI(path, { initialData = null, converter = (data) => data, refetchInterval = null }) {
  const [data, setData] = useState(initialData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const convertData = useCallback(converter, []);

  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`${BASE_URL}${path}`);
      const data = await response.json();
      setData(converter(data));
    }

    fetchData();
    if (refetchInterval) {
      const intervalId = setInterval(fetchData, refetchInterval);

      return () => clearInterval(intervalId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ path, refetchInterval, convertData])

  return data;
}