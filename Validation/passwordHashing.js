import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashing = async(password) => {
    try{
        return await bcrypt.hash(password,saltRounds);
    }catch(error) {
        console.error("Hashing failed", error.message);
        throw new error("Password hashing didn't happen!")
    }
}