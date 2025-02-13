import express from 'express'
import dotenv from 'dotenv'
import {dbController} from './controller/dbController.js'
import { authController } from './controller/authController.js';
import { cityController } from './controller/cityController.js';
import { estateController } from './controller/estateController.js';
import { estateTypeController } from './controller/estateTypeController.js'
import { favoriteController } from './controller/favoriteController.js';
import { reviewController } from './controller/reviewController.js';
import { staffController } from './controller/staffController.js';
import { userController } from './controller/userController.js';

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
app.use(authController)
app.use(cityController)
app.use(estateController)
app.use(estateTypeController)
app.use(favoriteController)
app.use(reviewController)
app.use(staffController)
app.use(userController)


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