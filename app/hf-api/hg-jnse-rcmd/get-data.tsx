'use server'

export async function getRcmdData(rentGrntAmt, trgtLwdgCd, age) {

   console.log("getData()");
   console.log("age = " + age);
   
   let apiStr = ""
     + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
     + "&pageNo=1"
     + "&numOfRows=30"
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

  console.log("getProdData()" + grntDvcd);

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
  let prodInfoStr = JSON.stringify(prodInfoJson.body.item);

  console.log("prodInfoStr = " + prodInfoStr);

  return JSON.parse(prodInfoStr);
}

