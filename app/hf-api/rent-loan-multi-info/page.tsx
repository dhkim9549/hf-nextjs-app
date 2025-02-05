'use client'

import { useState } from 'react';
import { useEffect } from 'react';
import { use } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import Title from '@/app/ui/title';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';

import DataGrid from './m-table';
import BChart from './b-chart';
import MySkel from './MySkel';
import { getLoanRateData } from './get-data';

export default function RentLoanMultiInfo({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {

  console.log("params = " + JSON.stringify(use(params)));
  console.log("searchParams = " + JSON.stringify(use(searchParams)));

  const pathname = usePathname();
  const { replace } = useRouter();

  let [loanYm, setLoanYm] = useState(use(searchParams).loanYm ?? "L1M");
  let [bankLst, setBankLst] = useState([]);
  let [chartData, setChartData] = useState();

  useEffect(() => {
    getData();
  }, [loanYm]);

  async function getData() {

    console.log("getData() start...");

    let params = new URLSearchParams();
    params.set("loanYm", loanYm);
    replace(`${pathname}?${params.toString()}`);

    setChartData();

    let items = await getLoanRateData(loanYm);
  
    setBankLst(items);

    let chartDataArr = [];
    items.forEach((e) => {
      let eDataArr = [];
      eDataArr.push(e.bankNm);
      eDataArr.push(e.loanAmt);
      chartDataArr.push(eDataArr);
    })
    let chartDataObj = {"chartDataArr" : chartDataArr};
    setChartData(chartDataObj);

    console.log("getData() end...");
  }

  return (
    <div className="">
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          은행별 전세대출 금리 조회
        </blockquote>
      </div>
      <Paper className="m-4 p-8">
        <label>조회구분을 선택하세요.</label>
        <RadioGroup
          row
          name="loanYm"
          defaultValue={use(searchParams).loanYm ?? "L1M"}
          onChange={(e) => {
            setLoanYm(e.target.value)
          }}
        >
          <FormControlLabel sx={{ mr:2 }} value="L1M" control={<Radio />} label="최근 1개월" />
          <FormControlLabel sx={{ mr:2 }} value="L3M" control={<Radio />} label="최근 3개월" />
          <FormControlLabel sx={{ mr:2 }} value="L1Y" control={<Radio />} label="최근 1년" />
        </RadioGroup>
      </Paper>
      <div className="m-4 flex flex-wrap">
         {chartData ? 
           <>
             <div className="w-full sm:w-[500px]">
               <DataGrid bankList={bankLst} />
             </div>
             <div className="mt-16 sm:mt-0 px-8 w-full lg:w-[550px]">
               <div className="mb-4 w-full text-center">
                 대출실행금액
               </div>
               <div className="">
                 <BChart chartData={chartData}/>
               </div>
             </div>
          </>
          : <MySkel/>
         }
      </div>
    </div>
  )
}

