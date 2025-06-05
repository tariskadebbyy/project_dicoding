const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

let stories = [];

app.get('/stories', (req, res) => {
  res.json(stories);
});

app.post('/stories', upload.single('photo'), (req, res) => {
  const { latitude, longitude } = req.body;
  const file = req.file;

  if (!latitude || !longitude || !file) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const newStory = {
    id: Date.now(),
    photo: file.filename,
    latitude,
    longitude
  };

  stories.push(newStory);
  res.status(201).json({ message: 'Cerita ditambahkan', data: newStory });
});

app.listen(8080, () => console.log('Server berjalan di http://localhost:8080'));
