'use client'

import { useState, createContext, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';

import ProdPanel from './prod-panel';
import { AptContext } from './apt-context';

export default function ExpressTest() {

  let [aptNm, setAptNm] = useState();
  let [queryObj, setQueryObj] = useState();
  let [aptList, setAptList] = useState([]);

  function setQuery() {
    setQueryObj({aptNm});
  }

  function addAptList(x) {
    console.log('addAptList() start...');
    aptList.push(x);
    setAptList(aptList);
  }

  return (
    <AptContext.Provider value={addAptList}>
      <div>
        <div className="text-center my-10 py-10 lg:text-left lg:m-10 lg:p-10">
          <blockquote className="text-2xl font-bold italic text-slate-900">
            Apt real
          </blockquote>
	  <div className="bg-amber-200">
	    {JSON.stringify(aptList)}
	  </div>
        </div>
        <Paper className="m-4 p-12 flex flex-wrap flex-row lg:flex-row gap-3">
          <TextField
            id="aptNm" label="aptNm" variant="filled"
            className="grow"
            inputProps={{min: 0, maxLength:20 }}
            onChange={(e) => {
              setAptNm(e.target.value);
            }}
          />
          <div className="flex flex-col justify-center">
            <Button variant="contained" size="large" onClick={setQuery}>조회</Button>
          </div>
        </Paper>
       {queryObj && <ProdPanel queryObj={queryObj} />}
      </div>
      <div className="bg-amber-100">
        dddd
      </div>
    </AptContext.Provider>
  )
}
