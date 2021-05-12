import React, { Component, Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Search from './components/layout/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import './App.css';

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clear, setClear] = useState(false);
  const [alert, setAlert] = useState(null);

  // Get initial users
  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

      setUsers(res.data);
      setLoading(false);
      setClear(false);
    }

    getUsers();
  }, [])



  // Search GitHub users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);


    setUsers(res.data.items);
    setLoading(false);
    setClear(true);
  };

  // Get single github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setUser(res.data);
    setLoading(false);
    setClear(false);
  }

  // Get user repos
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    setRepos(res.data);
    setLoading(false);
  }


  // Clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
    setClear(false);
  }


  const handleAlert = (msg, type) => {
    setAlert({msg, type});

    setTimeout(() => setAlert(null), 2500);
  }




  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers} showClear={clear} setAlert={handleAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={About} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />
            )} />
          </Switch>
        </div>
      </div>
    </Router>
  );

}

export default App;
