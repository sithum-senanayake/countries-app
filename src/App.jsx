import Home from './pages/Home';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import CountryPage from './pages/CountryPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Favourite from './pages/Favourite';

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Home />} />
            <Route path="/country/:code" element={<CountryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favourite />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
