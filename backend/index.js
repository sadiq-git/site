const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/command', (req, res) => {
  const { command, args } = req.body;
  // Here you can add logic to handle commands such as checking pipeline status, etc.
  if (command === 'pipeline-status') {
    res.json({ output: 'CI/CD Pipeline is running. Last build: SUCCESS.' });
  }
  else {
    res.json({ output: `Command '${command}' not implemented.` });
  }
});

app.listen(4000, () => {
  console.log('API listening on port 4000');
});
