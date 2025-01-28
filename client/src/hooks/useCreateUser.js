import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase/firebase.js"

export const useCreateUser = ({email}) => {
    const createUser = async () => {
        try {
            console.log(email)
            console.log("Hello")
            // await createUserWithEmailAndPassword(auth, email, password)

        } catch (error) {
            console.log(error)
        }
    }
    
    return { createUser}
}