import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Media from './pages/Media';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserLayout />} >
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/media" element={<Media />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
