import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"


export const Signup = () => {

      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [userName, setUserName] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate()

      return <div className="bg-slate-400 flex justify-center h-screen"> 
            <div className="flex flex-col justify-center ">
                  <div className="rounded-lg bg-white w-90 h-auto items-center mx-20 px-10 pb-4">
                        <Heading label={"Sign up"} className=""/>
                        <SubHeading label={"Enter your information to create your account"}/>
                        <InputBox onChange={e => {
                              setFirstName(e.target.value)}}
                               label={"First Name"} placeholder={"Jim"}/>
                        <InputBox onChange={e => {
                              setLastName(e.target.value)}} 
                        label={"Last Name"} placeholder={"Halpert"}/>
                        <InputBox onChange={e => {
                              setUserName(e.target.value)
                        }} label={"Email"} placeholder={"Jimhalpert@gmail.com"}/>
                        <InputBox onChange={e => {
                              setPassword(e.target.value)
                        }} label={"Password"} placeholder={"dwight@123"}/>
                        <div className="pt-3">
                              <Button onClick={async() =>{
                                    try{
                                          const response = await axios.post("http://localhost:3000/api/v1/user/signup" ,{
                                                userName,
                                                firstName,
                                                lastName,
                                                password
                                          });
                                          console.log(response)
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
                        <BottomWarning label={"Already have an account? "} buttonText={" Sign in"} to={"/signin"}/>
                  </div>
            </div>
      </div>
}