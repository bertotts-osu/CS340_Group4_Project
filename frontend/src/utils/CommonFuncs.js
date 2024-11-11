let reversedPairs = {};

function swapKeys(obj) {
  Object.keys(obj).forEach((key) => {
    reversedPairs[obj[key]] = key
  });
  return reversedPairs;
}

export default swapKeys;