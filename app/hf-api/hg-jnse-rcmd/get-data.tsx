'use server'

export async function getRcmdProdData(queryObj) {

  console.log("getRcmdProdData() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  let rcmdItems = await getRcmdData(queryObj);

  let prodInfoObj = {}; 
  await Promise.all(rcmdItems.map(async (x) => {
    const rsps = await getProdInfo(x.grntDvcd);
    prodInfoObj[x.grntDvcd] = rsps;
  }));

  let maxRentAmtObj = {}; 
  await Promise.all(rcmdItems.map(async (x) => {
    const rsps = await getMaxRentAmtList(x.grntDvcd);
    maxRentAmtObj[x.grntDvcd] = rsps;
  }));

  let x = {rcmdItems, prodInfoObj, maxRentAmtObj};
  console.log(">>> x = " + JSON.stringify(x));

  console.log("getRcmdProdData() end...");

  return x;

}

export async function getRcmdData(queryObj) {

  console.log("getRcmdData() start...");

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=100"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info/jnse-rcmd-list"
    + apiStr
    + "&rentGrntAmt=" + queryObj.rentGrntAmt
    + "&trgtLwdgCd=" + queryObj.trgtLwdgCd
    + "&age=" + queryObj.age
    + "&weddStcd=" + queryObj.weddStcd
    + "&myIncmAmt=0&myTotDebtAmt=0&ownHsCnt=0&grntPrmeActnDvcdCont=",
    { next: { revalidate: 600 } }
  );

  let rentJson = await res.json();

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

  let res = await fetch("https://apis.data.go.kr/B551408/jnse-rcmd-info/jnse-prod-dtl-info"
    + apiStr
    + "&grntDvcd=" + grntDvcd
    + "",
    { next: { revalidate: 600 } }
  );

  let prodInfoJson = await res.json();

  console.log(`getProdInfo(${grntDvcd}) end...`);

  return prodInfoJson.body.item;
}

export async function getMaxRentAmtList(grntDvcd) {

  console.log("getMaxRentAmtList() start...");

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
    { next: { revalidate: 600 } }
  );

  let prodInfoJson = await res.json();

  console.log("getMaxRentAmtList() end...");

  return prodInfoJson.body.items;
}
