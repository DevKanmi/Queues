import { Worker } from "bullmq"
import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  debug: true,
  logger: true,
});

const emailWorker = new Worker(
    "emailQueue",
    async(job) => {
        const { email, title, content} = job.data

        const mailOptions = {
            from: process.env.EMAIL_USER,
                  to: email,
                  subject: title,
                  html: content,
            }
        await transport.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);

        },
    {
        connection: {
              host: process.env.REDIS_HOST,
              port: Number(process.env.REDIS_PORT),
              password: process.env.REDIS_PASSWORD
              }
        }

)

console.log("Worker started, listening for jobs...");