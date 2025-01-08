"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../app/languageProvider";

const Header = () => {
    const { language, handleLanguageChange } = useLanguage();

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="Logo"
                            width={120}
                            height={40}
                            className="h-10 w-auto"
                        />
                        <h1 className="font-rounded-elegance text-secondary text-2xl ml-2">
                            LangAImage
                        </h1>
                    </Link>
                </div>

                <div className="flex items-center space-x-6">
                    <nav className="flex space-x-6">
                        <Link href="/contact" className="text-gray-700 hover:text-secondary font-medium">
                            {language === "en" ? "Contact" : "Contato"}
                        </Link>
                        <Link href="/login" className="text-gray-700 hover:text-secondary font-medium">
                            {language === "en" ? "Login" : "Entrar"}
                        </Link>
                        <Link href="/signup" className="text-gray-700 hover:text-secondary font-medium">
                            {language === "en" ? "Sign Up" : "Cadastre-se"}
                        </Link>
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