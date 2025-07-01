const mongoose = require('mongoose');
const hospitalDb = require('../db/hospitalDb');
const Schema = mongoose.Schema;


const DoctorSchema = new Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  contact: { type: String },
  patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
});


const PatientSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  condition: { type: String },
  doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room', default: null },
});


const RoomSchema = new Schema({
  room_number: { type: String, required: true },
  is_available: { type: Boolean, default: true },
  patient: { type: Schema.Types.ObjectId, ref: 'Patient', default: null },
})


const Doctor = hospitalDb.model('Doctor', DoctorSchema);
const Patient = hospitalDb.model('Patient', PatientSchema);
const Room = hospitalDb.model('Room', RoomSchema);

module.exports = { Doctor, Patient, Room };