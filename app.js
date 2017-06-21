const express = require('express')
const app = express()
const mustache = require('mustache-express')
const bodyParser = require('body-parser')

app.use(express.static('public'))
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(bodyParser.urlencoded({ extended: false }))

const todo = []
const complete = []

app.get('/', function (req, res) {
  res.render('todo', {todo: todo, complete})
})

app.post('/', function (req, res) {
  const task = req.body.task
  const tocomplete = req.body.tocomplete

  if (task) {
    todo.push(task)
  } else if (tocomplete) {
    for(let i = 0; i < todo.length; i++) {
      if (todo === tocomplete) {
        todo.splice(todo[i] - 1, 1)
      }
    }
    complete.push(tocomplete)
  }
  res.redirect('/')
})

app.listen(3000, function () {
  console.log('ok cool, listening!')
})
