import { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export function Users() {
  const [users, setUsers] = useState([]);
  const [filter, setfilter] = useState("");
  useEffect(()=>{
    return async ()=>{
     const res = await axios.get("http://localhost:3000/api/v1/users/bulk?filter="+filter);
     const res1 = await axios.get("http://localhost:3000/api/v1/users/name",{
       headers:{
           Authorization:"Bearer "+localStorage.getItem("token")
       }
   })
     const filteredUsers = res.data.user.filter(user => user._id != res1.data.userId);
     console.log(res);
     setUsers(filteredUsers);

     // console(users);
   }
 },[filter])
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          onChange={(e)=>{
            console.log(e.target.value);
            setfilter(e.target.value);
            console.log(filter);
          }}
        ></input>
      </div>
      <div>
        {users.map(user => (
          <User user={user} />
        ))}
      </div>
    </>
  );
}
function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
        <Button label={"Send Money"} onClick={()=>{
            navigate("/send?id="+user._id+"&name="+user.firstName);
        }}/>
        </div>
    </div>
}
