import express from 'express'
import cors from 'cors'
const app = express()
app.use(express.json())
const allowed_origin = process.env.FRONTEND_URL || 'http://localhost:5173'
app.use(cors({origin : allowed_origin}))
const PORT = process.env.PORT || 5000

let idc = 1
const acts = [{name:'puffing', id:1, done:true}]

const getActs = (req, res) => {
    return res.status(201).json({acts})
}
const addAct = (req, res) => {
    const name  = req.body.name
    const newAct = { name, id: idc + 1, done: false }
    idc ++
    acts.push(newAct)
    return res.status(200).json(newAct)
}
const deleteAct = (req, res) => {
    const id = Number(req.params.id)
    const idx = acts.findIndex(act => act.id === id)
    acts.splice(idx, 1)
    return res.status(200).json({message : 'Deleted'})
}
const toggleAct = (req, res) => {
    const id = Number(req.params.id)
    const act = acts.find(act => act.id === id)
    act.done = !act.done
    return res.status(200).json(id)
}

app.get('/acts', getActs)
app.post('/acts', addAct)
app.delete('/acts/:id', deleteAct)
app.patch('/acts/:id', toggleAct)

app.listen(PORT, '0.0.0.0', () => console.log(`acts listening on port ${PORT}`))
