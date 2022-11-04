const { response } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())
const customers = []

// cpf - string
// name - string
// id - uuid
// statement - []
app.post('/account', (req, res) => {
  const { cpf, name } = req.body
  const customerAlreadyExist = customers.some(customer => customer.cpf === cpf)
  if (customerAlreadyExist) {
    return res.status(400).json({ error: 'Customer Already Exist' })
  }
  customers.push({
    cpf,
    name,
    id: uuidv4,
    statement: []
  })
  return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' })
})

app.listen(3333)