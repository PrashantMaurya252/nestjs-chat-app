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
  title: string;
  fields: Field[];
  buttonText: string;
  footerText: string;
  footerLinkText: string;
  footerLinkPath: string;
  apiEndPoints:string;
}

const AuthForm: React.FC<AuthFormProps> = ({
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">{title}</h2>

        <form className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            {buttonText}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {footerText}{" "}
          <button
            type="button"
            onClick={() => router.push(footerLinkPath)}
            className="text-blue-600 hover:underline"
          >
            {footerLinkText}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
