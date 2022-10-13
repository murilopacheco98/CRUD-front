import React from "react";
import { Provider } from "react-redux";
import './index.css'
import AppRoutes from "./routes/AppRoutes";
import StylesGlobal from "./config/GlobalStyles";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StylesGlobal />
        <AppRoutes />
      </PersistGate>  
    </Provider>
  );
};

export default App
