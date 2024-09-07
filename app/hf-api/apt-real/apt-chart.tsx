import { useEffect, useState, useRef } from 'react';

// import billboard.js
import bb, {scatter} from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

// import react wrapper
import BillboardJS, {IChart} from "@billboard.js/react";

export default function AptChart({aptList}) {

  const chartRef = useRef();

  // to get the instance, create ref and pass it to the component
  const chartComponent = useRef<IChart>();
  const options = {
    legend: {
      position: "bottom"
    },
    data: {
      xs: {},
      columns: [
      ],
      type: scatter() // for ESM specify as: bar()
    },
    axis: {
      x: {
        type: "timeseries"
      },
      tick: {
        format: "%Y",
        values: ["2013-01-02", "2019-01-03"]
      }
    }
  };

  useEffect(() => {
    // get the instance from ref
    const chart = chartComponent.current?.instance;

    let chartData = {};
    chartData.xs = {};
    chartData.columns = [];

    aptList.forEach((apt) => {
      chartData.xs[apt.aptNm + apt.area] = apt.aptNm + apt.area + '_x';
      let xArr = [apt.aptNm + apt.area + '_x'];
      let yArr = [apt.aptNm + apt.area];
      apt.trd.forEach((trd) => {
        xArr.push(trd.ctrtYm.substring(0, 4) + '-' + trd.ctrtYm.substring(4, 6) + '-01');
	yArr.push(trd.prc);
      });
      chartData.columns.push(xArr);
      chartData.columns.push(yArr);
   });

    console.log(JSON.stringify(chartData, null, 2));

    // call APIs
    if (chart) {
      chart.load(chartData);
    }
  }, [aptList]);

  return (
    <div className="m-5">
      <BillboardJS bb={bb} options={options} ref={chartComponent} />
    </div>
  )
}
