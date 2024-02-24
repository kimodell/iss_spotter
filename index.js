const { fetchMyIP } = require ("./iss");
//non-assertation based test for iss.js
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);
});