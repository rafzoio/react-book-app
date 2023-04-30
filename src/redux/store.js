import { configureStore } from "@reduxjs/toolkit";

const pageInitialState = {
  currentPage: 1,
};

const formatInitialState = {
  currentFormat: "application/json",
};

const pageReducer = (state = pageInitialState, action) => {
  switch (action.type) {
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const formatReducer = (state = formatInitialState, action) => {
  switch (action.type) {
    case "SET_FORMAT":
      return {
        ...state,
        currentFormat: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: {
    page: pageReducer,
    format: formatReducer,
  },
});

export default store;
