import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { validateEmail } from "../types";

interface Props {
  onLogin: (email: string) => void;
}

export default function LoginForm({ onLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: typeof errors = {};
    if (!validateEmail(email)) nextErrors.email = "Please enter a valid email.";
    if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (email !== "admin@yahoo.com" || password !== "123456789") {
      setErrors({ email: "Wrong email or password" });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin(email);
    }, 700);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white shadow-md rounded-2xl p-8">
      <h2 className="text-2xl font-semibold mb-6">Sign in</h2>
      <label className="block mb-4">
        <span className="text-sm text-gray-600 flex items-center gap-2">
          <Mail size={16} /> Email
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`mt-1 block w-full rounded-md p-3 border ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
          placeholder="you@example.com"
        />
        {errors.email && <div className="text-xs text-red-500 mt-1">{errors.email}</div>}
      </label>

      <label className="block mb-6">
        <span className="text-sm text-gray-600 flex items-center gap-2">
          <Lock size={16} /> Password
        </span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`mt-1 block w-full rounded-md p-3 border ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
          placeholder="Enter your password"
        />
        {errors.password && <div className="text-xs text-red-500 mt-1">{errors.password}</div>}
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-400 text-white font-medium shadow-sm hover:from-indigo-700 disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
