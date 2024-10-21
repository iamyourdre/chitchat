import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />} >
          <Route path="/chat" element={<Home />} />
          <Route path="/chat/:phone_number" element={<Chat />} />
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
