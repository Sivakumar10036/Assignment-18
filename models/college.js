const mongoose = require('mongoose');
const collegeDb = require('../db/collegeDb');
const Schema = mongoose.Schema;

const ProfessorSchema = new Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  contact: { type: String },
  classes: [{ type: Schema.Types.ObjectId, ref: 'CollegeClass' }],
});

const StudentSchema = new Schema({
  name: { type: String, required: true },
  major: { type: String },
  classes: [{ type: Schema.Types.ObjectId, ref: 'CollegeClass' }],
});

const ClassSchema = new Schema({
  course_code: { type: String, required: true },
  course_name: { type: String, required: true },
  professor: { type: Schema.Types.ObjectId, ref: 'Professor', required: true },
  students: [{ type: Schema.Types.ObjectId, ref: 'CollegeStudent' }],
});

const Professor = collegeDb.model('Professor', ProfessorSchema);
const Student = collegeDb.model('CollegeStudent', StudentSchema);
const Class = collegeDb.model('CollegeClass', ClassSchema);

module.exports = { Professor, Student, Class };