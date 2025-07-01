const express = require('express');
const hospitalDb = require('./db/hospitalDb');
const schoolDb = require('./db/schoolDb');
const collegeDb = require('./db/collegeDb'); 
const { Doctor, Patient, Room } = require('./models/hospital');
const { Teacher, Student, Class } = require('./models/school');
const { Professor, Student: CollegeStudent, Class: CollegeClass } = require('./models/college');

const app = express();
app.use(express.json());


app.post('/api/hospital/doctors', async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get('/api/hospital/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('patients');
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/api/hospital/patients', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    if (req.body.doctor) {
      await Doctor.findByIdAndUpdate(req.body.doctor, { $push: { patients: patient._id } });
    }
    if (req.body.room) {
      await Room.findByIdAndUpdate(req.body.room, { patient: patient._id, is_available: false });
    }
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/hospital/patients', async (req, res) => {
  try {
    const patients = await Patient.find().populate('doctor room');
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/hospital/rooms', async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/hospital/rooms', async (req, res) => {
  try {
    const rooms = await Room.find().populate('patient');
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/school/teachers', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/school/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().populate('classes');
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/school/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    if (req.body.class) {
      await Class.findByIdAndUpdate(req.body.class, { $push: { students: student._id } });
    }
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/school/students', async (req, res) => {
  try {
    const students = await Student.find().populate('class');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/school/classes', async (req, res) => {
  try {
    const classObj = new Class(req.body);
    await classObj.save();
    if (req.body.teacher) {
      await Teacher.findByIdAndUpdate(req.body.teacher, { $push: { classes: classObj._id } });
    }
    res.status(201).json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/school/classes', async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher students');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/college/professors', async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    res.status(201).json(professor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/college/professors', async (req, res) => {
  try {
    const professors = await Professor.find().populate('classes');
    res.status(200).json(professors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/college/students', async (req, res) => {
  try {
    const student = new CollegeStudent(req.body);
    await student.save();
    if (req.body.classes) {
      await CollegeClass.updateMany(
        { _id: { $in: req.body.classes } },
        { $push: { students: student._id } }
      );
    }
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/college/students', async (req, res) => {
  try {
    const students = await CollegeStudent.find().populate('classes');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/college/classes', async (req, res) => {
  try {
    const classObj = new CollegeClass(req.body);
    await classObj.save();
    if (req.body.professor) {
      await Professor.findByIdAndUpdate(req.body.professor, { $push: { classes: classObj._id } });
    }
    if (req.body.students) {
      await CollegeStudent.updateMany(
        { _id: { $in: req.body.students } },
        { $push: { classes: classObj._id } }
      );
    }
    res.status(201).json(classObj);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/college/classes', async (req, res) => {
  try {
    const classes = await CollegeClass.find().populate('professor students');
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});