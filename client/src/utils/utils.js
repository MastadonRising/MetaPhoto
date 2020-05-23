import { useState, useMemo } from "react";

export default {
  // function to remove any non-latin characters (found them when uploading gopro imgs)
  latinify: function (word) {
    return word
      .split(``)
      .filter((i) => i.match(/^[ -~]+$/))
      .join(``);
  },

  convertResolution: function (x, y) {
    return `${((x * y) / 1000000).toFixed(1)}MP`;
  },

  convertToDecimalDeg: function (ref, array) {
    if (array !== undefined) {
      let result = (array[0] + array[1] / 60 + array[2] / 3600).toFixed(2);
      if (ref === (`N` || `E`)) {
        return Number(result);
      } else {
        return Number(-result);
      }
    }
    return `no data`;
  },

  useSortableData: function (
    items,
    config = {
      key: "first_name",
      direction: "ascending",
    }
  ) {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = useMemo(() => {
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
  },
};
