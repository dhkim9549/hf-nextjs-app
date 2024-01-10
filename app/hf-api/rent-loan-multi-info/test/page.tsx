async function getData() {

  let apiStr = ""
    + "?serviceKey=PW2VvwTvkcs%2FWMVLduXzeRL0BPjOYH%2B0wMnsQiyy5UgcrukEjAurATJUNkeA7T%2Bj47s3GAmLzHduip%2BfbxESlQ%3D%3D"
    + "&pageNo=1"
    + "&numOfRows=30"
    + "&dataType=JSON"
    ;

  let loanYm = "L1M";

  let res = await fetch("https://apis.data.go.kr/B551408/rent-loan-rate-multi-dimensional-info/dimensional-list"
    + apiStr
    + "&loanYm=" + loanYm,
    {next: { revalidate: 5 }}
  );

  return res.json()
}
 
export default async function Page() {
  const data = await getData();
  const dataStr = JSON.stringify(data);
 
  return <main>{dataStr}</main>
}
