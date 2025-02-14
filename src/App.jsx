import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'
import WatchList from './Components/Watchlist.jsx'
import Navbar from './Components/Navbar.jsx'
import Context from './poc/Context.jsx'
import ThemeManager from './poc/themes/ThemeManager.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'

function App() {

  return (
    <>
      <Provider store={store}>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path='/watchlist' element={<Watchlist/>}></Route>
        </Routes>
      </Provider>
      

      {/* {// theory explanation purpose
        //poc
        //<Context/>
        <ThemeManager/>
      } */}
      
    </>
  )
}

export default App
