import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBar } from "../components/InputBar"
import { SubHeading } from "../components/SubHeading"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Signin() {
  const navigate = useNavigate();
  const [Username,setusername] = useState("");
  const [pass,setPass] = useState("");
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      navigate("/dashboard"); 
    }
  }, []);
    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading heading={"Sign in"} />
        <SubHeading subheading={"Enter your infromation to access your account"} />
        <InputBar onChange={(e)=>{
          setusername(e.target.value);
        }} placeholder="example@gmail.com" label={"Email"} />
        <InputBar onChange={(e)=>{
          setPass(e.target.value);
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
            const res = await axios.post("http://localhost:3000/api/v1/users/signin",{
              username:Username,
              password:pass
            });
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
          }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Create an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}