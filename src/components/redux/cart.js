import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "cart",
  initialState: {
    basket: [],
    productDetails: [],
    login: "",
    apiData: [],
    headerSearchButton: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const newBasket = [...state.basket, action.payload];
      state.basket = newBasket;

      const arrayUniqueByKey = [
        ...new Map(newBasket.map((item) => [item["id"], item])).values(),
      ];
      state.basket = arrayUniqueByKey;

      // state.basket = [...state.basket, action.payload];
    },
    removeCart: (state, action) => {
      state.basket = [...state.basket].filter((elem) => {
        return elem.id !== action.payload;
      });
    },
    emtyCart: (state, action) => {
      state.basket = state.basket = [];
    },
    productItem: (state, action) => {
      state.productDetails = [action.payload];
      // console.log(state.productDetails);
    },
    login: (state, action) => {
      state.login = action.payload;
      // console.log(`login redux ${state.login}`);
    },
    getApi: (state, action) => {
      state.apiData = [...action.payload];
      // console.log(`api array ${state.apiData}`);
    },
    searchProduct: (state, action) => {
      state.headerSearchButton = [...action.payload];
      // console.log(state.headerSearchButton);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeCart,
  emtyCart,
  productItem,
  login,
  getApi,
  searchProduct,
} = counterSlice.actions;

export default counterSlice.reducer;
