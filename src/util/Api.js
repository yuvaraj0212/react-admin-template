import axios from 'axios';

export default axios.create({
  // baseURL: `http://g-axon.work/jwtauth/api/`,
  baseURL: `http://localhost:8080`,
  headers: {
    'Content-Type': 'application/json',
  }
});
