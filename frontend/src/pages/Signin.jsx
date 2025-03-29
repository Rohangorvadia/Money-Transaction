import axios from "axios"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Signin = () => {

      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      return <div className="bg-slate-400 flex flex-col justify-center h-screen">
      <div className="flex justify-center">     
      <div className="bg-white w-90 content-center p-6 rounded-lg">
            <Heading label={"Sign in"}> </Heading>
            <SubHeading label={"Enter your credentials to access your account"}/>
            <InputBox onChange={e => {
                  setUserName(e.target.value)}}
             label={"Email"} placeholder={"Jimhalpert@gmail.com"}/>
            <InputBox onChange={e =>{
                  setPassword(e.target.value)
            }} label={"Password"} placeholder={"dwight@123"}/>
            <div className="pt-3">
                  
            <Button onClick={async() =>{
                        try{
                              const response = await axios.post("http://localhost:3000/api/v1/user/signin" ,{
                                    userName,
                                    password
                              });
                              console.log(response.data.token)
                              localStorage.removeItem("token")
                              localStorage.setItem("token",response.data.token)
                              navigate("/Dashboard")
                        }catch(error){
                              if(error.response && error.response.status === 400){
                                    alert("Invalid input")
                              }else{
                                    alert("Something want wrong. Please try again.")
                              }
                        }
                  }} label={"Sign up"} />
            </div>
            <BottomWarning label={"Don't have an account? "} buttonText={" Sign up"} to={"/signup"}/>
      </div>
      </div>
      </div>
}