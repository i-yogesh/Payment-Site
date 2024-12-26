import {Balance} from "../components/Balance"
import AppBar from "../components/AppBar"
import axios from "axios"
import {Users} from "../components/Users"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
export default function DashBoard(){
    const navigate = useNavigate();
    const [balance,setBalance] = useState(0);
    const [name,setName] = useState("");
    const [Id,setId] = useState(0);
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        if (!userToken) {
          navigate("/signup"); 
        }
        else{
            const fetchBalance = async () => {
                try {
                  const res = await axios.get("http://localhost:3000/api/v1/account/Balance", {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  });
                  setBalance(res.data.Balance);
                  setId(res.data.userId);
                } catch (error) {
                  console.error("Error fetching balance:", error);
                }
              };
              fetchBalance();
              const fetchName = async()=>{
                const res = await axios.get("http://localhost:3000/api/v1/users/name",{
                    headers:{
                        Authorization:"Bearer "+localStorage.getItem("token")
                    }
                })
                setName(res.data.name);
                console.log(name)
              }
              fetchName();
        }
      }, []);
    return (
        <div>
            <AppBar value={name}/>
            <Balance value={balance}/>
            <Users />
        </div>
    )
}