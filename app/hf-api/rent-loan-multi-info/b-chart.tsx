'use client'

import React, {useEffect, useRef} from "react";

// import billboard.js
import bb, {donut} from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

// import react wrapper
import BillboardJS, {IChart} from "@billboard.js/react";
// const BillboardJS = require("@billboard.js/react");  // for CJS

export default function BChart({chartData}) {

  // to get the instance, create ref and pass it to the component
  const chartComponent = useRef<IChart>();
  const options = {
    data: {
      columns: [
      ],
      type: donut() // for ESM specify as: bar()
    }
  };

  useEffect(() => {
    console.log("useEffet()");
    // get the instance from ref
    const chart = chartComponent.current?.instance;

    // call APIs
    if (chart) {
      console.log("load...");
      console.log("chartData = " + JSON.stringify(chartData));

      chart.load({
        columns: chartData?.chartDataArr,
      });
    }
  });

  return (
    <BillboardJS bb={bb} options={options} ref={chartComponent} />
  );
}
