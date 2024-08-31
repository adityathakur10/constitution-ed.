const { GoogleAIFileManager } = require("@google/generative-ai/server");
//Initialize GoogleAIFileManager with your API_KEY
const fileManager=new GoogleAIFileManager(process.env.API_KEY)

const  { GoogleGenerativeAI } =require( "@google/generative-ai");
// Initialize GoogleGenerativeAI with your API_KEY.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);


async function uploadFile(filePath, displayName) {
    try {
      const uploadResponse = await fileManager.uploadFile(filePath, {
        mimeType: "application/pdf",
        displayName: displayName,
      });
  
      console.log(`Uploaded file ${uploadResponse.file.displayName} as: ${uploadResponse.file.uri}`);
      return uploadResponse.file.uri;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

async function generateContent(fileUri,question) {
    try {
      const model = genAI.getGenerativeModel({
        // Choose a Gemini model.
        model: "gemini-1.5-flash",
      });
  
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: "application/pdf",
            fileUri: fileUri,
          }
        },
        { text: question },
      ]);
  return result.status(200).json({ans:result.response.text()})
    //   console.log(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }



// main function to upload and generate content 
async function main(ques) {
    try {
      const fileUri = await uploadFile("./pdf/sih_cases.pdf", "Gemini 1.5 PDF");
      await generateContent(fileUri,ques);
    } catch (error) {
      console.error("An error occurred in the process:", error);
    }
  }


  module.exports={main};
