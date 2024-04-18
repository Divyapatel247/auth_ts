import z from "zod";


const signupBody = z.object({
    username:z.string(),
    password:z.string(),
    email:z.string().email(),
    firstName:z.string(),
    lastName:z.string()
})
type SignupType = z.infer<typeof signupBody>;
export { SignupType, signupBody };

const signinBody = z.object({
    email:z.string().email(),
    password:z.string()
})
type SigninType = z.infer<typeof signinBody>
export {SigninType,signinBody}