'use client'

import { useState, useEffect} from 'react';

import { getRcmdData } from './get-data';
import Title from '@/app/ui/title';
import GrntProd from './grnt-prod';
import DataGo from './data-go';
import Footer from './footer';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { NumericFormat } from 'react-number-format';
import InputAdornment from '@mui/material/InputAdornment';

export default function RentLoanMultiInfo() {

  let [stts, setStts] = useState();
  let [rentGrntAmt, setRentGrntAmt] = useState();
  let [trgtLwdgCd, setTrgtLwdgCd] = useState();
  let [age, setAge] = useState();

  let [prodLst, setProdLst] = useState();

  async function getRcmdDataWrap() {
    setStts(1);
    setProdLst(null);
    let items = await getRcmdData(rentGrntAmt, trgtLwdgCd, age);
    setProdLst(items);
  }

  return (
    <div className="">
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          HF 전세자금보증 추천
        </blockquote>
      </div>
      <Paper className="m-4 p-12 flex flex-wrap flex-col lg:flex-row gap-3 lg:gap-12">
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
          variant="filled"
        />
        <TextField
          id="trgtLwdgCd" label="목적물주소 법정동코드" variant="filled"
          inputProps={{min: 0, maxLength:10 }}
          onChange={e => {
            setTrgtLwdgCd(e.target.value);
          }}
        />
        <NumericFormat
          label="만 나이"
          value={age}
          customInput={TextField}
          allowNegative={false}
          onValueChange={({ value }) => setAge(Number(value))}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || floatValue < 1000;
          }}
          decimalScale={0}
          variant="filled"
        />
 
      </Paper>
      <div className="m-8 lg:mx-20">
        <Button variant="contained" size="large" onClick={getRcmdDataWrap}>조회</Button>
      </div>
      {stts ? <ProdLst prodLst={prodLst} /> : ""}
      <DataGo />
      <Footer />
   </div>
  )
}

function ProdLst({prodLst}) {
  return (
    <>
      <div className="m-4 flex flex-wrap gap-3">
       {prodLst ? prodLst.map(x => 
         <GrntProd
           key={x.rcmdProrRnk}
           prodObj={x}
         />
       ) : "loading..."}
      </div>
      {prodLst &&
        <div className="m-4 p-4">
          {prodLst.length} 건이 조회되었습니다.
        </div>
      }
    </>
  )
}
