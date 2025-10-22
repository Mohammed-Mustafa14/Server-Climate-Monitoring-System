const { ID } = require('appwrite');
const { appwriteConfig, tablesDB } = require('../lib/appwriteConfig');
const express = require('express');
const router = express.Router();
require('dotenv').config();

//upload temperature to db
const uploadTemperature = async (req, res) => {
  
   // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ success: false, message: 'Request body is missing' });
  }

  const { temperature } = req.body; // retrieve the data from the request's

  // check if the data is not undefined
  if (temperature === undefined) {
    return res.status(400).json({ success: false, message: 'Missing temperature value' });
  }
  
  //try to upload data to the database, if there is an error we log it
  try {
    await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.temperatureTableId,
      rowId: ID.unique(),
      data: { 
        temperature: parseFloat(temperature),        
       }
    })

  } catch (error) {
    console.log(error)
    console.error(error); // prints full error with stack trace to the server console
    res.status(500).json({ // optional: set proper HTTP status
        success: false,
        message: error.message, // just the message
        stack: error.stack      // optional: full stack trace
    });
  }
}

router.post('/uploadTemperature', uploadTemperature);

module.exports = router;