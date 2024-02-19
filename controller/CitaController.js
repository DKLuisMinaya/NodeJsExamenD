
import { Op } from 'sequelize';
import { CitaModel } from '../models/CitaModel.js';
import {  TypeUsersModel} from '../models/TypeUsersModel.js';
import { UserModel } from '../models/UserModel.js';



    
    export const  getAvailableSpecialties = async (req, res) => {
      try {
       
        const availableDoctors = await UserModel.findAll({
          where: {
            state: true, 
            especialidad: { [Op.not]: null }, 
          },
          attributes: ['id', 'name', 'especialidad'], 
          include: [
            {
              model: CitaModel,
              attributes: ['fechaHora'], 
              where: {
                fechaHora: {
                  [Op.gt]: new Date(), 
                },
              },
              required: false, 
            },
          ],
        });
  
        const specialties = Array.from(
          new Set(availableDoctors.map((doctor) => doctor.especialidad))
        );
  
    
        const result = specialties.map((specialty) => {
          const doctorsInSpecialty = availableDoctors
            .filter((doctor) => doctor.especialidad === specialty)
            .map((doctor) => ({
              id: doctor.id,
              name: doctor.name,
              availableDates: doctor.citas
                ? doctor.citas.map((cita) => cita.fechaHora)
                : [],
            }));
  
          return {
            specialty,
            doctors: doctorsInSpecialty,
          };
        });
  
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    export const getCitas = async (req, res) => {
        try {
          const users = await CitaModel.findAll({
            attributes: ['medico', 'fechaHora' ]
          },{where: {state:true}});
        
          res.status(200).json({users});
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
  
  
    export const  reserveAppointment= async (req, res) => {
      try {
        const { medico, fechaHora, userId } = req.body;
  
        const doctor = await UserModel.findOne({
          where: {
            name: medico,
            state: true,
            especialidad: { [Op.not]: null },
          },
        });
  
        if (!doctor) {
          return res.status(404).json({ error: 'Médico no encontrado o no disponible' });
        }

        const newAppointment = await CitaModel.create({
          medico,
          fechaHora,
          userId,
        });
  
        await UserModel.update({ state: false }, { where: { id: medico } });
  
        res.status(201).json(newAppointment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  