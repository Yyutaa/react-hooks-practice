/*
 * @Author: your name
 * @Date: 2021-03-30 16:09:07
 * @LastEditTime: 2021-03-30 16:13:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /covid-19-with-hooks/src/utils.js
 */

export function transformHistory(timeLine = {}) {
  return Object.entries(timeLine).map((entry) => {
    const [time, number] = entry;
    return {
      time,
      number
    }
  })
}