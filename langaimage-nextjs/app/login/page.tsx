"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/app/languageProvider";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const { setIsAuth } = useAuth(); // Use the global auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError(
        language === "en"
          ? "Please fill in all fields."
          : "Por favor, preencha todos os campos.",
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signin`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Include cookies in the request
        },
      );

      if (response.status === 200 || response.status === 201) {
        // Update global auth state first
        setIsAuth(true);

        // Wait a bit for the auth state to update
        setTimeout(() => {
          router.push("/");
        }, 100);
      } else {
        setError(
          language === "en"
            ? "Invalid email or password."
            : "E-mail ou senha inválidos.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        language === "en"
          ? "An error occurred. Please try again later."
          : "Ocorreu um erro. Por favor, tente novamente mais tarde.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {language === "en" ? "Login" : "Entrar"}
        </h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {language === "en" ? "Email" : "E-mail"}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {language === "en" ? "Password" : "Senha"}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark focus:outline-none disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {language === "en" ? "Logging in..." : "Entrando..."}
              </span>
            ) : (
              language === "en" ? "Login" : "Entrar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}