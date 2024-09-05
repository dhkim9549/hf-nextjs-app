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
    let list = aptList.slice();
    list.push(x);
    setAptList(list);
  }

  return (
    <div className="flex flex-row">
      <div className="w-96">
        <div className="flex flex-col h-screen">
          <div className="text-center my-10 py-10 lg:text-left lg:m-4 lg:p-4">
            <blockquote className="text-2xl font-bold italic text-slate-900">
              Apt real
            </blockquote>
          </div>
          <Paper className="m-4 p-4 flex flex-wrap flex-row lg:flex-row gap-3">
            <TextField
              id="aptNm" label="aptNm" variant="filled"
              className="grow"
              inputProps={{min: 0, maxLength:20 }}
              onChange={(e) => {
                setAptNm(e.target.value);
              }}
	      onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setQuery();
	      }}}
            />
            <div className="flex flex-col justify-center">
              <Button variant="contained" size="large" onClick={setQuery}>조회</Button>
            </div>
          </Paper>
	  <div className="h-screen overflow-y-scroll">
           {queryObj && <ProdPanel queryObj={queryObj} addAptList={addAptList} />}
          </div>
	</div>
      </div>
      <div className="grow bg-amber-100">
        {JSON.stringify(aptList)}
      </div>
    </div>
  )
}
