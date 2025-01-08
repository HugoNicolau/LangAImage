"use client";

import '../styles/globals.css';
import axios from "axios";
import { useState } from "react";
import { TextExtractionResult } from "../types";
import { useLanguage } from "./languageProvider";

const App: React.FC = () => {
  const { language } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState<string>(''); // New state for image title
  const [extractedText, setExtractedText] = useState<TextExtractionResult>({
    originalExtraction: '',
    improvedExtraction: '',
    translatedText: '',
    summarizedText: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [translate, setTranslate] = useState<string>('no');
  const [targetLanguage, setTargetLanguage] = useState<string>('en');
  const [improveExtraction, setImproveExtraction] = useState<string>('no');
  const [summarizeText, setSummarizeText] = useState<string>('no');

  const translations: { [K in Extract<keyof TextExtractionResult, string>]: string } = {
    originalExtraction: 'Extração Original',
    improvedExtraction: 'Extração Melhorada',
    translatedText: 'Texto Traduzido',
    summarizedText: 'Texto Resumido',
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleImageTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageTitle(event.target.value); // Update image title
  };

  const handleTranslateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTranslate(event.target.value);
  };

  const handleTargetLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetLanguage(event.target.value);
  };

  const handleImproveExtractionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setImproveExtraction(event.target.value);
  };

  const handleSummarizeTextChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSummarizeText(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      alert(language === 'en' ? 'Please select an image file.' : 'Por favor, selecione um arquivo de imagem.');
      return;
    }

    if (!imageTitle) {
      alert(language === 'en' ? 'Please provide a title for the image.' : 'Por favor, forneça um título para a imagem.');
      return;
    }

    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', imageTitle); // Add image title to form data

    if (improveExtraction.toLowerCase() === 'yes') {
      formData.append('improveExtraction', improveExtraction);
    }
    if (translate.toLowerCase() === 'yes') {
      formData.append('targetLanguage', targetLanguage);
    }
    if (summarizeText.toLowerCase() === 'yes') {
      formData.append('summarizeText', summarizeText);
    }

    try {
      const response = await axios.post(
        
        `${process.env.NEXT_PUBLIC_API_URL}/ocr/extract`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      );
      setExtractedText(response.data as TextExtractionResult);
    } catch (error) {
      console.log(error);
      setError(language === 'en' ? 'Failed to extract text. Please try again later.' : 'Falha ao extrair o texto. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  interface TextItem {
    key: Extract<keyof TextExtractionResult, string>;
    content: string;
  }

  const getNonEmptyTexts = (): TextItem[] => {
    return Object.entries(extractedText)
      .filter(([, value]) => value !== '')
      .map(([key, content]) => ({ key: key as keyof TextExtractionResult, content }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center mb-4 text-2xl font-extrabold text-gray-700">
        {language === 'en' ? 'Transform Your Image into Text' : 'Transforme Sua Imagem em Texto'}
      </h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
            {language === 'en' ? 'Select an image file' : 'Selecione um arquivo de imagem'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="imageTitle" className="block text-gray-700 text-sm font-bold mb-2">
            {language === 'en' ? 'Image Title' : 'Título da Imagem'}
          </label>
          <input
            type="text"
            id="imageTitle"
            value={imageTitle}
            onChange={handleImageTitleChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
            placeholder={language === 'en' ? 'Enter a title for the image' : 'Digite um título para a imagem'}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="translate" className="block text-gray-700 text-sm font-bold mb-2">
            {language === 'en' ? 'Do you want to translate with AI?' : 'Você quer traduzir usando IA?'}
          </label>
          <select
            id="translate"
            value={translate}
            onChange={handleTranslateChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
          >
            <option value="no">{language === 'en' ? 'No' : 'Não'}</option>
            <option value="yes">{language === 'en' ? 'Yes' : 'Sim'}</option>
          </select>
        </div>
        {translate === 'yes' && (
          <div className="mb-3">
            <label htmlFor="targetLanguage" className="block text-gray-700 text-sm font-bold mb-2">
              {language === 'en' ? 'Select target language' : 'Selecione o idioma de destino'}
            </label>
            <select
              id="targetLanguage"
              value={targetLanguage}
              onChange={handleTargetLanguageChange}
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="it">Italiano</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
              <option value="ja">日本語</option>
            </select>
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="improveExtraction" className="block text-gray-700 text-sm font-bold mb-2">
            {language === 'en' ? 'Do you want to improve the text extraction with AI?' : 'Você quer melhorar a extração do texto com IA?'}
          </label>
          <select
            id="improveExtraction"
            value={improveExtraction}
            onChange={handleImproveExtractionChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
          >
            <option value="no">{language === 'en' ? 'No' : 'Não'}</option>
            <option value="yes">{language === 'en' ? 'Yes' : 'Sim'}</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="summarizeText" className="block text-gray-700 text-sm font-bold mb-2">
            {language === 'en' ? 'Do you want to summarize the text with AI?' : 'Você quer resumir o texto usando IA?'}
          </label>
          <select
            id="summarizeText"
            value={summarizeText}
            onChange={handleSummarizeTextChange}
            className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-secondary text-gray-700"
          >
            <option value="no">{language === 'en' ? 'No' : 'Não'}</option>
            <option value="yes">{language === 'en' ? 'Yes' : 'Sim'}</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-semibold ${isLoading ? 'bg-gray-400' : 'bg-secondary'}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              {language === 'en' ? 'Extracting...' : 'Extraindo...'}
            </div>
          ) : (
            language === 'en' ? 'Extract text' : 'Extrair texto'
          )}
        </button>
      </form>
      {error && (
        <div className="p-4 mb-4 bg-red-100 rounded-lg text-red-700">
          {error}
        </div>
      )}
      {getNonEmptyTexts().length > 0 && (
        <div className="mt-4">
          {getNonEmptyTexts().map(item => (
            <div key={item.key} className="mb-4">
              <h2 className="text-xl font-bold mb-2 text-gray-700">
                {language === 'en'
                  ? (item.key as string).replace(/([A-Z])/g, ' $1').trim()
                  : translations[item.key]}
              </h2>
              <pre className="p-4 bg-gray-100 rounded-lg text-gray-700 whitespace-pre-wrap break-words max-w-full">{item.content}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;