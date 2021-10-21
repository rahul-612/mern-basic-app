import React,{createContext,useReducer} from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import './App.css';
import ErrorPage from './components/Error'
import Logout from './components/Logout'
import 'bootstrap/dist/css/bootstrap.css';

import {initialState,reducer} from './reducer/UseReducer'

export const UserContext=createContext();

const Routing=()=>{
  return(
    
    <Switch>
      <Route exact path="/">    {/* switch makesure kr rha h ki ek time p ek hi chle    kuki error wala hr m chl ja rha tha */}
        <Home />
      </Route>

      
      <Route exact path="/about">     {/* yani user about p click kre to usse particular is about page p le jaye */}
        <About />
      </Route>

      <Route exact path="/contact">
        <Contact />
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/signup">
        <Signup />
      </Route>

      <Route exact path="/logout">
        <Logout />
      </Route>

      <Route >
        <ErrorPage />
      </Route>
    </Switch>
  )
}

const App = () => {

  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <>
    <UserContext.Provider value={{state,dispatch}}>
      <Navbar />
      <Routing/>
    </UserContext.Provider>
      
    </>
  )
}

export default App
