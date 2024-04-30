const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/tasks', (req, res) => {
  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/tasks', (req, res) => {
  const task = req.body.task;
  if (!task) {
    res.status(400).send('Task is required');
    return;
  }

  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
      return;
    }
    const tasks = JSON.parse(data);
    tasks.push(task);
    fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(500).send('Error writing tasks file');
        return;
      }
      res.status(201).send('Task added successfully');
    });
  });
});

app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index);

  fs.readFile('tasks.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading tasks file');
      return;
    }
    let tasks = JSON.parse(data);
    if (index < 0 || index >= tasks.length) {
      res.status(400).send('Invalid task index');
      return;
    }
    tasks.splice(index, 1);
    fs.writeFile('tasks.json', JSON.stringify(tasks), (err) => {
      if (err) {
        res.status(500).send('Error writing tasks file');
        return;
      }
      res.status(200).send('Task deleted successfully');
    });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
