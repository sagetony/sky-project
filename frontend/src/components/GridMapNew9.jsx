import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Tooltip } from "react-tooltip";
import "./news.css";

const GridMapNew9 = () => {
  const [lands, setLands] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/mockLands.json")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setLands(data);
      })
      .catch((error) => setError("Failed to fetch lands."));
  }, []);

  const maxRows = 30;
  const maxColumns = 90;

  const getGridItem = (land, row, col) => {
    return (
      <div
        key={`grid-${row}-${col}`}
        className={`grid-item-9 ${land ? "land-9" : "empty-9"}  `}
      >
        {land && (
          <>
            <img
              src={land.avatar}
              alt={land.name}
              className="grid-avatar-9"
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
    <div className="grid-map-container-9">
      {error && <div className="error-message">{error}</div>}
      <TransformWrapper defaultScale={0.3} wheel={{ step: 0.1 }}>
        <TransformComponent>
          <div className="grid-container-9">{gridItems}</div>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default GridMapNew9;
