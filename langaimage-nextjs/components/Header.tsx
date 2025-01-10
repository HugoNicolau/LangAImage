"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../app/languageProvider";
import { useRouter } from "next/navigation";
import axios from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { useState } from "react";

const Header = () => {
    const { language, handleLanguageChange } = useLanguage();
    const router = useRouter();
    const cookies = parseCookies();
    const isLoggedIn = !!cookies.authToken;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Handle logout
    const handleLogout = async () => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                {},
                {
                    withCredentials: true,
                },
            );
            destroyCookie(null, 'authToken', { path: '/' });
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="bg-white shadow-md relative">
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

                {/* Hamburger Button */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden p-2 text-gray-600 hover:text-secondary"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>

                {/* Navigation Menu */}
                <div
                    className={`${
                        isMenuOpen ? 'flex' : 'hidden'
                    } md:flex absolute md:relative top-full left-0 right-0 bg-white md:bg-transparent flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0 shadow-lg md:shadow-none z-50`}
                >
                    <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center w-full md:w-auto">
                        <Link
                            href="/contact"
                            className="text-gray-700 hover:text-secondary font-medium w-full md:w-auto text-center"
                        >
                            {language === "en" ? "Contact" : "Contato"}
                        </Link>

                        {/* Conditionally render Login/Sign Up or Logout */}
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-secondary font-medium w-full md:w-auto text-center"
                            >
                                {language === "en" ? "Logout" : "Sair"}
                            </button>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 hover:text-secondary font-medium w-full md:w-auto text-center">
                                    {language === "en" ? "Sign in" : "Entrar"}
                                </Link>
                                <Link href="/signup" className="text-gray-700 hover:text-secondary font-medium w-full md:w-auto text-center">
                                    {language === "en" ? "Sign up" : "Cadastre-se"}
                                </Link>
                            </>
                        )}
                    </nav>

                    <select
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                        className="border border-gray-300 rounded-md p-1 text-sm w-full md:w-auto text-gray-700"
                    >
                        <option value="en">EN</option>
                        <option value="pt">PT</option>
                    </select>
                </div>
            </div>
        </header>
    );
};

export default Header;