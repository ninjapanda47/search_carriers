const api = "http://arrive-interview-api.azurewebsites.net/api/";

let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
  Authorization: token
};

//search by city
export const getCarriers = city =>
  fetch(`${api}/carriers/${city}`, { headers })
    .then(res => res.json())
    .then(data => data);

//get details
export const getDetails = id =>
  fetch(`${api}/carrierDetails/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);
