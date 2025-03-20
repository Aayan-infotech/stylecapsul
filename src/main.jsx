import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";  
import { loadStripe } from "@stripe/stripe-js";   

import App from "./App.jsx";
import "./index.css";
import { store } from "../src/reduxToolkit/store.js";

const stripePromise = loadStripe("pk_test_51PqTR903ec58RCFWng6UUUnIZ8R0PmQZL1xVE5Wv6jUIAiS9dxzWobfK6oysU86LJmkvd9I2Adcbbv0jYqLkNcAp00hFGx4UKj");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>   
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>
);
