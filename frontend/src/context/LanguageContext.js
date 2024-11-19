import {createContext,useState} from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({children})=>{
    const [language,setLanguage] = useState("ar");

    const toggleLanguage = ()=>{
        setLanguage(language === "ar" ? "en" : "ar");
    };

    return (
        <LanguageContext.Provider value={{language,toggleLanguage}}>
            {children}
        </LanguageContext.Provider>
    );
};