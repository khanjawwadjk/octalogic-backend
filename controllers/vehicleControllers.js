const vehicleModels = require("../models/vehicleModels");
const errorLogs = require("./errorLogs");
const isEmpty = require("./isEmpty");
const validator = require("validator");
const moment = require('moment');

const vehicleControllers = {
  getWheels: async (req, res) => {
    try {
      const wheelDataResult = await vehicleModels.getAllWheelsData();
      if (wheelDataResult.rows.length > 0) {
        res.status(200).send({
          status: true,
          message: "Data found successfully",
          data: wheelDataResult.rows,
        });
      } else {
        errorLogs(res, 404, "No data found", "getWheels");
      }
    } catch (err) {
      console.log(err);
      errorLogs(res, 500, "Something went wrong", "getWheels");
    }
  },

  getVehiclesByTheirNoOfWheels: async (req, res) => {
    try {
      let numberOfWheels = req.params.wheels;
      let errors = {};

      numberOfWheels = !isEmpty(numberOfWheels) ? numberOfWheels : null;
      if (validator.isEmpty(numberOfWheels)) {
        errors.numberOfWheels = "Number of Wheels are required";
      }

      if (Object.keys(errors).length > 0) {
        res.status(401).send({
          status: false,
          message: "Invalid data",
          errorData: errors,
        });
      } else {
        const getVehiclesByTheirWheelsResult =
          await vehicleModels.getVehiclesByTheirWheels(
            numberOfWheels.toString()
          );
        if (getVehiclesByTheirWheelsResult.rows.length > 0) {
          res.status(200).send({
            status: true,
            message: "Data found successfully",
            data: getVehiclesByTheirWheelsResult.rows,
          });
        } else {
          errorLogs(res, 404, "No data found", "getVehiclesByTheirNoOfWheels");
        }
      }
    } catch (err) {
      console.log(err);
      errorLogs(
        res,
        500,
        "Something went wrong",
        "getVehiclesByTheirNoOfWheels"
      );
    }
  },

  getVehicleModelsByTheirVehicleType: async (req, res) => {
    try {
      let vehicleType = req.params.typeId;
      let errors = {};

      vehicleType = !isEmpty(vehicleType) ? vehicleType : null;
      if (validator.isEmpty(vehicleType)) {
        errors.vehicleType = "Vehicle type ID required";
      }

      if (Object.keys(errors).length > 0) {
        res.status(401).send({
          status: false,
          message: "Invalid data",
          errorData: errors,
        });
      } else {
        const getVehicleModelsByTheirTypeResult =
          await vehicleModels.getVehicleModelsByTheirType(
            vehicleType.toString()
          );
        if (getVehicleModelsByTheirTypeResult.rows.length > 0) {
          res.status(200).send({
            status: true,
            message: "Data found successfully",
            data: getVehicleModelsByTheirTypeResult.rows,
          });
        } else {
          errorLogs(res, 404, "No data found", "getVehiclesByTheirNoOfWheels");
        }
      }
    } catch (err) {
      console.log(err);
      errorLogs(
        res,
        500,
        "Something went wrong",
        "getVehicleModelsByTheirVehicleType"
      );
    }
  },

  rentAVehicle: async (req, res) => {
    try {
      let {
        firstName,
        lastName,
        numberOfWheels,
        wheelID,
        typeOfVehicle,
        vehicleTypeID,
        model,
        vehicleIdForModel,
        startDate,
        endDate,
      } = req.body;
      let errors = {};
      
      firstName = !isEmpty(firstName) ? firstName : null;
      lastName = !isEmpty(lastName) ? lastName : null;
      numberOfWheels = !isEmpty(numberOfWheels) ? numberOfWheels : null;
      wheelID = !isEmpty(wheelID) ? wheelID : null;
      typeOfVehicle = !isEmpty(typeOfVehicle) ? typeOfVehicle : null;
      vehicleTypeID = !isEmpty(vehicleTypeID) ? vehicleTypeID : null;
      model = !isEmpty(model) ? model : null;
      vehicleIdForModel = !isEmpty(vehicleIdForModel)
        ? vehicleIdForModel
        : null;
      startDate = !isEmpty(startDate) ? moment(startDate).format() : null;
      endDate = !isEmpty(endDate) ? moment(endDate).format() : null;

      if (validator.isEmpty(firstName)) {
        errors.firstName = "firstName is required.";
      }
      if (validator.isEmpty(lastName)) {
        errors.lastName = "lastName is required.";
      }
      if (validator.isEmpty(numberOfWheels)) {
        errors.numberOfWheels = "Number Of Wheels are required.";
      }
      if (validator.isEmpty(wheelID.toString())) {
        errors.wheelID = "wheelID is required.";
      }
      if (validator.isEmpty(typeOfVehicle)) {
        errors.typeOfVehicle = "Type Of Vehicle is required.";
      }
      if (validator.isEmpty(vehicleTypeID.toString())) {
        errors.vehicleTypeID = "Vehicle type ID is required.";
      }
      if (validator.isEmpty(model)) {
        errors.model = "Model is required.";
      }
      if (validator.isEmpty(vehicleIdForModel.toString())) {
        errors.vehicleIdForModel = "vehicleIdForModel is required.";
      }
      if (validator.isEmpty(startDate)) {
        errors.startDate = "startDate is required.";
      }
      if (validator.isEmpty(endDate)) {
        errors.endDate = "endDate is required.";
      }

      if (Object.keys(errors).length > 0) {
        res.status(401).send({
          status: false,
          message: "Invalid data",
          errorData: errors,
        });
      } else {
        let checkWheelIdResult = await vehicleModels.checkWheelId(wheelID);
        let checkVehicleTypeIDResult = await vehicleModels.checkVehicleTypeID(vehicleTypeID);
        let checkVehicleIDForModelResult = await vehicleModels.checkVehicleIDForModel(vehicleIdForModel);

        let DataErrors = {};

        if (!(checkWheelIdResult.rows.length > 0)) {
          DataErrors.wheelId = "No data found for given Wheel ID";
        }
        if (!(checkVehicleTypeIDResult.rows.length > 0)) {
          DataErrors.vehicleTypeId = "No data found for given Vehicle Type ID";
        }
        if (!(checkVehicleIDForModelResult.rows.length > 0)) {
          DataErrors.vehicleId = "No data found for given Vehicle ID";
        }

        if (Object.keys(DataErrors).length > 0) {
          res.status(401).send({
            status: false,
            message: "Invalid data",
            errorData: DataErrors,
          });
        } else {
          let getRentalDataOfVehicle = await vehicleModels.getLatestRentalDataOfVehicleByID(vehicleIdForModel);

          if (getRentalDataOfVehicle.rows.length > 0) {
            let rentalStartDateFromDB = moment(getRentalDataOfVehicle.rows[0]["rental_start_date"]).format();
            let rentalEndDateFromDB = moment(getRentalDataOfVehicle.rows[0]["rental_end_date"]).format();

            if (moment(startDate).isSameOrAfter(rentalStartDateFromDB, 'day') || moment(endDate).isSameOrBefore(rentalEndDateFromDB, 'day')) {
                res.status(400).send({
                    status: false,
                    message: "Vehicle already booked. Please select another vehicle"
                })
            }else{
                let vehicleRentResult = await vehicleModels.insertVehicleDataForRent(req.body);

                if (vehicleRentResult.rows.length > 0) {    
                  res.status(201).send({
                    status: true,
                    message: "Vehicle Booked successfully",
                  });
                }
            }
          }else{
            let vehicleRentResult = await vehicleModels.insertVehicleDataForRent(req.body);

            if (vehicleRentResult.rows.length > 0) {    
              res.status(201).send({
                status: true,
                message: "Vehicle Booked successfully",
              });
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      errorLogs(res, 500, "Something went wrong", "rentAVehicle");
    }
  },
};

module.exports = vehicleControllers;
