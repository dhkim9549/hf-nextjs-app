'use server'

export async function getRtnData(queryObj) {

  console.log("getRtnData() start...");
  console.log("queryObj = " + JSON.stringify(queryObj));

  let res = await fetch("https://seal-app-a32dz.ondigitalocean.app/api/get-apt-info?"
    + "&aptNm=" + queryObj.aptNm
  );

  let resJson = await res.json();

  console.log("resJson = " + JSON.stringify(resJson));

  console.log("getRtnData() end...");
 
  return resJson;
}
