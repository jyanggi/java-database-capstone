/*
  Dynamic Header Rendering for Hospital CMS
  -----------------------------------------
  This file generates a reusable header that adapts based on:
   - Current page
   - User role (admin, doctor, patient, loggedPatient)
   - Authentication state (token presence)
*/

function renderHeader() {
  const headerDiv = document.getElementById("header");

  // 1. If on homepage -> clear session and show basic header
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  // 2. Get user session info
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // 3. Start building header base
  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
        <span class="logo-title">Hospital CMS</span>
      </div>
      <nav>`;

  // 4. Session validity check
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  // 5. Role-specific header injection
  if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" onclick="logoutPatient()">Logout</a>`;
  }

  // 6. Close header structure
  headerContent += `
      </nav>
    </header>`;

  // 7. Render to DOM
  headerDiv.innerHTML = headerContent;

  // 8. Attach listeners
  attachHeaderButtonListeners();
}

/* --- Helper Functions --- */

// Attach listeners to dynamically created buttons
function attachHeaderButtonListeners() {
  const loginBtn = document.getElementById("patientLogin");
  const signupBtn = document.getElementById("patientSignup");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }
}

// General logout (admin, doctor, loggedPatient)
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

// Patient-specific logout (switch back to role=patient)
function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}

// Initialize header on page load
document.addEventListener("DOMContentLoaded", renderHeader);
