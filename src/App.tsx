import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import FormTabs from "./components/FormWrapper";
import AllPosts from "./components/AllPosts";
import type { AuthState } from "./types";

export default function App() {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

  function handleLogin(email: string) {
    setAuth({ isAuthenticated: true, userEmail: email });
  }

  function handleLogout() {
    setAuth({ isAuthenticated: false });
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 flex items-center justify-center p-6">
        <Routes>
          {!auth.isAuthenticated ? (
            // If not logged in → always show login
            <Route path="*" element={<LoginForm onLogin={handleLogin} />} />
          ) : (
            <>
              {/* 👇 After login, default is FormTabs (Upload + Contractor) */}
              <Route
                path="/"
                element={<FormTabs onLogout={handleLogout} userEmail={auth.userEmail} />}
              />

              {/* Posts page still accessible */}
              <Route
                path="/posts"
                element={<AllPosts onLogout={handleLogout} userEmail={auth.userEmail} />}
              />

              {/* Redirect unknown routes back */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
