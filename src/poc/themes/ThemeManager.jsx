//Toggling the theme
import React, { createContext, useState } from 'react'
import Header from './Header'
import Article from './Article'
import Footer from './Footer'
import "./ThemeManager.css";

export const ThemeWrapper = createContext();
function ThemeManager() {
    const [currTheme, setCurrTheme] = useState("light");
    
    const handleTheme = () => {
        const newTheme = currTheme == "light" ? "dark" : "light"
        setCurrTheme(newTheme);
    }
  
    return (
    <>
        <ThemeWrapper.Provider value={{currTheme, handleTheme}}>
            <button onClick={handleTheme}> Toggle Theme{currTheme}</button>
            <Header></Header>
            <Article></Article>
            <Footer></Footer>
        </ThemeWrapper.Provider>
    </>
  )
}

export default ThemeManager

