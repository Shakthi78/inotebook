const connectToMongo = require('./db');
const auth = require('./routes/auth')
const notes = require('./routes/notes')
const express = require('express')
const app = express()
const port = 5000

connectToMongo();
app.use(express.json())

//Available Routes
app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
