function arrangeArray(arr, order) {
  return arr.sort((a, b) => {
    return order.indexOf(a) - order.indexOf(b);
  });
}

export default arrangeArray;
