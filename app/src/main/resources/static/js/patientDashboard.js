// patientDashboard.js

/*
  Import modules:
  - createDoctorCard: renders doctor info cards
  - openModal: opens login/signup modals
  - getDoctors, filterDoctors: backend doctor fetch/filter APIs
  - patientSignup, patientLogin: patient authentication services
*/
import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientSignup, patientLogin } from "./services/patientServices.js";

/*
  Load all doctor cards when the page loads
*/
document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  // Modal triggers
  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }

  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }

  // Filter listeners
  document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

/*
  Fetch and render all doctors into #content
*/
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<p class="text-red-500">❌ Failed to load doctors. Please try again later.</p>`;
  }
}

/*
  Filter doctors dynamically based on search, availability, and specialty
*/
async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  try {
    const response = await filterDoctors(name, time, specialty);
    const doctors = response.doctors || [];

    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      document.getElementById("content").innerHTML =
        "<p>No doctors found with the given filters.</p>";
    }
  } catch (error) {
    console.error("Failed to filter doctors:", error);
    alert("❌ An error occurred while filtering doctors.");
  }
}

/*
  Utility to render doctor cards
*/
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

/*
  Handle patient signup
*/
window.signupPatient = async function () {
  try {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    const { success, message } = await patientSignup({ name, email, password, phone, address });

    if (success) {
      alert(message);
      document.getElementById("modal").style.display = "none";
      window.location.reload();
    } else {
      alert(`❌ ${message}`);
    }
  } catch (error) {
    console.error("Signup failed:", error);
    alert("❌ An error occurred while signing up.");
  }
};

/*
  Handle patient login
*/
window.loginPatient = async function () {
  try {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const response = await patientLogin({ email, password });

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      selectRole("loggedPatient"); // assumes this helper exists globally
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert("❌ Invalid credentials!");
    }
  } catch (error) {
    console.error("Error :: loginPatient :: ", error);
    alert("❌ Failed to login. Please try again.");
  }
};
