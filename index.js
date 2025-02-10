import express from 'express'
import dotenv from 'dotenv'
import {dbController} from './controller/dbController.js'

dotenv.config()
console.log(process.env);

const app = express()
const port = process.env.SERVERPORT || 5000
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('Welcome to Homelands API')
    console.log(`Start: ${res.send}`)
    
})

app.use(dbController)

app.get('*', (req,res) => {
    res.send('Could not find file')
    console.log(`Error: ${res.send}`)
})

app.get('/sync', async (req, res) => {
    try {
        const resp = await sequelize.sync();
        res.send('Data successfully syncronized');
    }
    catch(error) {
        res.send(error);
    }
})

app.listen(port, () => {
    console.log(`Server runs at http://localhost:${port}`);
    
})