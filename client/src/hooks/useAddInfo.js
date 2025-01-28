import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "../Firebase/firebase.js";
import { getUserInfo } from "./getUserInfo.js";
import CryptoJS from "crypto-js";   


export const useAddInfo = () => {

    const userRef=collection(db, "users");
    const {userId} = getUserInfo();

    const addUser=async({
        name,
        email,
        role,
        password,
        idCardUrl,
        userId,
        branch
    })=>{
        const hashedPassword = CryptoJS.SHA256(password).toString();
        const hashedIdURL = CryptoJS.SHA256(idCardUrl).toString();
        
        await addDoc(userRef, {
            name,
            email,
            role,
            hashedPassword,
            branch,
            userId,
            hashedIdURL,
            timestamp: serverTimestamp()
        });

    }

    return{addUser}
}