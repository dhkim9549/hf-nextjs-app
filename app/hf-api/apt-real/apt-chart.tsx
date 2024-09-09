import { useEffect, useState, useRef } from 'react';

// import billboard.js
import bb, {scatter} from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

export default function AptChart({aptList}) {

  useEffect(() => {

    let chartData = {};
    chartData.xs = {};
    chartData.columns = [];
    let xTickValues = [];
    let maxY = 0;

    aptList.forEach((apt) => {
      chartData.xs[apt.aptNm + apt.area] = apt.aptNm + apt.area + '_x';
      let xArr = [apt.aptNm + apt.area + '_x'];
      let yArr = [apt.aptNm + apt.area];
      apt.trd.forEach((trd) => {
        xArr.push(trd.ctrtYm.substring(0, 4) + '-' + trd.ctrtYm.substring(4, 6) + '-01');
	yArr.push(trd.prc);
	if(maxY < trd.prc) {
          maxY = 1.02 * trd.prc;
	}
	if(!xTickValues.includes(trd.ctrtYm.substring(0, 4) + '-01-01')) {
          xTickValues.push(trd.ctrtYm.substring(0, 4) + '-01-01');
	}
      });
      chartData.columns.push(xArr);
      chartData.columns.push(yArr);
    });

    var chart2 = bb.generate({
      data: {
        xs: chartData.xs,
        columns: chartData.columns,
        type: scatter(), // for ESM specify as: line()
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%Y-%m-%d",
            values: xTickValues
          }
        },
        y: {
          label: {
            text: "만원",
            position: ""
          },
	  max: maxY,
	  min: 0,
	  padding: 0
        }
      },
      size: {
        width: 680,
        height: 358
      },
      bindto: "#chart2"
    });
  }, [aptList]);

  return (
    <div className="mt-20 ml-5">
      <div id="chart2">xxx</div>
    </div>
  )
}
