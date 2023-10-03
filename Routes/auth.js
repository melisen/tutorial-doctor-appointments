import express from 'express';
import {register, login} from "../Controllers/authController.js"
const authRoute = express.Router();

//recordar agregar '/api/v1/auth' para probar

authRoute.post('/register', register)
authRoute.post('/login', login)



export default authRoute
