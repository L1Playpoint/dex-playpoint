import React from "react";
import "./styles/App.css";
import Navbar from "./Components/Navbar";
import Swap from "./Components/Swap";
import { useDataLayer } from "./Context/DataLayer";

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [,dispatch] = useDataLayer()

  if (typeof window.ethereum !== "undefined") {
    window.ethereum.on("accountsChanged", async () => {
      window.location.reload();
    });
  }else{
    window.alert("Please install MetaMask!")
  }

  React.useEffect(() => {
    // deepcode ignore PromiseNotCaughtGeneral
    fetch("https://api.coingecko.com/api/v3/coins/avalanche-2", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        dispatch({
          type: "SET_MARKET_PRICE",
          payload: {
            avaxMarketPrice: data.market_data.current_price.usd,
          },
        });

        setIsLoading(false);
      });
      // eslint-disable-next-line
  }, []);

  return (
    <div className="app__container">
      <Navbar />
        <Swap isLoading={isLoading}/>
    </div>
  );
}
