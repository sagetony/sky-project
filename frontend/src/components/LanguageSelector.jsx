import i18next from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'km', label: 'ភាសាខ្មែរ' },
  { code: 'zh_Hant', label: '繁體中文' }, // Traditional Chinese
  { code: 'zh_Hans', label: '简体中文' }, // Simplified Chinese
  { code: 'es', label: 'Español' }, // Spanish
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  return (
    <div className='bg-blue-500 p-4 rounded-lg text-white space-y-2'>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className='block w-full text-left px-4 py-2 hover:bg-blue-700 rounded'
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
