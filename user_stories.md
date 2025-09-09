# Doctor User Stories

### Story 1
**Title:**  
_As a Doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**  
1. Login requires valid credentials.  
2. Incorrect login blocked.  
3. Session persists until logout.  

**Priority:** High  
**Story Points:** 3  
**Notes:** Same authentication as Admin/Patient.

---

### Story 2
**Title:**  
_As a Doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**  
1. Logout ends session immediately.  
2. Redirect to login page.  
3. Block access after logout.  

**Priority:** High  
**Story Points:** 2  
**Notes:** Align with global session handling.

---

### Story 3
**Title:**  
_As a Doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**  
1. Calendar shows confirmed bookings.  
2. Updates dynamically with cancellations.  
3. Displays daily, weekly, and monthly views.  

**Priority:** High  
**Story Points:** 5  
**Notes:** Consider integration with Google Calendar later.

---

### Story 4
**Title:**  
_As a Doctor, I want to mark my unavailability, so that patients only see available slots._

**Acceptance Criteria:**  
1. Doctor selects unavailable times.  
2. Blocked times hidden from patient view.  
3. Changes reflected in real time.  

**Priority:** High  
**Story Points:** 3  
**Notes:** Handle emergencies and last-minute changes.

---

### Story 5
**Title:**  
_As a Doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**  
1. Doctor can edit specialization and contact fields.  
2. Updates saved in MySQL.  
3. Patients see updated profile in search.  

**Priority:** Medium  
**Story Points:** 3  
**Notes:** Changes should be logged for auditing.

---

### Story 6
**Title:**  
_As a Doctor, I want to view patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**  
1. Doctor sees patient name, reason for visit, and medical history.  
2. Data loads securely from MongoDB.  
3. Access restricted to assigned patients.  

**Priority:** High  
**Story Points:** 5  
**Notes:** Ensure HIPAA-compliant data handling.
