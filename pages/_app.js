import { Provider } from "next-auth/client";
import Header from "../components/Header";
import "../styles/index.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Header />
      <Component {...pageProps} />
    </Provider>
  );
}
