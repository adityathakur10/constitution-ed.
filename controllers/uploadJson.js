const fs = require('fs');
const path = require('path');
const caseModel = require('../models/json'); // Adjust the path as needed

async function uploadJsonFile(caseName,filePath) {
  try {
    // Read the JSON file from the directory
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Parse the file content to JSON
    const jsonData = JSON.parse(fileContent);

    // Save the JSON data to MongoDB
    const newData = new caseModel({name:caseName, data: jsonData });
    await newData.save();

    console.log('JSON file data uploaded successfully.');
  } catch (error) {
    console.error('Error uploading JSON file:', error);
  }
}

module.exports=uploadJsonFile

// Example usage: specify the path to your JSON file
// const filePath = path.join(__dirname, 'json_files', 'Shayara_Bano.json'); // Replace with your JSON file path

