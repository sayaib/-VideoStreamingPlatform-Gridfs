import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoutesWithoutLogin = ({ element, navigates }) => {
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
        navigate(navigates);
      }
    };

    checkAuth();
  }, [navigate]);

  console.log(isAuthenticated);

  return isAuthenticated === false ? element : null;
};

export default ProtectedRoutesWithoutLogin;
