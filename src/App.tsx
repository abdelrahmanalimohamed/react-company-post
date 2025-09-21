import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import UploadForm from "./components/UploadForm";
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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 flex items-center justify-center p-6">
      {!auth.isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <UploadForm onLogout={handleLogout} userEmail={auth.userEmail} />
      )}
    </div>
  );
}
