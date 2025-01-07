"use client";

import { useLanguage } from '../languageProvider';

const ContactPage = () => {
  const { language } = useLanguage(); 

  return (
    <>
      <div className="container mx-auto p-4 text-gray-700">
        <h1 className="text-2xl font-bold mb-4">
          {language === 'en' ? 'Contact Us' : 'Contato'}
        </h1>
        <p>{language === 'en' ? 'This is the contact page.' : 'Esta é a página de contato.'}</p>
      </div>
    </>
  );
};

export default ContactPage;