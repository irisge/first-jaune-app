const express = require('express');
const dataSource = require('./utils').dataSource;
const wilderController = require('./controller/wilder');
const skillController = require('./controller/skill');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/api/wilder', wilderController.create);
app.get('/api/wilder', wilderController.read);
app.put('/api/wilder/:id', wilderController.update);
app.delete('/api/wilder/:id', wilderController.delete);

app.post('/api/skill', skillController.create);
app.get('/api/skill', skillController.read);
app.put('/api/skill/:id', skillController.update);
app.delete('/api/skill/:id', skillController.delete);

app.post('/api/wilder-skill', wilderController.addSkill);

app.get('*', (req, res) => {
  res.status(404).json('Page not found!');
});

const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log('Server started on 3000'));
};

start();
