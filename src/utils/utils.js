export default {
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
};
