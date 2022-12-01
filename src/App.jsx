import { Button } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import "./styles/style.css";
const { ethereum } = window;

export default function App() {
  const [userAddress, setUserAddress] = React.useState("");
  const [inputAmount, setInputAmount] = React.useState({
    usdt: "",
    pptt: "",
  });

  ethereum.on("accountsChanged", async function (accounts) {
    setUserAddress(accounts[0]);
  });

  const watchPPTT = () => {
    ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xdDCFEEFD40F48F362ae5fcD13f0D5203CB367C64",
            symbol: "PPTT",
            decimals: 18,
            image: "https://ik.imagekit.io/lexworld/Logo.png",
          },
        },
      })
      .then((success) => {
        if (success) {
          toast("PPTT successfully added to wallet!");
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .catch(console.error);
  };

  // @note handle input change either usdt or pptt
  const handleInputAmountChange = (e, i) => {
    if (i === "usdt") {
      setInputAmount({
        usdt: e,
        pptt: e / 0.02,
      });
    } else {
      setInputAmount({
        usdt: e * 0.02,
        pptt: e,
      });
    }
  };
  const query = userAddress === "" && true;

  // @note connect wallet function
  const connectWallet = async () => {
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xA4B1" }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        toast.error("Looks like we need to add sepolia test network.");
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0xA4B1",
                chainName: "Arbitrum One",
                rpcUrls: ["https://rpc.ankr.com/arbitrum"] /* ... */,
                nativeCurrency: {
                  name: "Arbitrum Mainnet",
                  symbol: "ETH",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://arbiscan.io"],
                iconUrls: [
                  "https://assets-global.website-files.com/5f973c970bea5548ad4287ef/60a320b472858ace6700df76_arb-icon.svg",
                ],
              },
            ],
          });
        } catch (addError) {
          console.log(addError);
        }
      }
    }

    if (typeof ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setUserAddress(accounts[0]);
    } else {
      toast("Consider using Metamask or Add Extension!");
    }
  };

  return (
    <div className="app__container">
      <div className="navbar__container">
        <div className="navbar__left">
          <img
            src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
            alt=""
            loading="lazy"
          />
          <a href="">Swap</a>
          <a href="">Liquidity</a>
          <a href="">Docs</a>
        </div>

        <div className="navbar__right">
          <Button onClick={watchPPTT}>
            <i className="ri-upload-2-line"></i>List PPTT to Wallet
          </Button>
          <Button>
            <img
              src="https://ik.imagekit.io/domsan/Screenshot_2022-12-01_at_04.00.00-removebg-preview_BHJK2CP_K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669846541695"
              loading="lazy"
              alt=""
            />{" "}
            Arbitrum
          </Button>
          {query ? (
            <Button onClick={connectWallet} className="walletBtn__container">
              <i className="ri-lock-line"></i> Connect
            </Button>
          ) : (
            <Button onClick={connectWallet} className="walletBtn__container">
              <i className="ri-lock-line"></i>{" "}
              {userAddress
                .slice(0, 8)
                .concat("...")
                .concat(
                  userAddress.slice(userAddress.length - 3, userAddress.length)
                )}
            </Button>
          )}
        </div>
      </div>
      
      {/* @note swap container */}
      <div className="swap__container">
        <div className="swapTitle">
          <p>Exchange</p>
          <Button>
            <i className="ri-repeat-2-line"></i>
          </Button>
        </div>

        <div className="swapRate">
          <p>
            1 <span>PPTT</span>
          </p>
          <i className="ri-arrow-right-line"></i>
          <p>
            0.02 <span>USDT</span>
          </p>
        </div>

        <label htmlFor="">Pay</label>
        <div className="swapInput">
          <input
            type="text"
            placeholder="Enter USDT amount..."
            value={inputAmount.usdt}
            onChange={(e) => handleInputAmountChange(e.target.value, "usdt")}
          />
          <div className="swapInput__select">
            <img
              src="https://ik.imagekit.io/domsan/Tether-USDT-icon_uVwoGX4Ws.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669844066624"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        <label htmlFor="">Get</label>
        <div className="swapInput">
          <input
            type="text"
            placeholder="Enter PPTT amount..."
            value={inputAmount.pptt}
            onChange={(e) => handleInputAmountChange(e.target.value)}
          />
          <div className="swapInput__select">
            <img
              src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        <Button
          onClick={() => {
            query && connectWallet();
          }}
          className="exchangeBtn__container"
        >
          {query ? "Connect Wallet" : "Exchange"}
        </Button>
      </div>

      <div className="footer__container">
        Copyright &copy; 2023 PPTT. All rights reserved.
        <br />
        Proudly powered by{" "}
        <a target="_blank" href="https://theboringschool.org/">
          The Boring School
        </a>{" "}
        & Supported by{" "}
        <a target="_blank" href="https://codewithsudeep.com/">
          CodewithSudeep
        </a>
        .
      </div>
    </div>
  );
}
