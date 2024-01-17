'use client'

import { useState, useEffect, useRef } from 'react';
import Title from '@/app/ui/title';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Button from '@mui/material/Button';

import BChart from './b-chart';


function RentList({bankLst}) {

  const listItems = bankLst.map(item =>
    <li key={item.bankNm}>
      {item.bankNm}: {item.avgLoanRat2}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  )
}

export default function RentLoanMultiInfo() {

  let [loanYm, setLoanYm] = useState();
  let [bankLst, setBankLst] = useState([]);
  let [chartData, setChartData] = useState();

  async function getData() {
  
    console.log("getData()");
   
    let apiStr = ""
      + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
      + "&pageNo=1"
      + "&numOfRows=30"
      + "&dataType=JSON"
      ;
  
    let res = await fetch("https://apis.data.go.kr/B551408/rent-loan-rate-multi-dimensional-info/dimensional-list"
      + apiStr
      + "&loanYm=" + loanYm,
      { next: { revalidate: 30 } }
    );
  
    let rentJson = await res.json();
    setBankLst(rentJson.body.items);

    let chartDataArr = [];
    rentJson.body.items.forEach((e) => {
      let eDataArr = [];
      eDataArr.push(e.bankNm);
      eDataArr.push(e.loanAmt);
      chartDataArr.push(eDataArr);
    })
    let chartDataObj = {"chartDataArr" : chartDataArr};
    console.log("chartObj = " + JSON.stringify(chartDataObj));

    setChartData(chartDataObj);

  }

  return (
    <>
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          은행별 전세대출 금리 조회
        </blockquote>
      </div>
      <div className="m-4 p-8 bg-white rounded-lg" id="input_area">
        <label>조회구분을 선택하세요....{loanYm}</label>
        <RadioGroup
          row
          name="loanYm"
          onChange={(e) => setLoanYm(e.target.value)}
        >
          <FormControlLabel value="L1M" control={<Radio />} label="최근 1개월" />
          <FormControlLabel value="L3M" control={<Radio />} label="최근 3개월" />
          <FormControlLabel value="L1Y" control={<Radio />} label="최근 1년" />
        </RadioGroup>
      </div>
      <div className="mx-8 lg:mx-20 my-8">
        <Button variant="outlined" size="large" onClick={getData}>조회</Button>
      </div>
      <div className="flex flex-wrap">
        <div className="mx-8 lg:mx-20 my-8 p-8">
          <ul><RentList bankLst={bankLst} /></ul>
        </div>
          {chartData &&
            <div className="w-full lg:w-[550px]">
              <div className="flex place-content-center">
                대출실행금액
              </div>
              <div className="w-full lg:w-[550px] lg:h-[700px]">
                <BChart chartData={chartData}/>
              </div>
            </div>
          }
      </div>
    </>
  )
}

