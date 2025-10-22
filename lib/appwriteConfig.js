const {Client, TablesDB,} = require('appwrite');
require('dotenv').config();

// get all the env variables
const appwriteConfig = {
    projectId: process.env.APPWRITE_PROJECT_ID,
    url: process.env.APPWRITE_URL,
    databaseId: process.env.APPWRITE_DATABASE_ID,
    humidityTableId: process.env.APPWRITE_HUMIDITY_TABLE_ID,
    temperatureTableId: process.env.APPWRITE_TEMPERATURE_TABLE_ID,
}

const client = new Client();

//set up client
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url)

const tablesDB = new TablesDB(client);

//export the data we want to re-use
module.exports = {
    appwriteConfig,
    client,
    tablesDB,
  };