const initalState = {
  products: [],
  order: [],
  user: {},
  arrivaltime: [],
  totalprice: [0],
  cartamount: [0],
  total: [0],
};

export const Reducer = (state = initalState, action) => {
  switch (action.type) {
    /******* */
    case "SET_USERNAME":
      return {
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    /****** */

    /****** */
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    /****** */

    /****** */
    case "ADD_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    /****** */

    /****** */
    case "PRODUCT_AMOUNT":
      return {
        ...state,
        products: state.products.map((item) => ({
          ...item,
          quantity: action.payload,
        })),
      };
    /****** */

    /****** */
    case "SET_CARTAMOUNT":
      return {
        ...state,
        cartamount: action.payload,
      };

    /****** */

    /****** */
    case "SET_ORDER":
      return {
        ...state,
        order: action.payload,
      };
    /****** */

    /****** */
    case "SET_ARRIVAL":
      return {
        ...state,
        arrivaltime: action.payload,
      };
    /****** */
    default:
      return state;
  }
};
