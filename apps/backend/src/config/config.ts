import dotenv from 'dotenv'
// Load enviornment variable
const result = dotenv.config()
if(result.error){
  throw new Error("Failed to load enviornment variable. Please check .env file")
}
