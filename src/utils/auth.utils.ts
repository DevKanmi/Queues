import bcrypt from 'bcrypt';

export const hashPassword = async(password: string): Promise<String> =>{
    const saltRounds = 10
    return await bcrypt.hash(password, saltRounds)
}

export const verifyPassword = async(pass1: string, pass2: string) =>{
    return await bcrypt.compare(pass1, pass2)

}