/* eslint-disable react/prop-types */
import i18next from 'i18next';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

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

const LanguageSelector = ({ setIsDropdownVisible }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  return (
    <div className='bg-blue-500 z-[999px] h-[200px] rounded-lg text-white mb-2'>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => {
            changeLanguage(lang.code);
            sessionStorage.setItem('language', lang.code);
            setIsDropdownVisible(false);
          }}
          className={`block border-b border-gray-200 w-full text-left px-4 py-2 rounded ${
            i18n.language === lang.code ? 'bg-blue-700' : 'hover:bg-blue-700'
          }`}
        >
          <span className='flex justify-between items-center'>
            {lang.label}
            {i18n.language === lang.code && (
              <IoMdCheckmarkCircleOutline style={{ fontSize: '22px' }} />
            )}
          </span>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
