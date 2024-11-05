import { useTranslation } from 'react-i18next';
// import { LanguageSelector } from '../components';

function Home() {
  // return (
  //   <div className='min-h-screen bg-meta-gradient  text-white font-sans'>
  //     <header className='flex justify-between items-center p-4'>
  //       <h1 className='text-2xl font-bold'>Meta City Fund</h1>
  //       <nav className='flex space-x-4'>
  //         <a href='#map' className='hover:underline'>
  //           Map
  //         </a>
  //         <a href='#market' className='hover:underline'>
  //           Market
  //         </a>
  //         <a href='#tokenomics' className='hover:underline'>
  //           Tokenomics
  //         </a>
  //         <a href='#about' className='hover:underline'>
  //           About Us
  //         </a>
  //         <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded'>
  //           Log in
  //         </button>
  //         <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded'>
  //           Create account
  //         </button>
  //       </nav>
  //     </header>

  //     <main className='flex flex-col items-center text-center py-10 px-4 md:px-10'>
  //       <div className='bg-blue-600 p-2 px-4 rounded-full text-sm font-medium'>
  //         # MCFD
  //       </div>
  //       <h2 className='text-4xl font-bold mt-4'>Meta City Fund</h2>
  //       <section className='mt-8 max-w-2xl'>
  //         <h3 className='text-2xl font-semibold'>Introduction</h3>
  //         <p className='mt-2'>
  //           Land less than one thousand square meters is held by OSO Fund, and
  //           can choose fund management and development or investment and
  //           operation.
  //         </p>
  //         <p className='mt-2'>
  //           Land over 1,000 square meters can be sold by itself. In this case,
  //           we will deploy your on-chain NFT and unlock the corresponding rights
  //           in the virtual world, provide you with a series of facilities issued
  //           by the government for the corresponding land.
  //         </p>
  //       </section>

  //       <section className='mt-8 max-w-2xl'>
  //         <h3 className='text-2xl font-semibold'>Advantages</h3>
  //         <p className='mt-2'>
  //           The Meta City Fund is managed transparently, with all land
  //           transactions and management recorded on the blockchain so anyone can
  //           review, investigate and supervise it.
  //         </p>
  //         <p className='mt-2'>
  //           As the assets grow, OSO Fund can submit to supervision agency and
  //           intermediary fund operations are compliant, and complete reports and
  //           asset management are legally issued.
  //         </p>
  //       </section>
  //     </main>

  //     <footer className='bg-blue-700 py-4 text-center'>
  //       <div className='flex justify-center space-x-4 mb-4'>
  //         <a href='#twitter' className='text-white hover:text-gray-300'>
  //           Twitter
  //         </a>
  //         <a href='#discord' className='text-white hover:text-gray-300'>
  //           Discord
  //         </a>
  //         <a href='#telegram' className='text-white hover:text-gray-300'>
  //           Telegram
  //         </a>
  //       </div>
  //       <p className='text-sm'>18+ and Copyright ©SKY META CITY</p>
  //     </footer>
  //   </div>
  // );

  const { t } = useTranslation();

  return (
    <div className='min-h-screen bg-blue-200 flex flex-col items-center justify-center'>
      {/* <LanguageSelector /> */}
      <h1 className='text-2xl mt-8'>{t('welcome')}</h1>
    </div>
  );
}

export default Home;
