/*
  Import getAllAppointments to fetch appointments from the backend
  Import createPatientRow to generate a table row for each patient appointment
*/

import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

/*
  Get the table body where patient rows will be added
  Initialize selectedDate with today's date in 'YYYY-MM-DD' format
  Get the saved token from localStorage (used for authenticated API calls)
  Initialize patientName to null (used for filtering by name)
*/
const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split("T")[0];
const token = localStorage.getItem("token");
let patientName = null;

/*
  Add an 'input' event listener to the search bar
  On each keystroke:
    - Trim and check the input value
    - If not empty, use it as the patientName for filtering
    - Else, reset patientName to "null" (as expected by backend)
    - Reload the appointments list with the updated filter
*/
document.getElementById("searchBar")?.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  patientName = value !== "" ? value : "null";
  loadAppointments();
});

/*
  Add a click listener to the "Today" button
  When clicked:
    - Set selectedDate to today's date
    - Update the date picker UI to match
    - Reload the appointments for today
*/
document.getElementById("todayButton")?.addEventListener("click", () => {
  selectedDate = new Date().toISOString().split("T")[0];
  const datePicker = document.getElementById("datePicker");
  if (datePicker) datePicker.value = selectedDate;
  loadAppointments();
});

/*
  Add a change event listener to the date picker
  When the date changes:
    - Update selectedDate with the new value
    - Reload the appointments for that specific date
*/
document.getElementById("datePicker")?.addEventListener("change", (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

/*
  Function: loadAppointments
  Purpose: Fetch and display appointments based on selected date and optional patient name
*/
async function loadAppointments() {
  try {
    // Step 1: Call getAllAppointments with selectedDate, patientName, and token
    const appointments = await getAllAppointments(selectedDate, patientName, token);

    // Step 2: Clear the table body content before rendering new rows
    tableBody.innerHTML = "";

    // Step 3: If no appointments are returned:
    if (!appointments || appointments.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4" class="text-center">No Appointments found for today.</td>`;
      tableBody.appendChild(row);
      return;
    }

    // Step 4: If appointments exist:
    appointments.forEach((appt) => {
      const patient = {
        id: appt.patient?.id,
        name: appt.patient?.name,
        phone: appt.patient?.phone,
        email: appt.patient?.email,
      };
      const row = createPatientRow(patient, appt);
      tableBody.appendChild(row);
    });
  } catch (err) {
    console.error("Error loading appointments:", err);

    // Step 5: Catch and handle any errors during fetch
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="4" class="text-center">Error loading appointments. Try again later.</td>`;
    tableBody.appendChild(row);
  }
}

/*
  When the page is fully loaded (DOMContentLoaded):
    - Call renderContent() (assumes it sets up the UI layout)
    - Call loadAppointments() to display today's appointments by default
*/
window.addEventListener("DOMContentLoaded", () => {
  if (typeof renderContent === "function") {
    renderContent();
  }
  loadAppointments();
});
