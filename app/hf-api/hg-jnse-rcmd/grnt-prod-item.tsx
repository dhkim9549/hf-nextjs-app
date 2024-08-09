import Paper from '@mui/material/Paper';

import BankNmList from './bank-nm-list.json';
import LwdgCdList from './lwdg-cd-list.json';

export default function RcmdProdItem({prodObj, prodInfo, maxRentAmtList, loanRat}) {

  const reqTrgtListItems = prodInfo?.reqTrgtCont.split('|').map(x =>
    <li key={x}>
      {x}
    </li>
  );

  const trtBankListItems = prodInfo?.trtBankCont.split('|').map(x =>
    <li key={x}>
      {x} : {BankNmList[x]}
    </li>
  );

  const maxRentAmtItems = maxRentAmtList?.map(x =>
    <li key={x.trgtLwdgCd}>
      {LwdgCdList[x.trgtLwdgCd]}: {x.maxRentGrntAmt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
    </li>
  );

  return (
    <Paper className="w-full lg:w-96 bg-white p-4 flex flex-col gap-2">
      <div className="text-slate-800 text-2xl mt-5 mb-2">{prodInfo.rcmdProdNm}</div>
      <div className="text-slate-900">추천순위: {prodObj.rcmdProrRnk}</div>
      <div className="text-slate-900">보증구분코드: {prodObj.grntDvcd}</div>
      <div className="text-slate-900">보증한도: {prodObj.grntLmtAmt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
      <div className="text-slate-900">대출한도: {prodObj.loanLmtAmt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
      <div className="text-slate-900">추천보증상품구분: {prodInfo?.rcmdGrntProdDvcd}</div>
      <div className="text-slate-900">신청대상 요약</div>
        <ul className="list-disc text-sm px-6">{reqTrgtListItems}</ul>
      <div className="text-slate-900">문의처: {prodInfo?.qscNm}</div>
      <div className="text-slate-900">문의처 전화번호: {prodInfo?.qscTlno}</div>
      <div className="text-slate-900">안내링크:
        <a className="block text-sm ml-4 underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={prodInfo?.guidUrl} target="_blank">{prodInfo?.guidUrl}</a>
      </div>
      <div className="text-slate-900">이자지원내용: {prodInfo?.intSprtCont}</div>
      <div className="text-slate-900">예상 보증료율: {prodInfo?.exptGrfeRateCont}</div>
      <div className="text-slate-900">우대내용: {prodInfo?.grntPrmeCont}</div>
      <div className="text-slate-900">취급은행</div>
        <ul className="list-disc text-sm px-6">{trtBankListItems}</ul>
      <div className="text-slate-900">임차보증금액 대비 최대대출한도 비율: {prodInfo?.rentGrntMaxLoanLmtRate}%</div>
      <div className="text-slate-900">최대대출한도: {prodInfo?.maxLoanLmtAmt.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
      {loanRat ? <div className="text-slate-900">전월 보증부대출 적용금리: {loanRat}%</div> : ""}
      <div className="text-slate-900">지역별 최대임차보증금액</div>
        <ul className="list-disc text-sm px-6">{maxRentAmtItems}</ul>
    </Paper>
  )
}
