/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Tooltip } from "react-tooltip";
import "./styles.css";
import { LandModal } from "../../components";

const GridMap = ({ data }) => {
  const [lands, setLands] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  const handleLandModalClick = (user) => {
    setModalOpen(!modalOpen);
    setSelectedUser(user);
  };

  const closeLandModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const filteredLands = data.filter(
      (land) => land.x >= 1 && land.x <= 100 && land.y >= 1 && land.y <= 30
    );
    console.log("Filtered lands:", filteredLands);
    setLands(filteredLands);
  }, [data]);

  const maxRows = 30;
  const maxColumns = 100;

  const getGridItem = (land, row, col) => {
    if (land) {
      return (
        <div
          key={land.id}
          className="grid-item cursor-pointer hover:scale-[3]"
          style={{
            gridRow: land.y,
            gridColumn: land.x,
          }}
          onClick={() => handleLandModalClick(land.item)}
          data-tooltip-id={`tooltip-${land.id}`}
          data-tooltip-content={`${land.name} Owner: ${land.owner}`}
          data-html={true}
        >
          {land.avatar != null ? (
            <>
              <img
                src={`https://app-8188821b-b70d-4f68-a73e-2a6805ccb1f1.cleverapps.io/${land.avatar}`}
                alt={land.name}
                className="grid-avatar"
              />
              <Tooltip id={`tooltip-${land.id}`} />
            </>
          ) : (
            "null"
          )}
        </div>
      );
    } else {
      return (
        <div key={`empty-${row}-${col}`} className="grid-item empty"></div>
      );
    }
  };

  const gridItems = [];
  for (let row = 1; row <= maxRows; row++) {
    for (let col = 1; col <= maxColumns; col++) {
      const land = lands.find((land) => land.x === col && land.y === row);
      gridItems.push(getGridItem(land, row, col));
    }
  }

  return (
    <div className="grid-map-container">
      <TransformWrapper
        defaultScale={0.3}
        wheel={{ step: 0.3 }}
        panning={{ disabled: false }}
      >
        <TransformComponent>
          <div
            className="grid-container"
            style={{
              gridTemplateRows: `repeat(${maxRows}, 1fr)`,
              gridTemplateColumns: `repeat(${maxColumns}, 1fr)`,
            }}
          >
            {gridItems}
          </div>
        </TransformComponent>
      </TransformWrapper>
      {modalOpen && <LandModal onclose={closeLandModal} user={selectedUser} />}
    </div>
  );
};

export default GridMap;
