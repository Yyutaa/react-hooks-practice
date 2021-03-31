/*
 * @Author: your name
 * @Date: 2021-03-29 11:51:56
 * @LastEditTime: 2021-03-29 13:42:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/components/SelectDataKey.js
 */
import React from "react";

function SelectDataKey({ onChange }) {
  return (
    <>
      <label htmlFor='key-select'>Select a key for sorting: </label>
      <select id='key-select' onChange={onChange}>
        <option value='cases'>Cases</option>
        <option value='todayCases'>Today Cases</option>
        <option value='deaths'>Death</option>
        <option value='recovered'>Recovered</option>
        <option value='active'>Active</option>
      </select>
    </>
  );
}

export default SelectDataKey;