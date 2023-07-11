const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


let students = [
  { id: 1, name: 'MRA', age: 20, grade: 'A' },
  { id: 2, name: 'MRB', age: 22, grade: 'B' },
];


app.get('/students', (req, res) => {
  res.json(students);
});


app.get('/students/:id', (req, res) => {
  const id = req.params.id;

  students.find()

  const student = students.find((student) => student.id === parseInt(id));

  if (!student) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    res.json(student);
  }
});


app.post('/students', (req, res) => {
  const { id, name, age, grade } = req.body;
  const newStudent = { id, name, age, grade };

  students.push(newStudent);

  res.status(201).json(newStudent);
});


app.put('/students/:id', (req, res) => {
  const id = req.params.id;
  const { name, age, grade } = req.body;

  const studentIndex = students.findIndex((student) => student.id === parseInt(id));

  if (studentIndex === -1) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    const updatedStudent = {
      id,
      name: name || students[studentIndex].name,
      age: age || students[studentIndex].age,
      grade: grade || students[studentIndex].grade,
    };

    students[studentIndex] = updatedStudent;

    res.json(updatedStudent);
  }
});


app.delete('/students/:id', (req, res) => {
  const id = req.params.id;

  const studentIndex = students.findIndex((student) => student.id === parseInt(id));

  if (studentIndex === -1) {
    res.status(404).json({ error: 'Student not found' });
  } else {
    const deletedStudent = students[studentIndex];

    students.splice(studentIndex, 1);

    res.json(deletedStudent);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
