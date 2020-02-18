import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

/*
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery';
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap.min.js';*/

import 'mdbootstrap/css/bootstrap.min.css'
import 'mdbootstrap/css/mdb.min.css'

import 'mdbootstrap/js/jquery-3.4.1.min.js'
import 'mdbootstrap/js/popper.min.js'
import 'mdbootstrap/js/bootstrap.min.js'

import './App.css';

import Welcome from './components/Welcome'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import CreateUser from './components/Verify/CreateUser'
import UserList from './components/Verify/UserList'
import Inicio from './components/Verify/Inicio'

import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Navigation />

      <div className="container p-4">
        <Route path="/" exact component={Welcome} />
        <Route path="/users" exact component={UserList} />
        <Route path="/edit/:id" component={CreateUser} />
        <Route path="/create" component={CreateUser} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} /> 
      </div>
      
      <div className="container-fluid p-4">
        <Route path="/home" component={Inicio} />
      </div>
      
      <br/> <br/> <br/>
      <Footer />

      
    </Router>
  );
}

export default App;
