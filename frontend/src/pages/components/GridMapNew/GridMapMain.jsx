import './components/news.css';
import GridMapNew from './components/GirdMapNew';
import GridMapNew2 from './components/GridMapNew2';
import GridMapNew3 from './components/GridMapNew3';
import GridMapNew4 from './components/GridMapNew4';
import GridMapNew5 from './components/GridMapNew5';
import GridMapNew6 from './components/GridMapNew6';
import GridMapNew7 from './components/GridMapNew7';
import GridMapNew9 from './components/GridMapNew9';
import GridMapNew10 from './components/GridMapNew10';
import GridMapNew11 from './components/GridMapNew11';

const GridMapMain = () => {
  return (
    <div>
      <div className='first-row  '>
        <div className='first-row-1'>
          <GridMapNew />
        </div>
        <div className='first-row-2'>
          <div className='first-row-2-1'>
            <GridMapNew2 />
          </div>
          <div className='first-row-2-2'>
            <GridMapNew3 />
          </div>
        </div>
        <div className='first-row-3'>
          <GridMapNew4 />
        </div>
      </div>
      <div className='second-row'>
        <div className='second-row-1'>
          <GridMapNew5 />
        </div>
        <div className='second-row-2'>
          <GridMapNew6 />
        </div>
      </div>
      <div className='third-row'>
        <div className='third-row-1'>
          <GridMapNew7 />
        </div>
        <div className='third-row-2'>
          <GridMapNew9 />
        </div>
      </div>
      <div className='last-row'>
        <div className='last-row-1'>
          <GridMapNew10 />
        </div>
        <div className='last-row-2'>
          <GridMapNew11 />{' '}
        </div>
      </div>
    </div>
  );
};

export default GridMapMain;
