import { Button } from "@mui/material";
import { ethers } from "ethers";
import React from "react";
import { toast } from "react-toastify";
import "./styles/style.css";
const { ethereum } = window;
import SwapFactoryABI from "./contracts/SwapFactory.json";
import USDTAbi from "./contracts/USDTABI.json";
import PPTTAbi from "./contracts/PPTTAbi.json";

export default function App() {
  const [userAddress, setUserAddress] = React.useState("");
  const [inputAmount, setInputAmount] = React.useState({
    usdt: "",
    pptt: "",
  });
  const SwapFactoryAddress = "0xb8f04650633b6dB7D71e7E20e3Ab3CD9e301f01C";

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const SwapFactoryContract = new ethers.Contract(
    SwapFactoryAddress,
    SwapFactoryABI,
    signer
  );

  const USDTContract = new ethers.Contract(
    "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    USDTAbi,
    signer
  );

  const PPTTContract = new ethers.Contract(
    "0xdDCFEEFD40F48F362ae5fcD13f0D5203CB367C64",
    PPTTAbi,
    signer
  );

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
  const toastSetting = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  ethereum.on("accountsChanged", async function (accounts) {
    setUserAddress(accounts[0]);
  });

  // @note watch pptt and add to wallet
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
        if (success)
          toast("🪙 PPTT successfully added to wallet!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        else throw new Error("Something went wrong.");
      })
      .catch(console.error);
  };

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
        toast.error(
          "Looks like we need to add Arbitrum network. 🏦",
          toastSetting
        );
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
      toast("👛 Wallet connected successfully!", toastSetting);
    } else {
      toast("🦊 Consider using Metamask or Add Extension!", toastSetting);
    }
  };

  const buyPPTT = async () => {
    const userPPTT = await PPTTContract.functions.balanceOf(userAddress);

    if (inputAmount.usdt === "" || inputAmount.pptt === "")
      return toast.error(
        "🪙 Looks like you've forgot to pick buying amount!",
        toastSetting
      );
    const _usdtAmount = (inputAmount.usdt * 1000000).toString();
    function toFixed(x) {
      if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split("e-")[1]);
        if (e) {
          x *= Math.pow(10, e - 1);
          x = "0." + new Array(e).join("0") + x.toString().substring(2);
        }
      } else {
        var e = parseInt(x.toString().split("+")[1]);
        if (e > 20) {
          e -= 20;
          x /= Math.pow(10, e);
          x += new Array(e + 1).join("0");
        }
      }
      return x;
    }
    const _ppttAmount = toFixed(inputAmount.pptt * 10 ** 18);

    await USDTContract.functions.approve(SwapFactoryAddress, _usdtAmount);
    await SwapFactoryContract.functions.buyPPTT(_usdtAmount, _ppttAmount);

    if (userPPTT == 0) {
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
          if (success)
            toast("🪙 PPTT successfully added to wallet!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          else throw new Error("Something went wrong.");
        })
        .catch(console.error);
    } else {
      toast("🪙 PPTT bought successfully!", toastSetting);
    }
  };

  return (
    <div className="app__container">
      <div className="blob"></div>
      <div className="navbar__container">
        <div className="navbar__left">
          <img
            src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
            alt=""
            loading="lazy"
          />
          <p>Playpoint Swap</p>
          <a href="#">Swap</a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://app.uniswap.org/#/pool/228006"
          >
            Liquidity
          </a>
          <a target="_blank" rel="noreferrer" href="https://docs.playpoint.ai/">
            Docs
          </a>
        </div>

        <div className="navbar__right">
          <Button onClick={watchPPTT} className="watchContainer">
            <i className="ri-upload-2-line"></i>List PPTT to Wallet
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
            query ? connectWallet() : buyPPTT();
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
