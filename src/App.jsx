
import "./App.css";
import Layout from "./components/Layout/Layout";
import { SeasonProvider } from "./context/SeasonContext";

function App() {


  return (
    <>
    <SeasonProvider>
       <Layout />
      </SeasonProvider>

    </>
  );
}

export default App;
