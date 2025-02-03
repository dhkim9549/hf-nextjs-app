'use server'

import { revalidateTag } from 'next/cache'

export async function getRcmdProdData(queryObj) {

  console.log("getRcmdProdData() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  let rcmdItems = await getRcmdData(queryObj);

  let prodInfoObj = {}; 
  let p1 = Promise.all(rcmdItems.map(async (x) => {
    await getProdInfo(x.grntDvcd).then((rsps) => {
      prodInfoObj[x.grntDvcd] = rsps;
    });
  }));

  let maxRentAmtObj = {}; 
  let p2 = Promise.all(rcmdItems.map(async (x) => {
    await getMaxRentAmtList(x.grntDvcd).then((rsps) => {
      maxRentAmtObj[x.grntDvcd] = rsps;
    });
  }));

  let date = new Date();
  date = new Date(date.setDate(1));
  date = new Date(date.setMonth(date.getMonth() - 1));
  let loanYm = ("" + date.getFullYear()) + ("" + (date.getMonth() + 1)).padStart(2, '0');

  let loanRatObj = {}; 
  let p3 = getJnseGrtdLoanRatList(loanYm).then((items) => {
    items.map((x) => {
      loanRatObj[x.grntDvcd] = x.grtdLoanAvgRat;
    });
  });

  await Promise.all([p1, p2, p3]);

  let x = {rcmdItems, prodInfoObj, maxRentAmtObj, loanRatObj};
  console.log(">>> x = " + JSON.stringify(x));

  console.log("getRcmdProdData() end...");

  return x;

}

export async function getRcmdData(queryObj) {

  console.log("getRcmdData() start...");

  console.log("queryObj = " + JSON.stringify(queryObj));

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=100"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info-v2/jnse-rcmd-list-v2"
    + apiStr
    + "&rentGrntAmt=" + queryObj.rentGrntAmt
    + "&trgtLwdgCd=" + queryObj.trgtLwdgCd
    + "&age=" + queryObj.age
    + "&weddStcd=" + queryObj.weddStcd
    + "&myIncmAmt=" + (queryObj.myIncmAmt || "0")
    + "&myTotDebtAmt=" + (queryObj.myTotDebtAmt || "0")
    + "&ownHsCnt=" + (queryObj.ownHsCnt || "0")
    + "&grntPrmeActnDvcdCont=" + (queryObj.grntPrmeActnDvcdCont01Yn == "Y" ? "01" : ""),
    { next: { revalidate: 3600, tags: ['rcmd-data'] } }
  );

  let rentJson = null;
  try {
    rentJson = await res.json();
  } catch(e) {
    console.log("revalidateTag(rcmd-data)");
    revalidateTag('rcmd-data');
  }

  console.log("getRcmdData() end...");

  return rentJson.body.items;
}

export async function getProdInfo(grntDvcd) {

  console.log(`getProdInfo(${grntDvcd}) start...`);

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=30"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info-v2/jnse-prod-dtl-info-v2"
    + apiStr
    + "&grntDvcd=" + grntDvcd
    + "",
    { next: { revalidate: 3600, tags: ['prod-info'] } }
  );

  let prodInfoJson = null;
  try {
    prodInfoJson = await res.json();
  } catch(e) {
    console.log("revalidateTag(prod-info)");
    revalidateTag('prod-info');
  }

  console.log(`getProdInfo(${grntDvcd}) end...`);

  return prodInfoJson.body.item;
}

export async function getMaxRentAmtList(grntDvcd) {

  console.log(`getMaxRentAmtList(${grntDvcd}) start...`);

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=100"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info-v2/jnse-max-rent-amt-list-v2"
    + apiStr
    + "&grntDvcd=" + grntDvcd
    + "",
    { next: { revalidate: 3600, tags: ['max-rent-amt-list'] } }
  );

  let prodInfoJson = null;
  try {
    prodInfoJson = await res.json();
  } catch(e) {
    console.log("revalidateTag(max-rent-amt-list)");
    revalidateTag('max-rent-amt-list');
  }

  console.log(`getMaxRentAmtList(${grntDvcd}) end...`);

  return prodInfoJson.body.items;
}

export async function getJnseGrtdLoanRatList(loanYm) {

  console.log("getJnseGrtdLoanRatList() start...");

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=100"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info-v2/jnse-grtd-loan-rat-list-v2"
    + apiStr
    + "&loanYm=" + loanYm
    + "",
    { next: { revalidate: 3600, tags: ['jnse-grtd-loan-rat-list'] } }
  );

  let ratInfoJson = null;
  try {
    ratInfoJson = await res.json();
  } catch(e) {
    console.log("revalidateTag(jnse-grtd-loan-rat-list)");
    revalidateTag('jnse-grtd-loan-rat-list');
  }

  console.log("getJnseGrtdLoanRatList() end...");

  return ratInfoJson.body.items;
}
