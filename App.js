import React from "react";
import store from "./redux/store";

import { Provider } from "react-redux";
import createStore from "./redux/store";
import Index from "./index";

export default function App() {
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
