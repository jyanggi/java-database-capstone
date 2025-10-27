package com.project.back_end.services;

import com.project.back_end.DTO.AppointmentDTO;
import com.project.back_end.models.Appointment;
import com.project.back_end.models.Doctor;
import com.project.back_end.models.Patient;
import com.project.back_end.repo.AppointmentRepository;
import com.project.back_end.repo.PatientRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PatientService {

  private Logger log = LoggerFactory.getLogger(PatientService.class);
  private final PatientRepository patientRepository;
  private final AppointmentRepository appointmentRepository;
  private final TokenService tokenService;

  public PatientService(PatientRepository patientRepository,
      AppointmentRepository appointmentRepository,
      TokenService tokenService) {
    this.patientRepository = patientRepository;
    this.appointmentRepository = appointmentRepository;
    this.tokenService = tokenService;
  }

  public int createPatient(Patient patient) {
    try {
      patientRepository.save(patient);
      return 1;
    } catch (Exception e) {
      log.error("createPatient error", e);
      return 0;
    }
  }

  @Transactional
  public List<AppointmentDTO> getPatientAppointment(Long patientId) {
    try {
      List<Appointment> appointments = appointmentRepository.findByPatientId(patientId);
      return appointments.stream().map(this::convertToDTO).toList();
    } catch (Exception e) {
      log.error("getPatientAppointment error", e);

      return List.of();
    }
  }

  @Transactional
  public List<AppointmentDTO> filterByCondition(Long patientId, String condition) {
    try {
      int status = condition.equalsIgnoreCase("past") ? 1 : condition.equalsIgnoreCase("future") ? 0 : -1;
      if (status == -1) throw new IllegalArgumentException("Invalid condition: must be 'past' or 'future'");
      List<Appointment> list = appointmentRepository.findByPatient_IdAndStatusOrderByAppointmentTimeAsc(patientId, status);
      return list.stream()
          .map(AppointmentDTO::new).toList();
    } catch (Exception e) {
      log.error("filterByCondition error", e);

      return List.of();
    }
  }

  // 6. Filter appointments by doctor name
  @Transactional
  public List<AppointmentDTO> filterByDoctor(String doctorName, Long patientId) {
    try {
      List<Appointment> list = appointmentRepository.filterByDoctorNameAndPatientId(doctorName, patientId);
      return list.stream().map(this::convertToDTO).collect(Collectors.toList());
    } catch (Exception e) {
      e.printStackTrace();
      return List.of();
    }
  }

  // 7. Filter appointments by doctor and condition
  @Transactional
  public List<AppointmentDTO> filterByDoctorAndCondition(String doctorName, Long patientId, String condition) {
    try {
      int status = condition.equalsIgnoreCase("past") ? 1 : condition.equalsIgnoreCase("future") ? 0 : -1;
      if (status == -1) throw new IllegalArgumentException("Invalid condition: must be 'past' or 'future'");

      List<Appointment> list = appointmentRepository.filterByDoctorNameAndPatientIdAndStatus(doctorName, patientId, status);
      return list.stream().map(this::convertToDTO).collect(Collectors.toList());
    } catch (Exception e) {
      e.printStackTrace();
      return List.of();
    }
  }

  // 8. Get patient details using token
  public Patient getPatientDetails(String token) {
    try {
      String email = tokenService.extractEmailFromToken(token);
      return patientRepository.findByEmail(email);
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }

  // 10. Utility: Convert Appointment to DTO
  private AppointmentDTO convertToDTO(Appointment appointment) {
    Doctor doctor = appointment.getDoctor();
    Patient patient = appointment.getPatient();

    return new AppointmentDTO(
    appointment
    );
  }
}