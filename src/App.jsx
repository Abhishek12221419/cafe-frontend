import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./components/Home"
import Temp from "./components/Temp"
import Register from "./components/Register"

function App() {
  return (
    // <>
    // <Home name="John" age={21}/>
    // {/* <Temp flag={true}/> */}
    // <Temp/>
    // </>
    <div>
      <h1>Cafe Front-end</h1>
      <Register/>
      <h3>This is Footer</h3>
    </div>
  )
}

export default App
