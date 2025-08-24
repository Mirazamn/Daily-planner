import { useState } from 'react'
import './App.css'
import AddTask from './components/Add-Task/component'
import Header from './components/Header/component'
import Tasks from './components/Tasks/component'
import Calendar from './components/Calendar/component'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/component'
import Day from './components/Day/component'

function App() {
  const now = new Date()
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Day/>}/>
          <Route path='/:id' element={<Day/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
