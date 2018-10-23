const express = require('express')
const app = express()
const port = 8081
var redis = require('redis')
var client = redis.createClient(9000,'redis')

client.set('counter',0,function(err) {
  if (err) {
    throw err; /* in production, handle errors more gracefully */
  }})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/redischeck', (req, res) => {
  let counter = client.get('counter', function(err,value) {
      if (err) {
        throw err;
      } else {
        console.log(value)
        value = parseInt(value)+1
        client.set('counter',value,function(err) {
          if (err) {
            throw err; /* in production, handle errors more gracefully */
          }})
        res.send('Counter:'+value)


      }
    })

})
