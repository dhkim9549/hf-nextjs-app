import { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import { NumericFormat } from 'react-number-format';

import { getProdInfo } from './get-data';

export default function GrntProd({prodObj}) {

//  let prodInfo = await getProdInfo(prodObj.grntDvcd);

  return (
    <Paper className="w-full lg:w-[300px] bg-white p-4 flex flex-col gap-2">
      <div className="text-slate-800 text-2xl mt-5 mb-2">prodInfo.rcmdProdNm</div>
      <div className="text-slate-900">추천순위: {prodObj.rcmdProrRnk}</div>
      <div className="text-slate-900">보증구분코드: {prodObj.grntDvcd}</div>
      <div className="text-green-900">보증한도: <NumericFormat value={prodObj.grntLmtAmt} thousandSeparator="," /></div>
      <div className="text-green-900">대출한도: <NumericFormat value={prodObj.loanLmtAmt} thousandSeparator="," /></div>
    </Paper>
  )
}
