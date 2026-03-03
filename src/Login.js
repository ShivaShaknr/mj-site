import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate a small delay for better UX
    setTimeout(() => {
      if (username === "MadhanJanani" && password === "mj1517") {
        localStorage.setItem("isLoggedIn", "true");
        onLoginSuccess();
      } else {
        setError("Invalid username or password");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <div style={styles.header}>
          <img
            src="/mj-login.png"
            alt="Wedding Logo"
            style={styles.logoImage}
          />
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              style={styles.input}
              disabled={loading}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              disabled={loading}
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button
            type="submit"
            style={{
              ...styles.button,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Enter your credentials to access the wedding gallery
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
    fontFamily: "'Work Sans', sans-serif",
  },
  loginBox: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
    padding: "30px",
    width: "95%",
    maxWidth: "320px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  logoImage: {
    width: "200px",
    height: "120px",
    objectFit: "cover",
  },
  title: {
    margin: "0 0 10px 0",
    color: "#d4749c",
    fontSize: "32px",
    fontWeight: "700",
  },
  subtitle: {
    margin: "0",
    color: "#888",
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: "1px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
  },
  input: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "2px solid #e0e0e0",
    borderRadius: "6px",
    fontFamily: "'Work Sans', sans-serif",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    backgroundColor: "#d4749c",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
  },
  error: {
    color: "#e74c3c",
    fontSize: "14px",
    padding: "10px 12px",
    backgroundColor: "#fdeaea",
    borderRadius: "6px",
    textAlign: "center",
    border: "1px solid #e74c3c",
  },
  footer: {
    textAlign: "center",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #e0e0e0",
  },
  footerText: {
    margin: "0",
    color: "#999",
    fontSize: "12px",
  },
};
