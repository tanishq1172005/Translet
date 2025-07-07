import React, { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');
  const [targetLang, setTargetLang] = useState('es'); // Default: Spanish

  const handleTranslate = async () => {
    try {
      const response = await axios.post(
        'https://deep-translate1.p.rapidapi.com/language/translate/v2',
        {
          q: text,
          source: 'en',
          target: targetLang
        },
        {
          headers: {
            'content-type': 'application/json',
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': 'deep-translate1.p.rapidapi.com'
          }
        }
      );

      const result = response.data.data.translations.translatedText;
      setTranslated(result);
    } catch (error) {
      console.error('Translation failed:', error);
      setTranslated('Error translating...');
    }
  };

  return (
    <>
      <nav className='flex text-white w-screen h-15
      text-xl justify-center items-center'>
        <p>Translet</p>
      </nav>
      <main className='flex flex-col gap-10 text-white h-[70vh] w-screen items-center justify-center'>
        <h1 className='sm:text-2xl md:text-3xl xl:text-4xl'>Translate Your Text</h1>
        <p className='sm:text-xl md:text-2xl lg:text-3xl'>{translated}</p>
      </main>
      <footer className='flex gap-3 text-white h-[20vh]
       justify-center items-center'>
        <select className='p-2 border-2 rounded-3xl bg-black'
         value={targetLang} onChange={(e)=>{setTargetLang(e.target.value)}}>
            <option value="es">Spanish</option>
            <option value="hi">Hindi</option>
            <option value="ja">Japanese</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="ar">Arabic</option>
        </select>
        <input className='border-2 w-[70vw] rounded-3xl p-2 text-left'
        type="text" placeholder='Write text'
        value={text} onChange={(e)=>{setText(e.target.value)}} />
        <button className='border-2 rounded-3xl p-2 w-30'
        onClick={handleTranslate}>Send</button>
      </footer>
    </>
  );
}