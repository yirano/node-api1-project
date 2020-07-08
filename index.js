// implement your API here
const express = require('express')
const db = require('./data/db.js')
const CircularJSON = require('circular-json')

const server = express()

server.use(express.json())

const PORT = 8080

// get all users
server.get("/api/users", async (req, res) => {
  const users = await db.find()
  users ?
    res.json(users)
    : res.status(500).json({
      message: 'The user information could not be retrieved.',
    })
})

// get user by ID
server.get('/api/users/:id', async (req, res) => {
  const user = await db.findById(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.json({
      message: 'User not found'
    })
  }
})

// create a user
// server.post()

// edit a user by id
// server.put()

// delete a user by id
// server.delete()

server.listen(8080, () => {
  console.log(`Server started on ${PORT}`)
})