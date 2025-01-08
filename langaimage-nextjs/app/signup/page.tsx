"use client"; // Mark this as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/app/languageProvider"; 

export default function SignupPage() {
  const { language } = useLanguage(); 
  const router = useRouter(); 
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [error, setError] = useState(""); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      router.push("/");
    } else {
      setError(language === "en" ? "Please fill in all fields." : "Por favor, preencha todos os campos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {language === "en" ? "Sign Up" : "Cadastre-se"}
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {language === "en" ? "Email" : "E-mail"}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {language === "en" ? "Password" : "Senha"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark focus:outline-none"
          >
            {language === "en" ? "Sign Up" : "Cadastre-se"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {language === "en" ? "Already have an account? " : "Já tem uma conta? "}
          <Link href="/login" className="text-secondary hover:underline">
            {language === "en" ? "Login" : "Entrar"}
          </Link>
        </p>
      </div>
    </div>
  );
}