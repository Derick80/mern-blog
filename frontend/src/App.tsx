import { render } from "react-dom";
import {
  BrowserRouter as
    Router,
  Routes,
  Route,
} from "react-router-dom";
import './styles/App.css'

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/auth";
import Drafts from "./pages/Drafts";
import Create from "./pages/Create";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path="/create" element={<Create />} />


          </Routes>
        </div>
      </Router>

    </AuthProvider>

  );
}

export default App;
