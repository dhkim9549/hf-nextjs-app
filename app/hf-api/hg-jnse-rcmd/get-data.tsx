'use server'

export async function getRcmdProdData(queryObj) {

  console.log("getRcmdProdData() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  let rcmdItems = await getRcmdData(queryObj);

  const prodInfoMap = new Map();
  await Promise.all(rcmdItems.map(async (x) => {
    const rsps = await getProdInfo(x.grntDvcd);
    prodInfoMap.set(x.grntDvcd, rsps);
  }));

  const maxRentAmtMap = new Map();
  await Promise.all(rcmdItems.map(async (x) => {
    const rsps = await getMaxRentAmtList(x.grntDvcd);
    maxRentAmtMap.set(x.grntDvcd, rsps);
  }));

  console.log("getRcmdProdData() end...");

  return {rcmdItems, prodInfoMap, maxRentAmtMap};

}

export async function getRcmdData({rentGrntAmt, trgtLwdgCd, age}) {

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=100"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info/jnse-rcmd-list"
    + apiStr
    + "&rentGrntAmt=" + rentGrntAmt
    + "&trgtLwdgCd=" + trgtLwdgCd
    + "&age=" + age
    + "&weddStcd=1&myIncmAmt=0&myTotDebtAmt=0&ownHsCnt=0&grntPrmeActnDvcdCont=",
    { next: { revalidate: 3600 } }
  );

  let rentJson = await res.json();

  return rentJson.body.items;
}

export async function getProdInfo(grntDvcd) {

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=30"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info/jnse-prod-dtl-info"
    + apiStr
    + "&grntDvcd=" + grntDvcd
    + "",
    { next: { revalidate: 3600 } }
  );

  let prodInfoJson = await res.json();

  return prodInfoJson.body.item;
}

export async function getMaxRentAmtList(grntDvcd) {

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=100"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info/jnse-max-rent-amt-list"
    + apiStr
    + "&grntDvcd=" + grntDvcd
    + "",
    { next: { revalidate: 3600 } }
  );

  let prodInfoJson = await res.json();

  return prodInfoJson.body.items;
}
