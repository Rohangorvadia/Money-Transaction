

export function InputBox({label , placeholder ,onChange}){
      return (
            <>
                  <div className="text-sm text-left font-medium py-2">{label}</div>
                  <input onChange={onChange} placeholder={placeholder} className="w-full border-2 px-2 py-1"/>
            </>
      )
}