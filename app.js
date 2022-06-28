const express = require('express')

const app = express()
const port = process.env.PORT || 3001;


app.get('/', async (req, res) => {
    res.json(result)
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
