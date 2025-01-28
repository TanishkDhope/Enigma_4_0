import { collection } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const useDisplayUsers = () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    getUsers();
  }, []);

  const userRef = collection(db, "users");

  const getUsers = async () => {
    try {
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }



  }
}