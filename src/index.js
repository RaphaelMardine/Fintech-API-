const { response, request } = require('express')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
app.use(express.json())
const customers = []

//Middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers
  const customer = customers.find(customer => customer.cpf === cpf)
  if (!customer) {
    return res.status(400).json({ error: 'Customer Not Found' })
  }
  req.customer = customer
  return next()
}
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

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req
  return res.json(customer.statement)
})

app.listen(3333)
