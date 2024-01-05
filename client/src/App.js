import React from 'react';
// import './App.css';
import Login from './components/login';
import Signup from './components/signup';
import Userinfo from './components/userinfo';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { TokenProvider } from './components/TokenContext';
import Landing from './components/landing';
import { ChakraProvider } from '@chakra-ui/react'
import ConfirmedMatches from './components/connections/getconfirmedmatches';
import SingleChat from './components/chat/SingleChat';
// import QuesAns from './components/q&a/quesans';
import Todolist from './components/todo/todo';
import Allprofiles from './components/Matching/Matching';
import QuesAns from './components/q&a/q&a';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    // <div className="App">
    //   <Login/>
    //   <Signup/>
    //   <Userinfo/>
    // </div>
    <ChakraProvider>
     
    <TokenProvider>
    <Router>
    {/* <ChatProvider> */}
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userinfo' element={<Userinfo/>}/>
        <Route path='/matching' element={<Allprofiles/>}/>
        <Route path='/todo' element={<Todolist/>}/>
        <Route path='/confirmedmatches' element={<ConfirmedMatches/>}/>
        <Route path='/singlechat' element={<SingleChat/>}/>
        <Route path='/queries' element={<QuesAns/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
      {/* </ChatProvider> */}
    </Router>
    </TokenProvider>
    
    </ChakraProvider>
   
  );
}

export default App;
