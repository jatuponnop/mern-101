import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux"; // สร้าง Store ไว้รอเก็บค่า
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer/index";

// Router
import { BrowserRouter } from "react-router-dom";

const store = createStore(rootReducer, composeWithDevTools());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
