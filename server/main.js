const core = require('./core.js');
const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get('/captions', async (req, res) => {
  const url = req.query.url;

  const captions = await core.getCaptions(url);

  if (!captions) {
    res.status(404).send('No captions found for this video ☹️');
  } else {
    res.status(200).send(captions);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

process.on('uncaughtException', function (err) {
  console.log(err);
})
