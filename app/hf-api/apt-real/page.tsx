'use client'

import { useState, createContext, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';

import ProdPanel from './prod-panel';
import AptChart from './apt-chart';
import { getAptTrd } from './get-data';

export default function AptReal() {

  let [aptNm, setAptNm] = useState();
  let [queryObj, setQueryObj] = useState();
  let [aptList, setAptList] = useState([]);

  function setQuery() {
    setQueryObj({aptNm});
  }

  function addAptList(x) {
    let list = aptList.slice();
    let listStr = [];
    list.forEach((e) => {listStr.push(JSON.stringify(e))});
    if(!listStr.includes(JSON.stringify(x))) {
      list.push(x);
      getAptTrd(x).then((trd) => {
        x.trd = trd;
	setAptList(list);
      })
    }
  }

  return (
    <div className="flex flex-row justify-center bg-white">
      <div className="flex flex-col items-center w-[340px] h-screen bg-slate-100">
        <div className="bg-slate-100 fixed top-8 z-10">
          <div className="text-center m-4 p-4">
            <blockquote className="text-2xl font-bold italic text-slate-900">
              APT-REAL
            </blockquote>
          </div>
          <Paper className="p-2 w-80 flex flex-row justify-center gap-2">
            <TextField
              id="aptNm" label="aptNm" variant="filled"
              className=""
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
        </div>
        <div className="mt-[200px] overflow-y-auto">
         {queryObj && <ProdPanel queryObj={queryObj} addAptList={addAptList} />}
        </div>
      </div>
      <div className="w-[750px] bg-orange-100">
        <AptChart aptList={aptList} />
      </div>
    </div>
  )
}
