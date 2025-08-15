// src/index.ts
import express from 'express'
import { readdirSync, readFileSync, writeFileSync } from 'fs'

import path from 'path'
import { fileURLToPath } from 'url'

import type { LoanDTO } from './mid/types.ts'
const app = express()
const port = 8080

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from the 'templates' directory
app.use(express.static(path.join(__dirname, 'templates')))

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.json())

// Optional: Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'))
})

app.get('/loans', (req, res) => {
    const dir = readdirSync('saved_loans')
    res.json(dir.map((f) => f.substring(0, f.length - 5)))
})

app.post('/save', (req, res) => {
    const loan: LoanDTO = req.body

    writeFileSync(`saved_loans/${loan.name}.json`, JSON.stringify(loan))
    res.json({ all: 'set' })
})

app.get('/load/:name', (req, res) => {
    const loan: LoanDTO = JSON.parse(readFileSync(`saved_loans/${req.params.name}.json`, 'utf-8'))
    res.json(loan)
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
