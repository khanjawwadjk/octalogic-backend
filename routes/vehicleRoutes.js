const express = require('express');
const vehicleControllers = require('../controllers/vehicleControllers');
const router = express.Router();

//Endpoint to Get Number Of Wheels Available in our Database
router.get('/Wheels', (req, res)=>{
    vehicleControllers.getWheels(req, res);
});

//Endpoint to Get Vehicles based on number of wheels they have
router.get('/Types/:wheels', (req, res)=>{
    vehicleControllers.getVehiclesByTheirNoOfWheels(req, res);
});

//Endpoint to Get Vehicle Models based on their type
router.get('/Model/:typeId', (req, res)=>{
    vehicleControllers.getVehicleModelsByTheirVehicleType(req, res);
});

//Endpoint to rent a vehicle
router.post('/Rent', (req, res)=>{
    vehicleControllers.rentAVehicle(req, res);
});

module.exports = router;