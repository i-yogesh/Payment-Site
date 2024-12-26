import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBar } from "../components/InputBar"
import { SubHeading } from "../components/SubHeading"
import axios from "axios";
import { useNavigate } from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate();
  const [firstname,setFirstname] = useState("");
  const [lastname,setlastname] = useState("");
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
        <Heading heading={"Sign up"} />
        <SubHeading subheading={"Enter your infromation to create an account"} />
        <InputBar onChange={(e)=>{
          setFirstname(e.target.value)
        }} placeholder="Ashish" label={"First Name"} />
        <InputBar onChange={(e)=>{
          setlastname(e.target.value)
        }} placeholder="joshi" label={"Last Name"} />
        <InputBar onChange={(e)=>{
          setusername(e.target.value)
        }} placeholder="example@gmail.com" label={"Email"} />
        <InputBar onChange={(e)=>{
          setPass(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async()=>{
           const res = await axios.post("http://localhost:3000/api/v1/users/signup",{
              username:Username,
              password:pass,
              firstName:firstname,
              lastName:lastname
            });
            localStorage.setItem("token",res.data.token);
            navigate("/dashboard");
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}