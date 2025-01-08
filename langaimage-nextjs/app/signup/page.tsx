"use client"; // Mark this as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/app/languageProvider";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { language } = useLanguage(); // Access the language state
  const router = useRouter(); // For navigation
  const { setIsAuth } = useAuth(); // Use the global auth state
  const [username, setUsername] = useState(""); // Username input state
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password input state
  const [error, setError] = useState(""); // Error message state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError(
        language === "en"
          ? "Please fill in all fields."
          : "Por favor, preencha todos os campos.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        language === "en"
          ? "Passwords do not match."
          : "As senhas não coincidem.",
      );
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies in the request
        },
      );

      if (response.status === 201) {
        // Update global auth state
        setIsAuth(true);

        // Redirect to home
        router.push("/");
      } else {
        setError(
          language === "en"
            ? "An error occurred during signup. Please try again."
            : "Ocorreu um erro durante o cadastro. Por favor, tente novamente.",
        );
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);

      if (axios.isAxiosError(error) && error.response && error.response.data.message) {
        // Handle specific backend errors (e.g., duplicate email or username)
        setError(error.response.data.message);
      } else {
        setError(
          language === "en"
            ? "An error occurred. Please try again later."
            : "Ocorreu um erro. Por favor, tente novamente mais tarde.",
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {language === "en" ? "Sign Up" : "Cadastre-se"}
        </h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {language === "en" ? "Username" : "Nome de Usuário"}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
              required
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              {language === "en" ? "Confirm Password" : "Confirme a Senha"}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                {language === "en" ? "Signing up..." : "Cadastrando..."}
              </span>
            ) : (
              language === "en" ? "Sign Up" : "Cadastre-se"
            )}
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