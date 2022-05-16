import React from "react";
import "./styles/App.css";
import Navbar from "./Components/Navbar";
import Swap from "./Components/Swap";
import { useDataLayer } from "./Context/DataLayer";

export default function App() {
  window.ethereum.on("accountsChanged", async () => {
    window.location.reload();
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [,dispatch] = useDataLayer()

  // 0x2d5FDBc0D00EefcF459580Be226B4380CB30bC99

  React.useEffect(() => {
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
