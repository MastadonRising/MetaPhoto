import React, { useState } from "react";
import "./style.css";
import ReactLoading from "react-loading";
import UTILS from "../../utils/utils";

function ClimbsNearYou({ routes, size }) {
  const [sortKey, setSortKey] = useState("name");
  // console.log(routes);
  const { items: localClimbs, requestSort, sortConfig } = UTILS.useSortableData(
    routes.length ? routes.filter((i, index) => (index < size ? i : null)) : {}
  );
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
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
          <span>Sort by: </span>
          <select
            onChange={(e) => {
              setSortKey(e.target.value);
            }}
          >
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="stars">Popularity</option>
          </select>
          <button
            type="button"
            onClick={() => {
              requestSort(sortKey);
            }}
          >
            <span className={getClassNamesFor(sortKey)}></span>
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
