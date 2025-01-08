"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../app/languageProvider";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const Header = () => {
    const { language, handleLanguageChange } = useLanguage();
    const { isAuth, setIsAuth } = useAuth(); // Use the global auth state
    const router = useRouter();

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/user/logout`,
                {},
                {
                    withCredentials: true,
                },
            );
            setIsAuth(false);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Link href="/">
                        {/* Logo and App Name */}
                        <div className="flex items-center">
                            <Image
                                src="/logo.svg"
                                alt="Logo"
                                width={120}
                                height={40}
                                className="h-8 w-auto md:h-10" // Ajuste o tamanho do logo para telas pequenas
                            />
                            <h1 className="font-rounded-elegance text-secondary text-xl ml-2 md:text-2xl">
                                LangAImage
                            </h1>
                        </div>
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    <nav className="flex space-x-6">
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-secondary font-medium"
                        >
                            {language === "en" ? "Contact" : "Contato"}
                        </Link>

                        {/* Conditionally render Login/Sign Up or Logout */}
                        {!isAuth ? (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-secondary font-medium"
                                >
                                    {language === "en" ? "Sign in" : "Entrar"}
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-gray-700 hover:text-secondary font-medium"
                                >
                                    {language === "en" ? "Sign up" : "Cadastre-se"}
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-secondary font-medium"
                            >
                                {language === "en" ? "Logout" : "Sair"}
                            </button>
                        )}
                    </nav>

                    <div className="ml-4">
                        <select
                            id="language"
                            value={language}
                            onChange={handleLanguageChange}
                            className="py-2 px-2 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
                        >
                            <option value="en">EN</option>
                            <option value="pt">PT</option>
                        </select>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;