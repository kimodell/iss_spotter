const { fetchMyIP, fetchCoordsByIP } = require("./iss");
// //non-assertation based test for iss.js
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

fetchCoordsByIP("216.121.182.230",(error, coords) => {
  if(error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned coordinates:", coords);
});