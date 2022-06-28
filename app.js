const express = require('express')

const app = express()
const port = process.env.PORT || 80;


app.get('/', (req, res) => {
    res.send('ola bom dia')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
