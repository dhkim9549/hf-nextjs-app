'use server'

export async function getRtnData(queryObj) {

  console.log("getRtnData() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  const API_URL = process.env.API_SERVER_URL;

  let res = await fetch(API_URL + "/api/get-apt-info?"
    + "&aptNm=" + queryObj.aptNm
  );

  let resJson = await res.json();

  console.log("resJson = " + JSON.stringify(resJson));

  console.log("getRtnData() end...");
 
  return resJson;
}
