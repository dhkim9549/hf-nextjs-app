export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request) {

  const { searchParams } = new URL(request.url);
  const loanYm = searchParams.get('loanYm');

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
  rentJson.host = process.env.DB_HOST;
  console.log("host = " + process.env.DB_HOST);
  console.log("rentJson = " + JSON.stringify(rentJson.body.items));

  return Response.json(rentJson)
}
