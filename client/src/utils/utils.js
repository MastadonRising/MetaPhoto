import { useState, useMemo } from "react";

export default {
  // function to remove any non-latin characters (found them when uploading gopro imgs)
  latinify: function (word) {
    if (word !== undefined) {
      return word
        .split(``)
        .filter((i) => i.match(/^[ -~]+$/))
        .join(``);
    }
    return null;
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
  },

  calculateDistance: function (lat1, lon1, lat2, lon2, unit) {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  },

};
