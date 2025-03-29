
export function Button({label , onClick}){
      return <div className="flex justify-center">
       <button onClick={onClick} type="button   " className="bg-black text-slate-50 rounded-md m-2 w-full p-2 ">
            {label}
      </button>
      </div>
}