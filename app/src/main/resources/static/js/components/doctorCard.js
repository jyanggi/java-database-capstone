/*
  doctorCard.js
  ---------------------------
  Renders a reusable Doctor Card component that dynamically adjusts actions 
  based on user role (admin, patient, loggedPatient).

  Dependencies:
   - deleteDoctor from /js/services/doctorServices.js
   - getPatientData from /js/services/patientServices.js
   - showBookingOverlay from /js/loggedPatient.js
*/

import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";
import { showBookingOverlay } from "../loggedPatient.js";

/**
 * Create a doctor card element
 * @param {Object} doctor - Doctor info object
 * @returns {HTMLElement} card - Fully assembled doctor card
 */
export function createDoctorCard(doctor) {
  // Main card container
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  // Fetch user role
  const role = localStorage.getItem("userRole");

  // Doctor info section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = `Specialty: ${doctor.specialization}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${doctor.email}`;

  const availability = document.createElement("p");
  availability.textContent = `Available: ${doctor.availability?.join(", ") || "N/A"}`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Actions section
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  // === ADMIN ROLE ===
  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("adminBtn");

    removeBtn.addEventListener("click", async () => {
      if (!confirm(`Are you sure you want to delete Dr. ${doctor.name}?`)) return;

      const token = localStorage.getItem("token");
      try {
        const success = await deleteDoctor(doctor.id, token);
        if (success) {
          alert("Doctor deleted successfully.");
          card.remove();
        } else {
          alert("Failed to delete doctor.");
        }
      } catch (err) {
        console.error("Error deleting doctor:", err);
        alert("An error occurred while deleting.");
      }
    });

    actionsDiv.appendChild(removeBtn);
  }

  // === PATIENT (NOT LOGGED-IN) ROLE ===
  else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("patientBtn");

    bookNow.addEventListener("click", () => {
      alert("Please log in to book an appointment.");
    });

    actionsDiv.appendChild(bookNow);
  }

  // === LOGGED-IN PATIENT ROLE ===
  else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("patientBtn");

    bookNow.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Session expired. Please log in again.");
        window.location.href = "/";
        return;
      }

      try {
        const patientData = await getPatientData(token);
        showBookingOverlay(e, doctor, patientData);
      } catch (err) {
        console.error("Error fetching patient data:", err);
        alert("Unable to proceed with booking.");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  // Assemble card
  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
