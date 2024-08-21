'use client'

import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';

import ProdPanel from './prod-panel';

export default function ExpressTest() {

  let [stts, setStts] = useState();
  let [i, setI] = useState();
  let [queryObj, setQueryObj] = useState();

  function setQuery() {
    setQueryObj({i});
    setStts(1);
  }

  return (
    <div>
      <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
        <blockquote className="text-2xl font-bold italic text-slate-900">
          express test
        </blockquote>
      </div>
      <Paper className="m-4 p-12 flex flex-wrap flex-col lg:flex-row gap-3 lg:gap-12">
        <NumericFormat
          label="i"
          value={i}
          customInput={TextField}
          allowNegative={false}
          onValueChange={({ value }) => setI(Number(value))}
          isAllowed={(values) => {
            const { floatValue } = values;
            return floatValue === undefined || floatValue < 1000000;
          }}
          decimalScale={0}
          variant="filled"
        />
      </Paper>
      <div className="m-8 lg:mx-20">
        <Button variant="contained" size="large" onClick={setQuery}>조회</Button>
      </div>
      {stts ? <ProdPanel queryObj={queryObj} /> : ""}
    </div>
  )
}
