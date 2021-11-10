import { useState, useEffect } from "react";
import AuthService from "./AuthService";
import Login from "./Login";
import Navbar from "./component/navbar";
//import React, { BrowserRouter as Router } from 'react-router-dom';

const API_URL = "http://localhost:8080/api";

const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
  const [artwalks, setArtwalks] = useState([]);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    async function getData() {
      const url = `${API_URL}/artwalks`;
      const response = await authService.fetch(url);
      const data = await response.json();
      setArtwalks(data);
    }
    getData();
  }, [requestCount]);

  async function login(username, password) {
    try {
      const resp = await authService.login(username, password);
      console.log("Authentication:", resp.msg);
      setRequestCount(requestCount + 1);
    } catch (e) {
      console.log("Login", e);
    }
  }

  let contents = <p>No artwalks!</p>;
  if (artwalks.length > 0) {
    contents = 
    <>
      <Navbar />
      <hr />
    </>
  }

  return (
    <>
      <h1>Artwalks</h1>
      {contents}
      <Login login={login} />
      {authService.loggedIn() ? <pre>User is logged in</pre> : <pre>User is not logged in</pre>}
    </>
  );
}

export default App;
