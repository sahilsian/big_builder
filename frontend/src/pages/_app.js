import "@/styles/globals.css";
import ContextProvider from "../context/context_provider";


export default function App({ Component, pageProps }) {
  return <ContextProvider><Component {...pageProps} /></ContextProvider>;
}
