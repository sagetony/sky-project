// import { useTranslation } from 'react-i18next';

import { HomeHero, Tokenomics } from './components';

function Home() {
  // const { t } = useTranslation();

  return (
    <div className=' '>
      <HomeHero />
      <Tokenomics />
      {/* <h1 className='text-2xl mt-8'>{t('welcome')}</h1> */}
    </div>
  );
}

export default Home;
