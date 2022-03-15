import axios from 'axios';

export default axios.create({
  // baseURL: `http://g-axon.work/jwtauth/api/`,
  baseURL: `http://localhost:8080`,
  // baseURL: `http://13.126.152.137:8080/pandiyan`,
  headers: {
    'Content-Type': 'application/json',
  }
});
