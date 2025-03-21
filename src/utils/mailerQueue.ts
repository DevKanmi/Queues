import emailQueue from "../configs/db";

export const queueMail = async (email: string, title: string, content: string) => {
  await emailQueue.add("sendEmail", { email, title, content });
};