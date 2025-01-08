# **LangAImage Frontend**

**LangAImage Frontend** is the user interface for the LangAImage application, a platform that allows users to upload images, extract text using OCR, translate it into multiple languages, summarize content, and improve text quality. This frontend is built with **React**, **Vite**, and **TypeScript**, and styled using **Tailwind CSS** for a modern and responsive user experience.

---

## **Features**

1. **Image Upload:**
   - Users can upload images to extract text using OCR.

2. **Text Extraction:**
   - Displays extracted text from the uploaded image.

3. **Text Translation:**
   - Translates extracted text into multiple languages using AI.

4. **Text Summarization:**
   - Summarizes long texts into concise and meaningful summaries.

5. **Text Quality Improvement:**
   - Enhances the quality of extracted text using AI.

6. **Multi-Language Support:**
   - Supports multiple languages for the user interface and text processing.

7. **Responsive Design:**
   - Works seamlessly on desktop, tablet, and mobile devices.

---

## **Technologies Used**

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (`useState`, `useContext`)
- **Routing:** Next.js (or React Router, depending on your setup)
- **Icons:** `react-icons`
- **API Integration:** Axios for communicating with the backend.

---

## **Getting Started**

### **Prerequisites**

Before running the frontend, ensure you have the following installed:

- Node.js (v16 or higher)
- npm (v7 or higher) or yarn

---

### **Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/HugoNicolau/langaimage.git
   cd langaimage-frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Environment Variables:**
   - Create a `.env` file in the root directory and add the following:
     ```env
     VITE_API_URL=http://localhost:5000 # Replace with your backend API URL
     ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## **Project Structure**

```
langaimage-frontend/
├── public/               # Static assets (e.g., images, fonts)
├── src/                  # Source code
│   ├── components/       # Reusable components (e.g., Header, Footer)
│   ├── pages/            # Application pages (e.g., Home, Contact, Login)
│   ├── styles/           # Global styles and Tailwind configuration
│   ├── types/            # TypeScript types and interfaces
│   ├── utils/            # Utility functions (e.g., API calls)
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Entry point
├── .env.example          # Example environment variables
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

---

## **Usage**

1. **Upload an Image:**
   - Click the "Upload Image" button and select an image file.

2. **Extract Text:**
   - The application will automatically extract text from the image using OCR (handled by the backend).

3. **Translate Text:**
   - Select the target language and click "Translate" to translate the extracted text.

4. **Summarize Text:**
   - Click "Summarize" to generate a concise summary of the extracted text.

5. **Improve Text Quality:**
   - Click "Improve Text" to enhance the quality of the extracted text using AI.

---

## **Deployment**

### **Build the Project**
To build the project for production, run:
```bash
npm run build
# or
yarn build
```

### **Deploy to Vercel or Netlify**
1. Install the Vercel CLI (if deploying to Vercel):
   ```bash
   npm install -g vercel
   ```

2. Deploy the project:
   ```bash
   vercel deploy
   ```

   Or, for Netlify:
   ```bash
   netlify deploy --prod
   ```

---

## **Contributing**

We welcome contributions! If you'd like to contribute to the LangAImage Frontend, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your branch.
4. Submit a pull request with a detailed description of your changes.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Acknowledgments**

- **Backend Team:** For providing the API for OCR, translation, summarization, and text improvement.
- **Tailwind CSS:** For simplifying the styling process.
- **React Icons:** For providing beautiful icons for the UI.

---

## **Contact**

For questions, feedback, or support, please contact:

- **Hugo Nicolau**
- **Email:** nicolau.hugogiles@example.com
- **GitHub:** [Hugo Nicolau](https://github.com/HugoNicolau)
- **LinkedIn:** [Hugo Nicolau](https://www.linkedin.com/in/hugo-nicolau)

---

Thank you for using **LangAImage Frontend**! We hope it provides a seamless and enjoyable experience for your text processing needs. 🚀

---
