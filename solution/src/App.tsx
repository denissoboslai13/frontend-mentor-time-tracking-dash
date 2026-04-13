import { useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(null)

  axios.get('http://localhost:3001/categories').then(response => {
    console.log(response.data)
  })

  return (
    <div></div>
  )
}

export default App
