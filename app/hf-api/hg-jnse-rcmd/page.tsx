'use client'

import { useState } from 'react';

import Title from '@/app/ui/title';
import GrntProd from './grnt-prod';
import DataGo from './data-go';
import Footer from './footer';
import ProdPanel from './prod-panel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FormLabel from '@mui/material/FormLabel';

import { NumericFormat } from 'react-number-format';
import InputAdornment from '@mui/material/InputAdornment';

export default function RentLoanMultiInfo() {

  let [stts, setStts] = useState();
  let [rentGrntAmt, setRentGrntAmt] = useState();
  let [trgtLwdgCd, setTrgtLwdgCd] = useState();
  let [age, setAge] = useState();
  let [weddStcd, setWeddStcd] = useState();
  let [myIncmAmt, setMyIncmAmt] = useState();
  let [myTotDebtAmt, setMyTotDebtAmt] = useState();
  let [ownHsCnt, setOwnHsCnt] = useState();
  let [grntPrmeActnDvcdCont01Yn, setGrntPrmeActnDvcdCont01Yn] = useState();
  let [queryObj, setQueryObj] = useState();

  function setRcmdDataQuery() {
    setQueryObj({rentGrntAmt, trgtLwdgCd, age, weddStcd, myIncmAmt, myTotDebtAmt, ownHsCnt, grntPrmeActnDvcdCont01Yn});
    setStts(1);
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
          onChange={(e) => {
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
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">결혼구분</FormLabel>
            <RadioGroup
              row
              name="weddStcd"
              defaultValue={"1"}
              onChange={(e) => {
                setWeddStcd(e.target.value)
              }}
            >
              <FormControlLabel sx={{ mr:2 }} value="1" control={<Radio />} label="미혼" />
              <FormControlLabel sx={{ mr:2 }} value="2" control={<Radio />} label="기혼" />
              <FormControlLabel sx={{ mr:2 }} value="3" control={<Radio />} label="신혼" />
              <FormControlLabel sx={{ mr:2 }} value="4" control={<Radio />} label="결혼예정" />
            </RadioGroup>
        </FormControl>
        <NumericFormat
          label="연소득금액"
          value={myIncmAmt}
          customInput={TextField}
          InputProps={{
            endAdornment: <InputAdornment position="start">원</InputAdornment>,
          }}
          allowNegative={false}
          thousandSeparator
          onValueChange={({ value }) => setMyIncmAmt(Number(value))}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || floatValue < 1000000000;
          }}
          decimalScale={0}
          variant="filled"
        />
        <NumericFormat
          label="총부채금액"
          value={myTotDebtAmt}
          customInput={TextField}
          InputProps={{
            endAdornment: <InputAdornment position="start">원</InputAdornment>,
          }}
          allowNegative={false}
          thousandSeparator
          onValueChange={({ value }) => setMyTotDebtAmt(Number(value))}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || floatValue < 1000000000;
          }}
          decimalScale={0}
          variant="filled"
        />
         <NumericFormat
          label="보유주택수"
          value={ownHsCnt}
          customInput={TextField}
          allowNegative={false}
          onValueChange={({ value }) => setOwnHsCnt(Number(value))}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || floatValue < 1000;
          }}
          decimalScale={0}
          variant="filled"
        />
         <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">2자녀이상</FormLabel>
            <RadioGroup
              row
              name="grntPrmeActnDvcdCont01Yn"
              defaultValue={"N"}
              onChange={(e) => {
                setGrntPrmeActnDvcdCont01Yn(e.target.value)
              }}
            >
              <FormControlLabel sx={{ mr:2 }} value="Y" control={<Radio />} label="예" />
              <FormControlLabel sx={{ mr:2 }} value="N" control={<Radio />} label="아니오" />
            </RadioGroup>
        </FormControl>
 
      </Paper>
      <div className="m-8 lg:mx-20">
        <Button variant="contained" size="large" onClick={setRcmdDataQuery}>조회</Button>
      </div>
      {stts ? <ProdPanel queryObj={queryObj} /> : ""}
      <DataGo />
      <Footer />
   </div>
  )
}
