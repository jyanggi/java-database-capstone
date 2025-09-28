/*
  This script handles the admin dashboard functionality for managing doctors:
  - Loads all doctor cards
  - Filters doctors by name, time, or specialty
  - Adds a new doctor via modal form
*/

import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

// Attach a click listener to the "Add Doctor" button
document.getElementById("addDocBtn")?.addEventListener("click", () => {
  openModal("addDoctor");
});

// When the DOM is fully loaded, fetch and display all doctors
window.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();
});

/**
 * Function: loadDoctorCards
 * Purpose: Fetch all doctors and display them as cards
 */
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (err) {
    console.error("Error loading doctors:", err);
  }
}

// Attach listeners to the search bar and filter dropdowns
document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);

/**
 * Function: filterDoctorsOnChange
 * Purpose: Filter doctors based on name, available time, and specialty
 */
async function filterDoctorsOnChange() {
  try {
    const name = document.getElementById("searchBar")?.value || null;
    const time = document.getElementById("filterTime")?.value || null;
    const specialty = document.getElementById("filterSpecialty")?.value || null;

    const doctors = await filterDoctors(name, time, specialty);

    if (doctors && doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = `<p>No doctors found with the given filters.</p>`;
    }
  } catch (err) {
    console.error("Error filtering doctors:", err);
    alert("Something went wrong while filtering doctors.");
  }
}

/**
 * Function: renderDoctorCards
 * Purpose: Helper to render a list of doctors passed to it
 */
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  doctors.forEach((doc) => {
    const card = createDoctorCard(doc);
    contentDiv.appendChild(card);
  });
}

/**
 * Function: adminAddDoctor
 * Purpose: Collect form data and add a new doctor to the system
 */
export async function adminAddDoctor() {
  try {
    const name = document.getElementById("docName").value;
    const email = document.getElementById("docEmail").value;
    const phone = document.getElementById("docPhone").value;
    const password = document.getElementById("docPassword").value;
    const specialty = document.getElementById("docSpecialty").value;

    // Collect checkbox values for available times
    const timeNodes = document.querySelectorAll("input[name='availability']:checked");
    const availableTimes = Array.from(timeNodes).map((el) => el.value);

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }

    const doctor = {
      name,
      email,
      phone,
      password,
      specialty,
      availableTimes,
    };

    const result = await saveDoctor(doctor, token);

    if (result.success) {
      alert("Doctor added successfully!");
      document.getElementById("addDoctorModal").close();
      loadDoctorCards(); // refresh list without reloading page
    } else {
      alert("Failed to add doctor: " + result.message);
    }
  } catch (err) {
    console.error("Error adding doctor:", err);
    alert("Something went wrong while adding doctor.");
  }
}
