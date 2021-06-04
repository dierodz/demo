const express = require("express");
const morgan = require("morgan");
const axios = require("axios").default;
const cors = require("cors")
const Sequelize = require("sequelize")

const db = new Sequelize('postgres://postgres:example@localhost:5432/henryblog')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  }
})

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

const users = [
  {
    "id": 99,
    "name": "Toni Tralice",
    "username": "Toni",
    "email": "toni@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  },
]

app.get('/users', (req, res) => {
  let remoteUsers;
  axios.get('http://jsonplaceholder.typicode.com/users')
    .then(response => {
      remoteUsers = response.data
      return User.findAll()
    })
    .then(users => {
      return res.json([...remoteUsers, ...users])
    })
    .catch(error => res.status(500).json({ error: 'Ups!!! 😱' }))
})

app.get('/users/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://jsonplaceholder.typicode.com/users/${req.params.id}`)
    res.json(response.data)
  } catch (error) {
    if(error.response?.status === 404) {
      User.findByPk(req.params.id).then(user => {
        if(user) return res.json(user)
        return res.sendStatus(404)
      })
    } else {
      res.status(500).json({ error: 'Ups!!! 😱' })
    }
  }
})
db.sync({force: true}).then(() => {
  app.listen(3001, () => { 
    console.log('Servidor corriendo en puerto 3001')
    User.create({
      id: 99,
      name: "Toni Tralice"
    })
    User.create({
      id: 100,
      name: "Wanda Cirone"
    })
  })
})