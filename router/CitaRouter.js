import express from 'express';
import {getAvailableSpecialties, reserveAppointment, getCitas} from '../controller/CitaController.js';

const rotuer = express.Router();

rotuer.get('/espe/users', getAvailableSpecialties);
rotuer.post('/espe/user', reserveAppointment);
rotuer.get('/espe/usr', getCitas);




export const RouterCita = rotuer;