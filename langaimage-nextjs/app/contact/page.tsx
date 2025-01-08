"use client"; 

import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa"; 
import { useLanguage } from "@/app/languageProvider"; 
export default function ContactPage() {
  const { language } = useLanguage(); 

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          {language === "en" ? "Contact Me" : "Entre em Contato"}
        </h1>
        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaLinkedin className="text-4xl text-[#0077B5]" />
            <div>
              <h2 className="text-xl font-semibold">LinkedIn</h2>
              <a
                href="https://www.linkedin.com/in/hugo-nicolau/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-secondary transition-colors"
              >
                {language === "en" ? "Connect with me on LinkedIn" : "Conecte-se comigo no LinkedIn"}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaGithub className="text-4xl text-gray-800" />
            <div>
              <h2 className="text-xl font-semibold">GitHub</h2>
              <a
                href="https://github.com/HugoNicolau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-secondary transition-colors"
              >
                {language === "en" ? "Check out my projects on GitHub" : "Veja meus projetos no GitHub"}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <FaEnvelope className="text-4xl text-[#D14836]" />
            <div>
              <h2 className="text-xl font-semibold">Gmail</h2>
              <a
                href="mailto:nicolau.hugogiles@gmail.com"
                className="text-gray-600 hover:text-secondary transition-colors"
              >
                {language === "en" ? "Send me an email" : "Envie-me um e-mail"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}