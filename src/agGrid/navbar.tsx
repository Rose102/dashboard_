import { Component } from "solid-js";
import { useNavigate } from "@solidjs/router";
import GelapTerang from "./gelapterang"; // Pastikan path sudah benar
import "./navbar.css";

const Navbar: Component = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
  
    if (token) {
      const response = await fetch("http://localhost:8080/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
  
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Failed to log out. Please try again.");
      }
    } else {
      alert("No user is logged in");
    }
  };

  const goToMaps = () => {
    navigate("/maps"); // Mengarahkan ke halaman maps.tsx
  };

  return (
    <nav class="navbar">
      <div class="navbar-logo">
        <img src="src/public/Dash-removebg-preview.png" alt="Logo" class="logo" />
      </div>
      <div class="navbar-gelapterang">
        <GelapTerang /> {/* Mengikutsertakan komponen GelapTerang */}
      </div>
      <div class="navbar-links">
        <button class="navbar-link profile-logo">
          <img src="src/public/profile-logo.png" alt="Profile" class="profile-image" />
        </button>
        <span class="navbar-link map-label" onclick={goToMaps}>
          Maps
        </span> {/* Label Maps */}
        <button class="navbar-link" onclick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
