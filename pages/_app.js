import Head from "next/head";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/auth.css";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}

export default MyApp;
