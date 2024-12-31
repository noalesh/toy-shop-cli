import './assets/style/main.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { store } from './store/store.js'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { Provider } from 'react-redux'

export default function App() {

  return (

    <Provider store={store}>
          <Router>
              <section className="app">
                  <AppHeader />
                  <main className='main-layout'>
                      <Routes>
                          <Route element={<HomePage />} path="/" />
                          <Route element={<ToyIndex />} path="/toys" />
                          <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                          <Route element={<ToyDetails />} path="/toy/:toyId" />
                      </Routes>
                  </main>
              </section>
          </Router>
      </Provider>
    
  )
}

