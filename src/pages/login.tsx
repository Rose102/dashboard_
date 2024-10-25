import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "../pages/login.css";

const Login = () => {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = createSignal(false);
  const [forgotEmail, setForgotEmail] = createSignal("");
  const [newPassword, setNewPassword] = createSignal("");
  const [token, setToken] = createSignal("");
  const [question, setQuestion] = createSignal(""); // Tambahkan signal untuk question
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword());
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email(),
          password: password(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate('/agGrid');
      } else {
        const responseText = await response.text();
        alert(responseText);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: forgotEmail(),
          question: question(), // Tambahkan question saat mengirim data
          new_password: newPassword(),
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        alert(responseText);
      } else {
        alert("Password berhasil direset. Anda dapat masuk dengan password baru Anda.");
        setShowForgotPasswordPopup(false);
        navigate('/');
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  return (
    <div class="Container">
      <div class="left">
        <div class="logo">
          <img src="src/public/Dash-removebg-preview.png" alt="Dash Logo" />
        </div>
        <div class="social-login-container">
          <button class="social-login google-login">
            <img src="src/public/Google__G__logo.svg.png" alt="Google Icon" /> Login With Google
          </button>
        </div>
        <div class="separator">
          <span>OR</span>
        </div>
        <div class="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email()}
            onInput={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="form-group">
          <input
            type={showPassword() ? "text" : "password"}
            placeholder="Password"
            value={password()}
            onInput={(e) => setPassword(e.target.value)}
          />
          <i class={`icon-eye ${showPassword() ? "visible" : ""}`} onClick={togglePasswordVisibility}></i>
        </div>
        <a href="#" class="forgot-password" onClick={() => setShowForgotPasswordPopup(true)}>Forgot Password?</a>
        <div class="button-group">
          <button class="login-btn" onClick={handleLogin}>Login</button>
          <button class="signup-btn" onClick={handleSignUpClick}>Sign Up</button>
        </div>
      </div>
      <div class="right">
        <img src="src/public/Portfolio Update-cuate.png" alt="Illustration" />
      </div>

      {/* Forgot Password Popup */}
      {showForgotPasswordPopup() && (
        <div class="popup-overlay">
          <div class="popup-content">
            <h2>Forgot Password</h2>
            <div class="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={forgotEmail()}
                onInput={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder="Security Question" // Form untuk question
                value={question()}
                onInput={(e) => setQuestion(e.target.value)}
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword()}
                onInput={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div class="button-group">
              <button class="submit-btn" onClick={handleForgotPassword}>Submit</button>
              <button class="close-btn" onClick={() => setShowForgotPasswordPopup(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
