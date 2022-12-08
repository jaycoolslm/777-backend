const express = require('express')
const cors = require("cors")
const bodyParser = require('body-parser')
const { arrayEquals } = require('./utils')
const { buildTx, submitTx } = require('./hashgraph/prod')

const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors({
    // origin: 'http://98ff-81-108-34-40.ngrok.io/',
}))
app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/auth', (req, res) => {
    let code = req.query.key.split(",")
    code = code.map(letter => Number(letter))
    console.log(code)

    arrayEquals(code, [1, 2, 3, 4])
        ? res.send({ success: true })
        : res.send({ success: false })

})

app.post('/buildTx', (req, res) => {
    const { id } = req.body
    const bytes = buildTx(id)
    res.send({ bytes })
})

app.post('/submitTx', async (req, res) => {
    const { bytes } = req.body
    const success = await submitTx(bytes)
    res.send({ success })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

