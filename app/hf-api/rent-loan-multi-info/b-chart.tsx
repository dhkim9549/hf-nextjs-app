'use client'

import React, {useEffect, useRef} from "react";

// import billboard.js
import bb, {pie} from "billboard.js";
import "billboard.js/dist/billboard.css";  // default css

// import react wrapper
import BillboardJS, {IChart} from "@billboard.js/react";

export default function BChart({chartData}) {

  // to get the instance, create ref and pass it to the component
  const chartComponent = useRef<IChart>();
  const options = {
    data: {
      columns: [
      ],
      type: pie() // for ESM specify as: bar()
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
        columns: chartData?.chartDataArr
      });
    }
  }, [chartData]);

  return (
    <BillboardJS bb={bb} options={options} ref={chartComponent} />
  );
}