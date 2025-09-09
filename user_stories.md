# Admin User Stories

### Story 1
**Title:**  
_As an Admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**  
1. Login requires valid credentials.  
2. System denies access with incorrect details.  
3. Session ends automatically after inactivity.  

**Priority:** High  
**Story Points:** 3  
**Notes:** Follow secure authentication best practices.

---

### Story 2
**Title:**  
_As an Admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**  
1. Log out button ends session immediately.  
2. User redirected to login screen.  
3. No access to protected pages after logout.  

**Priority:** High  
**Story Points:** 2  
**Notes:** Handle session timeout gracefully.

---

### Story 3
**Title:**  
_As an Admin, I want to add doctors to the portal, so that they can provide services to patients._

**Acceptance Criteria:**  
1. Admin can enter doctor details (name, specialty, contact).  
2. Doctor profile is stored in MySQL.  
3. New doctor appears in patient search.  

**Priority:** High  
**Story Points:** 5  
**Notes:** Prevent duplicate doctor records.

---

### Story 4
**Title:**  
_As an Admin, I want to delete a doctor's profile from the portal, so that outdated or inactive profiles are removed._

**Acceptance Criteria:**  
1. Admin can delete doctor profiles.  
2. System asks for confirmation before deletion.  
3. Deleted profiles no longer appear in search.  

**Priority:** Medium  
**Story Points:** 3  
**Notes:** Keep audit logs of deletions.

---

### Story 5
**Title:**  
_As an Admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**  
1. Stored procedure retrieves monthly appointment counts.  
2. Results are accurate and match the database.  
3. Admin can view results in CLI output.  

**Priority:** Medium  
**Story Points:** 5  
**Notes:** Consider automating this report later.


# Patient User Stories

### Story 1
**Title:**  
_As a Patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**  
1. Doctor list visible on homepage.  
2. Only active doctors are shown.  
3. Patient sees specialties and contact details.  

**Priority:** High  
**Story Points:** 3  
**Notes:** Booking requires signup.

---

### Story 2
**Title:**  
_As a Patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**  
1. Registration requires unique email.  
2. Strong password validation enforced.  
3. Confirmation email sent after signup.  

**Priority:** High  
**Story Points:** 5  
**Notes:** Store credentials securely.

---

### Story 3
**Title:**  
_As a Patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**  
1. Valid credentials grant access.  
2. Incorrect details block login.  
3. Login session persists until logout.  

**Priority:** High  
**Story Points:** 3  
**Notes:** Support "forgot password" flow later.

---

### Story 4
**Title:**  
_As a Patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**  
1. Logout ends session.  
2. Redirects to login page.  
3. Block access to protected pages.  

**Priority:** Medium  
**Story Points:** 2  
**Notes:** Same session handling as Admin.

---

### Story 5
**Title:**  
_As a Patient, I want to book an hour-long appointment with a doctor, so that I can receive consultation._

**Acceptance Criteria:**  
1. Patient selects doctor and available slot.  
2. Appointment duration fixed to 1 hour.  
3. Confirmation message displayed and emailed.  

**Priority:** High  
**Story Points:** 5  
**Notes:** Prevent double-booking.

---

### Story 6
**Title:**  
_As a Patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**  
1. List shows date, time, and doctor details.  
2. Past appointments are hidden.  
3. Upcoming list updates after cancellations.  

**Priority:** Medium  
**Story Points:** 3  
**Notes:** Include “cancel” button here.


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
