//import packages

require('dotenv').config()

const express =  require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const {PORT= 4000, DATABASE_URL} = process.env

const app = express()


//Middleware setup

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//setup conection

mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

mongoose.connection
.on('open', ()=> console.log('you are connected to database'))
.on('close', ()=> console.log('you are disconnected from database'))
.on('error', (error)=> console.log('error', error))



//MODEL:

const PeopleSchema = new mongoose.Schema({
    name: String,
    image: String,
    title: String,
})

const People = mongoose.model('People', PeopleSchema)



//ROUTES:

app.get('/', (req,res) => {
    res.send("Hello Everyone")
})

//People index route
app.get('/people', async (req,res) => {
    try {
        res.json(await People.find({}))
    } catch(error) {
        res.status(400).json(error)
    }
})

//People create route
app.post('/people', async (req,res) => {
    try {
        res.json(await People.create(req.body))
    } catch (error) {
        res.status(400).json(error)
    }
})

//People update route

app.put('/people/:id', async (req,res)=>{
    try {
        res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new:true}))
    } catch(error){
        res.status(400).json(error)
    }
})


// Delete route

app.delete('/people/:id', async (req,res) => {
    try{
        res.json(
            await People.findByIdAndRemove(req.params.id)
        )
    } catch (error){
        res.status(400).json(error)
    }
})



app.listen(PORT, ()=> console.log(`listening on port: ${PORT}`))

module.exports = app

