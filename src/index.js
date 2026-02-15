import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './routes/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header"
import Footer from './components/Footer';
import Login from "./routes/Login"
import E404 from './routes/E404';
import Register from './routes/register';
import SideBar from './components/SideBar';
import { MainProvider } from "./logic/MainContext"
import Profile from './routes/Profile';
import MyWallets from "./routes/MyWallets"
import Wallet from './routes/Wallet';
import MyCards from './routes/MyCards';
import SecParty from './routes/SecParty';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <MainProvider >
      <BrowserRouter>
      <Header />
              <Routes>
                    <Route path='/profile' element={<Profile/>} ></Route>
                    <Route path='/mywallets' element={<MyWallets />} ></Route>
                    <Route path='/mywallets/:WID' element={<Wallet/>} ></Route>
                    <Route path='/home' element={<Home/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/cards" element={<MyCards/>} ></Route>
                    <Route path="/second-party" element={<SecParty/>}></Route>
                    <Route path="*" element={<E404/>}></Route>
              </Routes>
              <SideBar />
              <Footer/>
        </BrowserRouter>
  </MainProvider>

  </React.StrictMode>
);

