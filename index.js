const express = require('express')
const app = express()
const port = 3001;
const router = require("./routes/musicRoutes")
app.use(express.json());
app.use(router)



app.get('/', function (req, res) {
  res.send('Hello World from rejgeiopgjgjkpojger ')
})

app.listen(port, () => {
    console.log(`server is running on port &{port}`)
});

app.put('/', (req, res) => {
    res.send('PUT request to homepage')
  })