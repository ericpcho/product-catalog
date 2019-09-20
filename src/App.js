import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SharedCatalog from './components/sharedCatalog/sharedCatalog.js'
import Home from './components/home/home.js'

function Layout(){
  return (
    <Router>

        <div>
          <Route path="/:id" component={SharedCatalog} />
          <Route exact path="/" component={Home} />
        </div>

    </Router>
  )
}

export default Layout;
