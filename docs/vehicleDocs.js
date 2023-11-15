/** 
 * @swagger
/Vehicles/Wheels: 
*   get: 
*     description: Get All number of wheels available.
*     tags:
*     - Vehicles
*     summary: Get All number of wheels available.
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/

/** 
 * @swagger
/Vehicles/Types/{wheels}: 
*   get: 
*     description: Get All number of wheels available.
*     tags:
*     - Vehicles
*     summary: Get All number of wheels available.
*     parameters: 
*     - name: wheels
*       description: Number of Wheels.
*       in: path 
*       type: integer
*       required: true
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/

/** 
 * @swagger
/Vehicles/Model/{typeId}: 
*   get: 
*     description: Get All models available for given type.
*     tags:
*     - Vehicles
*     summary: Get All models available for given type.
*     parameters: 
*     - name: typeId
*       description: Vehicle Type ID.
*       in: path 
*       type: integer
*       required: true
*     produces:
*       - application/json
*     responses:  
*       200: 
*         description: Data Found Successful
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/


/** 
 * @swagger 
 * definitions:
 *   rentAVehicleDef:
 *     properties:
 *       firstName:
 *         type: string
 *         required: true
 *         description: Enter firstName.
 *       lastName:
 *         type: string
 *         required: true
 *         description: Enter lastName.
 *       numberOfWheels:
 *         type: string
 *         required: true
 *         description: Enter numberOfWheels.
 *       wheelID:
 *         type: integer
 *         required: true
 *         description: Enter wheelID.
 *       typeOfVehicle:
 *         type: string
 *         required: true
 *         description: Enter typeOfVehicle.
 *       vehicleTypeID:
 *         type: integer
 *         required: true
 *         description: Enter vehicleTypeID.
 *       model:
 *         type: string
 *         required: true
 *         description: Enter model.
 *       vehicleIdForModel:
 *         type: integer
 *         required: true
 *         description: Enter vehicleIdForModel.
 *       startDate:
 *         type: string
 *         required: true
 *         description: Enter startDate.
 *       endDate:
 *         type: string
 *         required: true
 *         description: Enter endDate.
 */
/** 
 * @swagger
/Vehicles/Rent: 
*   post: 
*     description: Rent a Vehicle.
*     tags:
*     - Vehicles
*     summary: Rent a Vehicle.
*     parameters: 
*     - name: Model 
*       description: Rent a Vehicle.
*       in: body 
*       required: true
*       schema: 
*          $ref: '#/definitions/rentAVehicleDef'
*     produces:
*       - application/json
*     responses:  
*       201: 
*         description: Vehicle rented successfully
*       404: 
*         description: Data Not Found
*       500:
*         description: Internal server error
*/
