export function addProduct(product) {
  return {
    type: "ADD_PRODUCT",
    payload: product,
  };
}
export function setUsername(name) {
  return {
    type: "SET_USERNAME",
    payload: name,
  };
}

export function addEmail(email) {
  return {
    type: "ADD_EMAIL",
    payload: email,
  };
}

export function setQuantity(quantity) {
  return {
    type: "PRODUCT_AMOUNT",
    payload: quantity,
  };
}

export function setCartCounter(cartCounter) {
  return {
    type: "SET_CARTAMOUNT",
    payload: cartCounter,
  };
}

export function setOrder(order) {
  return {
    type: "SET_ORDER",
    payload: order,
  };
}

export function setArrival(arrival) {
  return {
    type: "SET_ARRIVAL",
    payload: arrival,
  };
}
