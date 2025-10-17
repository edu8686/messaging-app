import './App.css'
import { Outlet } from 'react-router-dom'

function App() {

return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default App
