import { Button } from "@mui/material";
import React from "react";
import { useDataLayer } from "../../Context/DataLayer";
import { ConnectWallet } from "../../Utils/ConnectWallet";
import { toast } from "react-toastify";
import "./styles/style.css";

export default function Networks() {
  const [, dispatch] = useDataLayer();

  const handleCloseNetworks = () => {
    dispatch({
      type: "TOGGLE_NETWORKS",
    });
  };

  const handleConnectWallet = (network) => {
      /**
       * @dev Algorithm
       * 1. Check the network chain id 
       * 2. Provide chain detail from Networks.json where it got chain id
       */
      ConnectWallet(dispatch, network);
      toast.success("Wallet Connected!");

      dispatch({
        type: "TOGGLE_NETWORKS",
      });
  }

  return (
    <div className="networks__container">
      <div className="container">
        <div className="title">
          <b>Network Selection</b>
          <Button onClick={handleCloseNetworks}>
            <i className="ri-close-line"></i>
          </Button>
        </div>

        <div className="networks">
          <Button onClick={() => handleConnectWallet("0xA869")} className="network_item">
            <span>Avalanche C-Chain</span>
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/avalanche-avax.png"
              alt=""
            />
          </Button>

          <Button className="network_item">
            <span>Ethereum Mainnet</span>
            <img
              src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Ethereum-ETH-icon.png"
              alt=""
            />
          </Button>

          <Button className="network_item">
            <span>Tron Network</span>
            <img
              src="https://tron.guide/wp-content/uploads/2020/01/icon-red-bg.png"
              alt=""
            />
          </Button>

          <Button className="network_item">
            <span>Binance Smart Chain</span>
            <img
              src="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Binance-Coin-BNB-icon.png"
              alt="https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Binance-Coin-BNB-icon.png"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
