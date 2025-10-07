import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/UI-elements/Navbar'
import Footer from './components//UI-elements/Footer'
import MainWindow from './pages/MainWindow'

function App() {

return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App
