import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'
import WatchList from './Components/WatchList.jsx'
import Navbar from './Components/Navbar.jsx'
import Context from './poc/Context.jsx'
import ThemeManager from './poc/themes/ThemeManager.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { WatchListProvider } from './Components/Contexts/WatchListContext.jsx'

function App() {

  return (
    <>
      <Provider store={store}>
        <WatchListProvider>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path='/watchlist' element={<WatchList/>}></Route>
          </Routes>
        </WatchListProvider>
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
