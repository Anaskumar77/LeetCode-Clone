import { useState } from 'react';
import '../../styles/auth.css';
import mascot from '../../assets/auth_mascot.png';

export default function Login() {
  const [form, setForm]     = useState({ email: '', password: '' });
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      // TODO: dispatch login thunk here
      console.log('Login payload:', form);
    } catch (err) {
      setError(err.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        {/* ── Left illustration ── */}
        <div className="auth-illustration">
          <img
            src={mascot}
            alt="Login mascot"
            className="auth-illustration-img"
          />
          <div className="auth-dots">
            <div className="auth-dot" />
            <div className="auth-dot" />
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="auth-form-panel">
          <h1 className="auth-title">Login</h1>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                className="auth-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                className="auth-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </div>

            {/* Forgot password */}
            <a className="auth-forgot" href="#">forgot password?</a>

            {/* Error */}
            {error && <p className="auth-error">{error}</p>}

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading ? 'Logging in…' : 'Log in'}
            </button>

            {/* Divider */}
            <div className="auth-divider">or continue with</div>

            {/* Social */}
            <div className="auth-socials">
              <button type="button" className="auth-social-btn" aria-label="Google">
                <svg width="18" height="18" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.7-6.7C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6C12.1 13 17.6 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8C43.6 37.5 46.5 31.4 46.5 24.5z"/>
                  <path fill="#FBBC05" d="M10.5 28.7A14.3 14.3 0 0 1 9.5 24c0-1.6.3-3.2.9-4.7l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.9 7.6 2.6 10.9l7.9-6.2z"/>
                  <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.4 0-11.9-4.3-13.8-10.2l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/>
                </svg>
              </button>
              <button type="button" className="auth-social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
                </svg>
              </button>
              <button type="button" className="auth-social-btn" aria-label="Apple">
                <svg width="16" height="18" viewBox="0 0 814 1000" fill="#111">
                  <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105-42.8-155.5-108.4c-48.1-62.5-89.4-163.2-89.4-259.1 0-154.3 100.1-237.3 198.6-237.3 64.4 0 115.9 42.8 155.5 42.8 37.9 0 97.2-45.4 172.8-45.4zm-139.7-297.7c36.3 0 80.8 24.4 107.6 62.5 25.1 35.5 41.4 81.4 41.4 127.3 0 5.1-.6 10.3-.6 15.4-1.3 0-2.6.6-3.9.6-44.5 0-87.5-24.4-116.7-64.4-26.4-36.5-45.8-82.4-45.8-129.9 0-4.5.6-9 1.3-13.5 5.2-.7 10.9-1 16.7-1z"/>
                </svg>
              </button>
            </div>

          </form>

          {/* Switch to Register */}
          <p className="auth-switch">
            Don't have an account?
            <a href="/register">Sign up</a>
          </p>
        </div>

      </div>
    </div>
  );
}
