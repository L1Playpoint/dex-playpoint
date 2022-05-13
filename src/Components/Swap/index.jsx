import { Button } from "@mui/material";
import React from "react";
import "./styles/style.css";
import { useDataLayer } from "../../Context/DataLayer";
import { ConnectWallet } from "../../Utils/ConnectWallet";
import { toast } from "react-toastify";

export default function Swap() {
  // eslint-disable-next-line
  const [{ isWalletConnected, avaxMarketPrice, balance }, dispatch] = useDataLayer();

  const handleConnectWallet = () => {
    if (!isWalletConnected) {
      ConnectWallet(dispatch);
      toast.success("Wallet Connected!");
    }
  };

  return (
    <div className="swap__container">
      <div className="title">
        <div>Playpoint Pre-Sale</div>
        <div>
          <Button>
            <i className="ri-information-line"></i>
          </Button>
        </div>
      </div>

      <div className="form__container">
        <div className="from">
          <input type="text" placeholder="0" />
          <Button>
            <img
              src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/avalanche-avax.png"
              alt=""
            />{" "}
            <span>AVAX</span> <i className="ri-arrow-down-s-line"></i>
          </Button>
        </div>
        <div className="price">
          <span>Market Price: ${avaxMarketPrice}</span>
          <span>Balance: {balance}</span>
        </div>
      </div>

      <div className="down__container">
        <i className="ri-arrow-up-down-line"></i>
      </div>

      <div className="form__container">
        <div className="to">
          <input disabled type="text" placeholder="0" />
          <Button disabled>
            <img src="https://ik.imagekit.io/lexworld/Logo.png" alt="" />{" "}
            <span>PPTT</span>
          </Button>
        </div>
        <div className="price">
          <span>Market Price: $0.015</span>
        </div>
      </div>

      <div className="swapButton">
        {!isWalletConnected && (
          <Button onClick={handleConnectWallet}>Connect Wallet</Button>
        )}
        {isWalletConnected && (
          <Button>
            Proceed <i className="ri-arrow-right-line"></i>
          </Button>
        )}
      </div>
    </div>
  );
}
