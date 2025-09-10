# Smart Clinic Management System – Schema Design

This document outlines the data structure for the Smart Clinic Management System.  
We use **MySQL** for structured, relational data and **MongoDB** for flexible, document-based data.

---

## MySQL Database Design

The relational database stores the **core operational entities**: patients, doctors, appointments, and admin users.  
This ensures strong data integrity, relationships, and easy querying.

---

### Table: patients
- **id**: INT, Primary Key, AUTO_INCREMENT  
- **first_name**: VARCHAR(50), NOT NULL  
- **last_name**: VARCHAR(50), NOT NULL  
- **dob**: DATE, NOT NULL  
- **gender**: ENUM('Male','Female','Other')  
- **phone**: VARCHAR(15), UNIQUE  
- **email**: VARCHAR(100), UNIQUE, NOT NULL  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

**Notes:** Patients may have many appointments; history is retained indefinitely.

---

### Table: doctors
- **id**: INT, Primary Key, AUTO_INCREMENT  
- **first_name**: VARCHAR(50), NOT NULL  
- **last_name**: VARCHAR(50), NOT NULL  
- **specialization**: VARCHAR(100), NOT NULL  
- **phone**: VARCHAR(15), UNIQUE  
- **email**: VARCHAR(100), UNIQUE, NOT NULL  
- **availability**: TEXT (JSON string or serialized slots)  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

**Notes:** Doctors have many appointments; availability should prevent double booking.

---

### Table: appointments
- **id**: INT, Primary Key, AUTO_INCREMENT  
- **doctor_id**: INT, Foreign Key → doctors(id)  
- **patient_id**: INT, Foreign Key → patients(id)  
- **appointment_time**: DATETIME, NOT NULL  
- **status**: ENUM('Scheduled', 'Completed', 'Cancelled') DEFAULT 'Scheduled'  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

**Notes:** Appointments link doctors and patients. Deleting a doctor/patient should either cascade or restrict deletion depending on policy.

---

### Table: admin
- **id**: INT, Primary Key, AUTO_INCREMENT  
- **username**: VARCHAR(50), UNIQUE, NOT NULL  
- **password_hash**: VARCHAR(255), NOT NULL  
- **role**: ENUM('SuperAdmin','Manager') DEFAULT 'Manager'  
- **created_at**: TIMESTAMP DEFAULT CURRENT_TIMESTAMP  

**Notes:** Admin accounts manage system operations (user management, reports, etc.).

---

### (Optional) Table: payments
- **id**: INT, Primary Key, AUTO_INCREMENT  
- **appointment_id**: INT, Foreign Key → appointments(id)  
- **amount**: DECIMAL(10,2), NOT NULL  
- **payment_status**: ENUM('Pending','Paid','Failed') DEFAULT 'Pending'  
- **payment_date**: TIMESTAMP  

**Notes:** Useful if payment history is tracked.

---

## MongoDB Collection Design

MongoDB stores **flexible, semi-structured data** such as prescriptions, feedback, or chat records.  
This allows doctors to write notes, attach metadata, or evolve the schema without database migrations.

---

### Collection: prescriptions
```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 101,
  "patientId": 15,
  "doctorId": 7,
  "medications": [
    {
      "name": "Paracetamol",
      "dosage": "500mg",
      "frequency": "Every 6 hours",
      "duration": "5 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "Twice daily",
      "duration": "3 days"
    }
  ],
  "doctorNotes": "Take after meals. Rest and hydrate.",
  "refillCount": 1,
  "issuedAt": "2025-09-09T10:00:00Z",
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}
```

---

### Collection: feedback (example)
```json
{
  "_id": "ObjectId('64xyz987654')",
  "patientId": 15,
  "doctorId": 7,
  "appointmentId": 101,
  "rating": 4,
  "comments": "Doctor was attentive and clear in explanations.",
  "createdAt": "2025-09-09T12:30:00Z"
}
```

---

## Design Rationale
- **MySQL** → Core entities (patients, doctors, admins, appointments, payments) where relationships and constraints are critical.  
- **MongoDB** → Flexible, evolving entities (prescriptions, feedback, chat logs) where data shape may vary.  
- **Integration** → `appointmentId`, `patientId`, and `doctorId` serve as cross-links between MySQL (structured) and MongoDB (documents).

---

