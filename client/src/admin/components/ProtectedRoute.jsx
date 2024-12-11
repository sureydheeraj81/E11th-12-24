import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute(props) {
  const [user, setUser] = useState(null); // To store user data
  const [loading, setLoading] = useState(true); // Loading state to show a loading spinner while validating the token
  const navigate = useNavigate();

  // Function to fetch user data and validate the token
  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, clear local storage and redirect to login
      localStorage.clear();
      navigate("/admin/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/admin/get-admin-info-by-id",
        { token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUser(response.data.data); // Set user data if token is valid
      } else {
        // Token is invalid, clear local storage and redirect to login
        localStorage.clear();
        navigate("/admin/login");
      }
    } catch (error) {
      // Handle error (e.g., token expired, invalid token)
      console.error("Token verification failed", error);
      localStorage.clear();
      navigate("/admin/login");
    } finally {
      // Set loading to false once token validation is done
      setLoading(false);
    }
  };

  // Trigger token verification and user fetching when the component mounts
  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    // Show loading indicator while verifying the token
    return <div>Loading...</div>;
  }

  if (!user) {
    // If there's no valid user data after token validation, redirect to login
    return <Navigate to="/admin/login" />;
  }

  // If the token is valid and the user data is available, render the children (protected content)
  return props.children;
}

export default ProtectedRoute;
