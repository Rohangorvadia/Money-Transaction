import { useNavigate } from "react-router-dom"

export const HomePage = ()=> {

      const navigate = useNavigate();

      return <div className="bg-slate-400 flex flex-col justify-center h-screen">
            <div className="flex justify-center">     
                  <div className="bg-white w-90 content-center p-6 rounded-lg">
                        <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-black text-white mb-5" onClick={async()=>{
                              navigate("/signup")
                              }
                        } >Sign up</button>
                        <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-black text-white" onClick={async()=>{
                              navigate("/signin")
                              }
                        }>Sign in</button>
                  </div>
            </div>
      </div>
}