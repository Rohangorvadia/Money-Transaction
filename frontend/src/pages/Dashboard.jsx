import axios from "axios"
import { Appbar } from "../components/AppBar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
import { useEffect, useState } from "react"
import { Button } from "../components/Button"

export const Dashboard = () => {

    const [balance,setBalance] = useState(0);

    return <div>
        <Appbar />
        <div className="m-8">
            <div className="flex flex-col">
                <div>
                    <Button onClick={async()=>{
        
        const token = localStorage.getItem("token")
        const cleanToken = token.replace(/"/g, '');
        
        console.log('clean token of dashboard')
        console.log(cleanToken)
        
        try{
            await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization: `Bearer ${cleanToken}`,
                },
            })
            .then(response =>{
                setBalance(response.data.balance);
            })
        }catch(error){
            console.log(error)
        }
    }} label={"Get balance"}></Button>
                </div>
            </div>
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}