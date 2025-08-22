import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./authentication/Login";
import Register from "./authentication/Register";
import ProtectedRoute from "./authentication/ProtectedRoute";
import ProtectedRoutesWithoutLogin from "./authentication/ProtectedRoutesWithoutLogin";
import VideoStreamingPage from "./stream/VideoStreamingPage";

import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoutesWithoutLogin
                element={<Login />}
                navigates="/login"
              />
            }
          />

          <Route
            path="/register"
            element={
              <ProtectedRoutesWithoutLogin
                element={<Register />}
                navigates="/register"
              />
            }
          />

          <Route
            path="/"
            element={<ProtectedRoute element={<Home />} />}
          ></Route>
          {/* <Route
            path="/playVideo"
            element={<ProtectedRoute element={<VideoStreamingPage />} />}
          /> */}
          <Route path="/playVideo" element={<VideoStreamingPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
