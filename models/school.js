const mongoose = require('mongoose');
const schoolDb = require('../db/schoolDb');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  contact: { type: String },
  classes: [{ type: Schema.Types.ObjectId, ref: 'Class' }],
});

const StudentSchema = new Schema({
  name: { type: String, required: true },
  grade: { type: Number },
  class: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
});

const ClassSchema = new Schema({
  class_name: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const Teacher = schoolDb.model('Teacher', TeacherSchema);
const Student = schoolDb.model('Student', StudentSchema);
const Class = schoolDb.model('Class', ClassSchema);

module.exports = { Teacher, Student, Class };