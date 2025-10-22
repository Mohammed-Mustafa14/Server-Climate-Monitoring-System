const { ID } = require('appwrite');
const { appwriteConfig, tablesDB } = require('../lib/appwriteConfig');
const express = require('express');
const router = express.Router();
require('dotenv').config();

//upload humidity to db
const uploadHumidity = async (req, res) => {
  
   // Check if req.body exists
  if (!req.body) {
    return res.status(400).json({ success: false, message: 'Request body is missing' });
  }

  const { humidity } = req.body; // retrieve the data from the request's body

  // check if the data is not undefined
  if (humidity === undefined) {
    return res.status(400).json({ success: false, message: 'Missing humidity value' });
  }

  //try to upload data to the database, if there is an error we log it
  try {
    await tablesDB.createRow({
      databaseId: appwriteConfig.databaseId,
      tableId: appwriteConfig.humidityTableId,
      rowId: ID.unique(),
      data: { 
        humidity: parseFloat(humidity),        
       }
    })

    //return result
    res.json({ success: true, data: result });

  } catch (error) {
    console.log(error)
    //return error
    res.json({ success: false, error: error });
  }
}

router.post('/uploadHumidity', uploadHumidity);

module.exports = router;
