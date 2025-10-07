"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
}

interface AuthFormProps {
  type:string,
  title: string;
  fields: Field[];
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkPath: string;
  apiEndPoints:string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  title,
  fields,
  buttonText,
  footerText,
  footerLinkText,
  footerLinkPath,
  apiEndPoints
}) => {
  const router = useRouter();
  const [formValues,setFormValues] = useState<Record<string,string>>({})
  const [loading,setLoading] = useState<boolean>(false)
  const [errors,setErrors] = useState<Record<string,string>>({})
  const [message,setMessage] = useState<string>("")

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name,value} = e.target
    setFormValues((prev)=>({...prev,[name]:value}))
    setErrors((prev)=>({...prev,[name]:""}))
  }

  const handleSubmit =async(e:React.FormEvent)=>{
    e.preventDefault()
    const newErrors: Record<string,string>={}

    fields.forEach((f)=>{
      if(!formValues[f.name])  newErrors[f.name]=`field ${f.label} is required`
    })
    setErrors(newErrors)
    if(Object.keys(newErrors).length>0) return
    setLoading(true)
    setMessage("")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${apiEndPoints}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formValues),
        credentials:"include"
      });
      const data = await response.json()

      if(!response.ok){
        setMessage(data.message || "Something went wrong")
      }else{
        if(type === "login"){
          router.push("/messages")
        }else{
          router.push("/login")
        }
        
      }
    } catch (error:any) {
      setMessage(error.message || "Server Error")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">{title}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formValues[field.name] || ""}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all disabled:bg-blue-300"
          >
            {loading ? "Please wait..." : buttonText}
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-3 text-gray-700">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-4">
          {footerText}{" "}
          <a href={footerLinkPath} className="text-blue-600 hover:underline">
            {footerLinkText}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
