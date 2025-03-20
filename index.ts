import { app } from './src/app'

import { config } from "dotenv"
import { dbConnection } from "./src/configs/db"
config()

const PORT = process.env.PORT


app.listen(PORT, async() => {
    await dbConnection()
    console.log(`Server is running on port ${PORT}`)})

