import {createContext,useState,useEffect} from "react"

export const UserContext=createContext();

const UserProvider=({children})=>{
    const [user,setUser]=useState(null);

    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


    const updateUser=(userData)=>{
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };

    const clearUser=()=>{
        setUser(null)
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

     return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearUser
        }}
        >
            {children}
        </UserContext.Provider>
     )
}

export default UserProvider 