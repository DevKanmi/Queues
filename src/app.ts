import express, {Request, Response }from 'express'
import cors from 'cors'

import { User } from "./models/user.model"

export const app = express()


app.use(express.json())

app.use(cors())

app.get('/', (req: Request, res: Response)=>{
        res.status(200).send("welcome back")
        })

app.get('/register', async(req: Request, res: Response) => {
    const { email, password }: any = req.body
    })

app.use('**', (req: Request, res: Response)=> {
       res.status(404).json({
       success: false,
       message: 'Route does not exist'})
       })
