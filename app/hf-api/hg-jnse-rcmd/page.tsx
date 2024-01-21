'use client'

import { useState, useEffect, useRef } from 'react';

import Title from '@/app/ui/title';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';

import { NumericFormat } from 'react-number-format';
import InputAdornment from '@mui/material/InputAdornment';

export default function RentLoanMultiInfo() {

  let [rentGrntAmt, setRentGrntAmt] = useState();
  let [grntLst, setGrntLst] = useState([]);

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
  }

  return (
    <div className="">
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          HF 전세자금보증 추천{rentGrntAmt}
        </blockquote>
      </div>
      <Paper sx={{m:4, p:8, display: 'flex', gap: 8}}>
        <NumericFormat
          label="임차보증금액"
          value={rentGrntAmt}
          customInput={TextField}
          InputProps={{
            endAdornment: <InputAdornment position="start">원</InputAdornment>,
          }}
          allowNegative={false}
          thousandSeparator
          onValueChange={({ value }) => setRentGrntAmt(Number(value))}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || floatValue < 1000000000;
          }}
          decimalScale={0}
        />
        <TextField
          id="trgtLwdgCd" label="목적물주소 법정동코드" variant="standard"
          inputProps={{min: 0, maxLength:10 }}
          onChange={e => {
          }}
        />
      </Paper>
      <div className="m-8 lg:mx-20">
        <Button variant="contained" size="large" onClick={getData}>조회</Button>
      </div>
      <div className="m-4 flex flex-wrap">
      </div>
    </div>
  )
}

