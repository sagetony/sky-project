import './components/news.css';
import GridMapNew from './components/GirdMapNew';
import GridMapNew2 from './components/GridMapNew2';
import GridMapNew3 from './components/GridMapNew3';
import GridMapNew4 from './components/GridMapNew4';
import GridMapNew5 from './components/GridMapNew5';
import GridMapNew6 from './components/GridMapNew6';
import GridMapNew7 from './components/GridMapNew7';
import GridMapNew8 from './components/GridMapNew8';
import GridMapNew9 from './components/GridMapNew9';
import GridMapNew10 from './components/GridMapNew10';
import GridMapNew11 from './components/GridMapNew11';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { LandModal } from '../../../components';
import { useState } from 'react';

const GridMapMain = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleLandModalClick = (user) => {
    setModalOpen(true);
    setSelectedUser(user);
  };

  const closeLandModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <TransformWrapper
        defaultScale={0.3}
        wheel={{ step: 0.1 }}
        pinch={{ step: 0.1 }}
      >
        <TransformComponent>
          <div className='row-grid'>
            <div className='first-row'>
              <div className='first-row-1'>
                <GridMapNew onLandClick={handleLandModalClick} />
              </div>
              <div className='first-row-2'>
                <div className='first-row-2-1'>
                  <GridMapNew2 onLandClick={handleLandModalClick} />
                </div>
                <div className='first-row-2-2'>
                  <GridMapNew3 onLandClick={handleLandModalClick} />
                </div>
              </div>
              <div className='first-row-3'>
                <GridMapNew4 onLandClick={handleLandModalClick} />
              </div>
            </div>
            <div className='second-row'>
              <div className='second-row-1'>
                <GridMapNew5 onLandClick={handleLandModalClick} />
              </div>
              <div className='second-row-2'>
                <GridMapNew6 onLandClick={handleLandModalClick} />
              </div>
              <div className='second-row-3'>
                <GridMapNew7 onLandClick={handleLandModalClick} />
              </div>
              <div className='second-row-4'>
                <GridMapNew8 onLandClick={handleLandModalClick} />
              </div>
            </div>
            <div className='third-row'>
              <div className='third-row-1'>
                <GridMapNew9 onLandClick={handleLandModalClick} />
              </div>
              <div className='third-row-2'>
                <GridMapNew10 onLandClick={handleLandModalClick} />
              </div>
              <div className='last-row-2'>
                <GridMapNew11 onLandClick={handleLandModalClick} />{' '}
              </div>
            </div>
          </div>
        </TransformComponent>
      </TransformWrapper>
      {modalOpen && <LandModal onclose={closeLandModal} user={selectedUser} />}
    </div>
  );
};

export default GridMapMain;
