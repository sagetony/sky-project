import React, { useEffect, useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Tooltip } from 'react-tooltip';
import '../styles.css';

const GridMap = () => {
  const [lands, setLands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/mockLands.json')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => {
        setLands(data);
      })
      .catch((error) => setError('Failed to fetch lands.'));
  }, []);

  const maxRows = 30;
  const maxColumns = 100;

  // Define exactly 11 sections
  // const sections = [
  //   {
  //     id: 1,
  //     startRow: 1,
  //     endRow: 5,
  //     startCol: 1,
  //     endCol: 25,
  //     className: 'large-section',
  //   },
  //   {
  //     id: 2,
  //     startRow: 1,
  //     endRow: 5,
  //     startCol: 26,
  //     endCol: 50,
  //   },
  //   { id: 3, startRow: 1, endRow: 5, startCol: 51, endCol: 75 },
  //   { id: 4, startRow: 1, endRow: 5, startCol: 76, endCol: 100 },
  //   { id: 5, startRow: 6, endRow: 15, startCol: 1, endCol: 33 },
  //   { id: 6, startRow: 6, endRow: 15, startCol: 34, endCol: 66 },
  //   {
  //     id: 7,
  //     startRow: 6,
  //     endRow: 15,
  //     startCol: 67,
  //     endCol: 100,
  //     className: 'large-section',
  //   },
  //   { id: 8, startRow: 16, endRow: 30, startCol: 1, endCol: 25 },
  //   {
  //     id: 9,
  //     startRow: 16,
  //     endRow: 30,
  //     startCol: 26,
  //     endCol: 50,
  //     className: 'large-section',
  //   },
  //   { id: 10, startRow: 16, endRow: 30, startCol: 51, endCol: 75 },
  //   { id: 11, startRow: 16, endRow: 30, startCol: 76, endCol: 84 },
  //   {
  //     id: 11,
  //     startRow: 16,
  //     endRow: 30,
  //     startCol: 85,
  //     endCol: 100,
  //     className: 'large-section',
  //   },
  // ];

  // const getGridItem = (land, row, col) => {
  //   const section = sections.find(
  //     (sec) =>
  //       row >= sec.startRow &&
  //       row <= sec.endRow &&
  //       col >= sec.startCol &&
  //       col <= sec.endCol
  //   );

  //   const isLargeSection =
  //     section?.className && section.className?.includes('large-section');
  //   // const isLargeSection = section && (section.id === 1 || section.id === 4);

  //   return (
  //     <div
  //       key={`grid-${row}-${col}`}
  //       className={`grid-item ${land ? 'land' : 'empty'} ${
  //         // isLargeSection ? 'large-section' : ''
  //         section?.className || ''
  //       } `}
  //       style={{
  //         borderTop:
  //           section && row === section.startRow ? '1px solid black' : '',
  //         borderBottom:
  //           section && row === section.endRow ? '1px solid black' : '',
  //         borderLeft:
  //           section && col === section.startCol ? '1px solid black' : '',
  //         borderRight:
  //           section && col === section.endCol ? '1px solid black' : '',
  //       }}
  //     >
  //       {land && (
  //         <>
  //           <img
  //             src={land.avatar}
  //             alt={land.name}
  //             className='grid-avatar'
  //             data-tooltip-id={`tooltip-${land.id}`}
  //             data-tooltip-content={`${land.name} Owner: ${land.owner}`}
  //           />
  //           <Tooltip id={`tooltip-${land.id}`} />
  //         </>
  //       )}
  //     </div>
  //   );
  // };

  const sections = [
    {
      id: 1,
      startRow: 1,
      endRow: 5,
      startCol: 1,
      endCol: 10,
      className: 'large-section-1 large-section',
    },
    {
      id: 2,
      startRow: 5,
      endRow: 15,
      startCol: 34,
      endCol: 40,
      className: 'large-section-1',
    },
    { id: 3, startRow: 1, endRow: 5, startCol: 51, endCol: 75 },
    { id: 4, startRow: 1, endRow: 5, startCol: 76, endCol: 100 },
    { id: 5, startRow: 6, endRow: 15, startCol: 1, endCol: 33 },
    { id: 6, startRow: 6, endRow: 15, startCol: 34, endCol: 66 },
    {
      id: 7,
      startRow: 7,
      endRow: 9,
      startCol: 30,
      endCol: 70, // Adjusted for 170px width (17 columns)
      className: 'large-section-2 large-section',
    },
    { id: 8, startRow: 16, endRow: 30, startCol: 1, endCol: 25 },
    {
      id: 9,
      startRow: 16,
      endRow: 17, // Adjusted for 30px height (3 rows)
      startCol: 29,
      endCol: 31, // Adjusted for 50px width (5 columns)
      className: 'large-section-3 large-section',
    },

    { id: 10, startRow: 16, endRow: 30, startCol: 51, endCol: 75 },
    // { id: 11, startRow: 16, endRow: 30, startCol: 76, endCol: 84 },
    // {
    //   id: 11,
    //   startRow: 16,
    //   endRow: 30,
    //   startCol: 85,
    //   endCol: 100,
    //   className: 'large-section',
    // },
    {
      id: 11,
      startRow: 16,
      endRow: 20, // Adjusted for 50px height (5 rows)
      startCol: 76,
      endCol: 79, // Adjusted for 40px width (4 columns)
      className: 'large-section-4 large-section',
    },
  ];

  const getGridItem = (land, row, col) => {
    const section = sections.find(
      (sec) =>
        row >= sec.startRow &&
        row <= sec.endRow &&
        col >= sec.startCol &&
        col <= sec.endCol
    );

    const isLargeSection = section?.className?.includes('large-section');

    return (
      <div
        key={`grid-${row}-${col}`}
        className={`grid-item ${land ? 'land' : 'empty'} ${
          section?.className || ''
        }`}
        style={{
          display: isLargeSection && row !== section.startRow ? 'none' : '', // Hide extra cells
          // borderTop:
          //   section && row === section.startRow ? '1px solid black' : '',
          // borderBottom:
          //   section && row === section.endRow ? '1px solid black' : '',
          // borderLeft:
          //   section && col === section.startCol ? '1px solid black' : '',
          // borderRight:
          //   section && col === section.endCol ? '1px solid black' : '',
        }}
      >
        {land && (
          <>
            <img
              src={land.avatar}
              alt={land.name}
              className='grid-avatar'
              data-tooltip-id={`tooltip-${land.id}`}
              data-tooltip-content={`${land.name} Owner: ${land.owner}`}
            />
            <Tooltip id={`tooltip-${land.id}`} />
          </>
        )}
      </div>
    );
  };

  const gridItems = [];
  for (let row = 1; row <= maxRows; row++) {
    for (let col = 1; col <= maxColumns; col++) {
      const land = lands.find((land) => land.x === col && land.y === row);
      gridItems.push(getGridItem(land, row, col));
    }
  }

  return (
    <div className='grid-map-container'>
      {error && <div className='error-message'>{error}</div>}
      <TransformWrapper defaultScale={0.3} wheel={{ step: 0.1 }}>
        <TransformComponent>
          <div className='grid-container'>{gridItems}</div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default GridMap;
