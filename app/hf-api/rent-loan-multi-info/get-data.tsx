'use server'

export async function getLoanRateData(loanYm) {

  console.log("getLoanRateData() start...");

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=30"
    + "&dataType=JSON"
    ;

  let res = await fetch("https://apis.data.go.kr/B551408/rent-loan-rate-multi-dimensional-info/dimensional-list"
    + apiStr
    + "&loanYm=" + loanYm,
    { next: { revalidate: 600 } }
  );

  let rentJson = await res.json();

  console.log("getLoanRateData() end...");

  return rentJson.body.items;
}
