import React from "react";
import Button from "@mui/material/Button";
import generateAvatar from "github-like-avatar-generator";
import { toast } from "react-toastify";
import { useDataLayer } from "../../Context/DataLayer";
import "./styles/style.css";
import { ethers } from "ethers";

export default function Navbar() {
  const [{ isWalletConnected, account, provider }, dispatch] = useDataLayer();

  let avatar = generateAvatar({
    blocks: Math.floor(Math.random() * 6) * 2, // must be multiple of two
    width: 100,
  });

  const handleConnectWallet = () => {
    if (!isWalletConnected) {
      dispatch({
        type: "TOGGLE_NETWORKS",
      });
    }
  };

  const handleDisconnectWallet = () => {
    if (isWalletConnected) {
      dispatch({ type: "DISCONNECT_WALLET" });
      toast.success("Wallet Disconnected!");
    }
  };

  return (
    <div className="navbar__container">
      <img src="https://ik.imagekit.io/lexworld/Logo.png" alt="Playpoint.ai" />

      <div className="utilities">
        {/* <Button className="network">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/avalanche-avax.png"
            alt=""
          />
          <span>Avalanche</span>
        </Button> */}

        {!isWalletConnected && (
          <Button onClick={handleConnectWallet} className="wallet">
            <img src="https://ik.imagekit.io/lexworld/Logo.png" alt="" />
            <span>Connect</span>
            <span>
              <i className="ri-arrow-down-s-line"></i>
            </span>
          </Button>
        )}
        {account !== "" && (
          <div onClick={handleConnectWallet} className="wallet">
            <img src={avatar.base64} alt="" />
            <span>
              {account.substring(0, 8) +
                "..." +
                account.substring(account.length - 7, account.length)}
            </span>
            <div>
              <Button onClick={handleDisconnectWallet}>Disconnect</Button>
            </div>
          </div>
        )}
        <Button className="downIcon">
          <i className="ri-menu-3-line"></i>
          <span>Dashboard</span>
        </Button>
      </div>
    </div>
  );
}
