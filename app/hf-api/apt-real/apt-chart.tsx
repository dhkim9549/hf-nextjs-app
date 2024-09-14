import { useEffect, useRef } from 'react';
// import billboard.js
import bb, { scatter } from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AptChart({aptList, clearAptList}) {

  let chartRef = useRef();

  useEffect(() => {

    if(chartRef.current) {
      chartRef.current.unload();
    }

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
        xArr.push(trd.ctrtDy.substring(0, 4) + '-' + trd.ctrtDy.substring(4, 6) + '-' + trd.ctrtDy.substring(6, 8));
	yArr.push(trd.prc);
	if(maxY < trd.prc) {
          maxY = 1.02 * trd.prc;
	}
	if(!xTickValues.includes(trd.ctrtDy.substring(0, 4) + '-01-01')) {
          xTickValues.push(trd.ctrtDy.substring(0, 4) + '-01-01');
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
          },
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
      grid: {
        x: {
          show: false
        },
        y: {
          show: true
        }
      },
      size: {
        width: Math.min(700, window.innerWidth - 50),
        height: 400 
      },
      padding: {
        left: 50
      },
      bindto: "#chart2"
    });

    chartRef.current = chart2;

  }, [aptList]);

  return (
    <div className="my-20 ml-5 flex flex-col">
      <div id="chart2"></div>
      <div className="px-10">
        <IconButton aria-label="delete" size="large"
          disabled={aptList.length > 0 ? false : true}
          onClick={() => {
            clearAptList();
	  }}
	>
          <DeleteIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  )
}
