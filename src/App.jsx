import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [targetLang, setTargetLang] = useState("es");

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        {
          q: inputText,
          source: "en",
          target: targetLang,
        },
        {
          headers: {
            "content-type": "application/json",
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
          },
        }
      );
      const result = response.data.data.translations.translatedText;
      setTranslatedText(result);
    } catch (error) {
      console.error("Translation failed:", error);
      setTranslatedText("Error Translating");
    }
  };

  return (
    <>
      <nav className="flex h-15 w-screen items-center justify-center bg-gray-800 text-white md:justify-start">
        <p className="xxl:text-xl p-2 sm:text-xl lg:text-xl xl-text-xl">
          Translet
        </p>
      </nav>
      <main className="flex h-[70vh] flex-col gap-10 pt-[10vh] bg-gray-900 text-white">
        <h1 className="bg-gradient-to-b from-blue-500 to-red-500 bg-clip-text text-transparent text-center sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Translate Your Text
        </h1>
        <p className="sm:text-sm lg:text-xl xl:text-xl xxl:text-2xl self-start ml-[10vw] text-gray-300">
          {translatedText}</p>
      </main>
      <footer className="flex justify-center space-x-3 mt-[12vh] bg-gray-900 ">
        <select value={targetLang} onChange={(e)=>{setTargetLang(e.target.value)}} className="rounded-3xl cursor-pointer bg-gray-300 pt-0 pb-0 pr-2 pl-2 text-center text-black">
          <option value="es">Spanish</option>
          <option value="hi">Hindi</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="ar">Arabic</option>
        </select>
        <input
          type="text"
          value={inputText}
          onChange={(e)=>{setInputText(e.target.value)}}
          placeholder="Send message"
          className="rounded-2xl border-2 p-3 text-white border-white w-[70vw]"
        />
        <button onClick={handleTranslate} className="rounded-4xl cursor-pointer  border-2 bg-gray-300 p-3 text-black">
          Translate
        </button>
      </footer>
    </>
  );
}
