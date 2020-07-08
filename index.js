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
  if (users) {
    res.json(users)
  } else {
    res.status(500).json({
      message: 'The user information could not be retrieved.',
    })
  }
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
server.post('/api/users', async (req, res) => {
  if (req.body.name && req.body.bio) {
    const newUser = db.insert({
      name: req.body.name,
      bio: req.body.bio,
    })
    res.json(await db.find())
  } else {
    res.json({
      message: "Could not post user"
    })
  }
})

// edit a user by id
server.put('/api/users/:id', async (req, res) => {
  const user = await db.findById(req.params.id)
  if (user) {
    const updated = db.update(user.id, {
      name: req.body.name,
      bio: req.body.bio
    })
    if (await updated) {
      res.json(await db.find())
    }
  } else {
    res.json({
      message: 'Could not update user'
    })
  }
})

// delete a user by id
server.delete('/api/users/:id', async (req, res) => {
  const user = await db.findById(req.params.id)
  if (user) {
    const deleted = db.remove(user.id)
    res.json(await deleted)
  } else {
    res.json({
      message: 'User not found'
    })
  }
})

server.listen(8080, () => {
  console.log(`Server started on ${PORT}`)
})