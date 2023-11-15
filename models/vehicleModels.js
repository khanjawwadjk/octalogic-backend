const db = require('../config/DBConnection');

const vehicleModels = {
    getAllWheelsData: ()=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from wheels", (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },

    getVehiclesByTheirWheels: (numberOfWheels)=>{
        return new Promise((resolve, reject)=>{
            db.query("select type_id , type_name, number_of_wheels from vehicle_types vt join wheels w on vt.wheel_id = w.wheel_id where w.number_of_wheels = $1",[numberOfWheels], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },

    getVehicleModelsByTheirType: (vehicleType)=>{
        return new Promise((resolve, reject)=>{
            db.query("select vehicle_id , v.type_id, model, is_available, vt.type_name  from vehicles v join vehicle_types vt on v.type_id = vt.type_id where v.type_id = $1",[vehicleType], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },

    checkWheelId: (wheelID)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from wheels where wheel_id = $1",[wheelID], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },
    checkVehicleTypeID: (vehicleTypeID)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from vehicle_types where type_id = $1",[vehicleTypeID], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },
    checkVehicleIDForModel: (vehicleIdForModel)=>{
        return new Promise((resolve, reject)=>{
            db.query("select * from vehicles where vehicle_id = $1",[vehicleIdForModel], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },

    getLatestRentalDataOfVehicleByID: (vehicleIdForModel)=>{
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM rentals WHERE vehicle_id_for_model_name = $1 ORDER BY rental_id DESC LIMIT 1",[vehicleIdForModel], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },
    insertVehicleDataForRent: (data)=>{
        return new Promise((resolve, reject)=>{
            db.query("insert into rentals (first_name, last_name, number_of_wheels, wheel_id, vehicle_type, vehicle_type_id, model, vehicle_id_for_model_name, rental_start_date, rental_end_date) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning rental_id, vehicle_id_for_model_name",[data.firstName, data.lastName, data.numberOfWheels, data.wheelID, data.typeOfVehicle, data.vehicleTypeID, data.model, data.vehicleIdForModel, data.startDate, data.endDate], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },

    updateVehicleAvailability: (vehicleId)=>{
        return new Promise((resolve, reject)=>{
            db.query("update vehicles set is_available = false where vehicle_id = $1",[vehicleId], (err, result)=>{
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    },
};

module.exports = vehicleModels;