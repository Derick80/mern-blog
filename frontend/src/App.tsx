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
import { AuthProvider } from "./utils/context/auth";
import Drafts from "./pages/Drafts";
import Create from "./pages/Create";
import Gallery from "./pages/Gallery";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";


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
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/drafts" element={<Drafts />} />
            <Route path=":postId" element={<EditPost />} />

            <Route path="/create" element={<Create />} />


          </Routes>


        </div>
      </Router>

    </AuthProvider>

  );
}

export default App;
