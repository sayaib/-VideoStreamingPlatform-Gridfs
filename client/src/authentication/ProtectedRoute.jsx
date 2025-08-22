import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      console.log(document.cookie);
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="));

      console.log(token);
      if (token) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  console.log(isAuthenticated);

  return isAuthenticated ? element : null;
};

export default ProtectedRoute;
