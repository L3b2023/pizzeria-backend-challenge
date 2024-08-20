const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'pizzeria'
})

connection.connect()

app.get('/api/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (error, results) =>{
    if (error){
      return res.status(500).json({error: 'an error ocurred with your request'})
    }
    res.json(results)
  })
})

app.get('/api/orders/:id', (req, res) =>{
  var id = req.params.id
  const query = 'SELECT * FROM orders WHERE id = ?'
  connection.query(query, id, (error, results) =>{
    if (error){
      return res.status(500).json({error: 'an error ocurred with your request'})
    }
    res.json({
      'order details': results 
    })
  })
})

app.get('/api/pizzas', (req, res) => {
  const pizzas = [
        {
          "name": "Margherita",
          "price": 5,
          "ingredients": [
            "tomato",
            "mozzarella"
          ]
        },
        {
          "name": "Bufala",
          "price": 6,
          "ingredients": [
            "tomato",
            "mozarella di bufala"
          ]
        },
        {
          "name": "Romana",
          "price": 5,
          "ingredients": [
            "tomato",
            "mozzarella",
            "anchovies",
            "oregano",
            "oil"
          ]
        },
        {
          "name": "Diavola",
          "price": 7.5,
          "ingredients": [
            "tomato",
            "mozzarella",
            "spicy salami"
          ]
        },
        {
          "name": "Pizza Bianca",
          "price": 5,
          "ingredients": [
            "mozzarella",
            "oregano"
          ]
        }
    ]
    
  res.json(pizzas)
})

app.listen(port)