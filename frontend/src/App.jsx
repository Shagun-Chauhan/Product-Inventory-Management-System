import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import InventoryUI from './InventoryUI'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <InventoryUI/>
    </>
  )
}

export default App
