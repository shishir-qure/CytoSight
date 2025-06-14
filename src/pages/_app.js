import "../styles/globals.css";
import Toast from "../components/Toast";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Toast />
    </div>
  );
}
