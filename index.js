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
  try {
    const user = await db.findById(req.params.id)
    if (user) {
      res.json(user)
    } else {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.'
      })
    }
  } catch {
    res.status(500).json({
      errorMessage: "The user information could not to be retrieved."
    })
  }
})

// create a user
server.post('/api/users', async (req, res) => {
  try {
    if (req.body.name == '' || req.body.bio == '') {
      res.status(400).json({
        errorMessage: "Please provide name and bio for the user."
      })
    } else {
      const newUser = db.insert({
        name: req.body.name,
        bio: req.body.bio,
      })
      res.status(201).json(await db.find())
    }
  } catch {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database.'
    })
  }
})

// edit a user by id
server.put('/api/users/:id', async (req, res) => {
  try {
    const user = await db.findById(req.params.id)
    if (user) {
      if (req.body.name == '' || req.body.bio == '') {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        })
      } else {
        const updated = await db.update(user.id, {
          name: req.body.name,
          bio: req.body.bio
        })
        res.status(200).json(await db.find())
      }
    } else {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.'
      })
    }
  } catch {
    res.status(500).json({
      errorMessage: 'The user information could not be modified.'
    })
  }
})

// delete a user by id
server.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await db.findById(req.params.id)
    if (user) {
      const deleted = db.remove(user.id)
      res.json(await deleted)
    } else {
      res.status(404).json({
        message: 'The user with the specified ID does not exist.'
      })
    }
  } catch {
    res.status(500).json({
      errorMessage: "The user could not be removed."
    })
  }
})

server.listen(8080, () => {
  console.log(`Server started on ${PORT}`)
})