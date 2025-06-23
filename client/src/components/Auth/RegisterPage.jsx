import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim() || !formData.confirmPassword.trim()) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData);
      if (!result.success) {
        setError(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1e293b] p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-6 text-center"
        >
          Create Account
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              autoComplete="off"
              data-form-type="other"
              className="w-full p-3 rounded-lg bg-[#334155] text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your username"
              disabled={loading}
              minLength={3}
              maxLength={20}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              data-form-type="other"
              className="w-full p-3 rounded-lg bg-[#334155] text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              data-form-type="other"
              className="w-full p-3 rounded-lg bg-[#334155] text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your password"
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
              data-form-type="other"
              className="w-full p-3 rounded-lg bg-[#334155] text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 placeholder-gray-400"
              placeholder="Confirm your password"
              disabled={loading}
              minLength={6}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 text-sm bg-red-400/10 p-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-400 text-sm">
            Already have an account?{' '}
          </span>
          <Link
            to="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm hover:underline"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
