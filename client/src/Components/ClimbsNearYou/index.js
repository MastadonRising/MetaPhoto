import React, { useState, useMemo, useEffect, useContext } from "react";
import "./style.css";
import API from "../../utils/API";
import ReactLoading from "react-loading";
import LocalClimbsContext from "../../utils/LocalClimbsContext";

function useSortableData(
  items,
  config = {
    key: "name",
    direction: "ascending",
  }
) {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    if (items.length > 0) {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
}

function ClimbsNearYou() {
  const { routes } = useContext(LocalClimbsContext);
  const { items: localClimbs, requestSort, sortConfig } = useSortableData(
    routes
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
      <h4>Climbs Near You</h4>
      {!routes.length ? (
        <ReactLoading
          height="128px"
          width="128px"
          className="loader"
          type={"bars"}
          color={"black"}
        />
      ) : (
        <div>
          <button
            type="button"
            onClick={() => {
              requestSort(`name`);
            }}
            className={getClassNamesFor("name")}
          >
            SORTIFYING
          </button>
          <ul style={{ textAlign: "left", listStyle: "none" }}>
            {localClimbs.map((i, index) => (
              <a key={index} href={i.url}>
                <img src={i.imgSqSmall} alt={i.name}></img>
                {`${i.name} - Rating: ${i.rating} - Popularity: ${i.stars}/5`}
              </a>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClimbsNearYou;
