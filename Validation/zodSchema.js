import {z} from 'zod';

export const zodValSchema = z.object({
    name: z.string().min(1,{
        message: "Enter a valid name"
    }),
    email: z.string().email({
        message: "Enter a valid mail id"
    }),
    contact: z.string().regex(/^\d{10}$/,{
        message: "Enter a valid 10 digit number"
    }),
    age: z.coerce.number().min(18,{
        message: "Invalid age criteria"
    }),
    password: z.string().min(8,{
        message: "Enter a valid password"
    })
});
