import express, {Request, Response, NextFunction }from 'express'
import cors from 'cors'

import { User } from "./models/user.model"
import { hashPassword } from "./utils/auth.utils"
import { sendMail } from "./utils/mailer"
import { queueMail } from "./utils/mailerQueue"

export const app = express()



app.use(express.json())

app.use(cors())

app.get('/', (req: Request, res: Response)=>{
        res.status(200).send("welcome back")
        })

// app.post('/register', async(req: Request, res: Response, next: NextFunction) => {
//     const { email, password } = req.body
//     if(!email || !password){
//         res.status(400).json({
//             success: false,
//             message: `Fields are required`
//             })
//         }
//     try{
//         const user = await User.findOne({email: email})
//         if(user){
//             res.status(400).json({
//                 success: false,
//                 message: `User already exists`
//                 })
//         }
//
//         const hashedPassword = await hashPassword(password)
//
//         const newUser = await User.create({
//             email: email,
//             password: hashedPassword
//             })
//
//         //Send Mail Notification in the Main thread
//          await sendMail(newUser.email, `Welcome`, `Thank you for taking this bold step to join us!`)
//
//         res.status(201).json({
//             success: true,
//             message: `New User successfully Created`,
//             data: newUser
//             })
//     }
//
//     catch(error: any){
//         res.status(500).json({
//             success: false,
//             message: `Something went wrong`
//             })
//         }
//     })

app.post('/register', async(req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    if(!email || !password){
        res.status(400).json({
            success: false,
            message: `Fields are required`
            })
        }
    try{
        const user = await User.findOne({email: email})
        if(user){
            res.status(400).json({
                success: false,
                message: `User already exists`
                })
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({
            email: email,
            password: hashedPassword
            })

        //Send Mail Notification in the Background thread
         await queueMail(
             newUser.email,
             "Welcome",
             "Thank you for Joining us!"
             )

        res.status(201).json({
            success: true,
            message: `New User successfully Created, you should receive a welcome mail from us shortly :)`,
            data: newUser
            })
    }

    catch(error: any){
        res.status(500).json({
            success: false,
            message: `Something went wrong`
            })
        }
    })

app.use('**', (req: Request, res: Response)=> {
       res.status(404).json({
       success: false,
       message: 'Route does not exist'})
       })
