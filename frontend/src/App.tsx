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
import CreatePost from "./pages/Create";
import Edit from "./pages/Edit";
import Create from "./pages/Create";
import Profile from './pages/Profile';
import EditProfile from './components/profile/EditProfile';
import Account from './pages/Account';
import UpdateAccount from './components/UpdateAccount';


function App () {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header />

          <Routes>
            <Route path="/" element={ <Dashboard /> } />
            <Route path="/login" element={ <Login /> } />
            <Route path="/register" element={ <Register /> } />
            <Route path="/createpost" element={ <CreatePost /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route path="/editProfile/:profileId" element={ <EditProfile /> } />
            <Route path="/account" element={ <Account /> } />
            <Route path="/updateAccount/:userId" element={ <UpdateAccount /> } />
            <Route path="/drafts" element={ <Drafts /> } />
            <Route path="/editpost/:postId" element={ <Edit /> } />

            <Route path="/create" element={ <Create /> } />


          </Routes>


        </div>
      </Router>

    </AuthProvider>

  );
}

export default App;
