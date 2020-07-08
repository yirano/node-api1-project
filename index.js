// implement your API here
const express = require('express')

const server = express()

const PORT = 8080

// get all users
server.get()

// get user by ID
server.get()

// create a user
server.post()

// edit a user by id
server.put()

// delete a user by id
server.delete()

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})