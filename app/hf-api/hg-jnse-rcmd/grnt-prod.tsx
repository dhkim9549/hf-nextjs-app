'use client'

import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import { NumericFormat } from 'react-number-format';

import { getProdInfo } from './get-data';

export default function GrntProd({prodObj}) {

  let [prodInfo, setProdInfo] = useState();

  async function getProdInfoWrap() {
    let prodInfo = await getProdInfo(prodObj.grntDvcd);
    setProdInfo(prodInfo);
  }

  useEffect(() => {
    getProdInfoWrap();
  }, []);

  const listItems = prodInfo?.reqTrgtCont.split('|').map(x =>
    <li>
      {x}
    </li>
  );

  return (
    <Paper className="w-full lg:w-[350px] bg-white p-4 flex flex-col gap-2">
      <div className="text-slate-800 text-2xl mt-5 mb-2">{prodInfo ? prodInfo.rcmdProdNm : "loading..."}</div>
      <div className="text-slate-900">추천순위: {prodObj.rcmdProrRnk}</div>
      <div className="text-slate-900">보증구분코드: {prodObj.grntDvcd}</div>
      <div className="text-green-900">보증한도: <NumericFormat value={prodObj.grntLmtAmt} thousandSeparator="," /></div>
      <div className="text-green-900">대출한도: <NumericFormat value={prodObj.loanLmtAmt} thousandSeparator="," /></div>
      <div className="text-slate-900">추천보증상품구분: {prodInfo?.rcmdGrntProdDvcd}</div>
      <div className="text-slate-900">신청대상 요약:</div>
        <ul className="list-disc text-sm px-6">{listItems}</ul>
      <div className="text-slate-900">문의처: {prodInfo?.qscNm}</div>
      <div className="text-slate-900">문의처 전화번호: {prodInfo?.qscTlno}</div>
    </Paper>
  )
}
