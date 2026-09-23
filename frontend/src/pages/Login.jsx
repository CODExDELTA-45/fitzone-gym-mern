import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SIDE_IMG =
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-[85vh] bg-dark grid md:grid-cols-2">
      <div
        className="hidden md:block bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(13,13,13,0.4), rgba(13,13,13,0.85)), url(${SIDE_IMG})` }}
      />
      <div className="flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full bg-surface border border-border p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 text-center text-white uppercase">Login to FitZone</h2>
          {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              required
              className="bg-dark border border-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="bg-dark border border-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button className="bg-primary text-dark py-3 rounded-md font-bold uppercase tracking-wide hover:brightness-90 transition">
              Login
            </button>
          </form>
          <p className="text-sm text-center mt-4 text-gray-400">
            Don't have an account? <Link to="/register" className="text-primary font-semibold">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
