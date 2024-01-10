'use client'

import { useState } from 'react';
import Title from '@/app/ui/title';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import Button from '@mui/material/Button';

export default function RentLoanMultiInfo() {

  let [loanYm, setLoanYm] = useState();

  function getData() {
    console.log("getData()");
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
    </>
  )
}

