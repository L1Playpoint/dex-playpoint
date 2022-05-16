import { Button } from "@mui/material";
import React from "react";
import "./styles/style.css";
import { useDataLayer } from "../../Context/DataLayer";
import { ConnectWallet } from "../../Utils/ConnectWallet";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import ContractABI from "../../Helpers/ContractABI.json";

export default function Swap({ isLoading }) {
  // eslint-disable-next-line
  const [
    { isWalletConnected, avaxMarketPrice, contract, signer, balance },
    dispatch,
  ] = useDataLayer();

  const [swapAmount, setSwapAmount] = React.useState({
    from: 0,
    to: 0,
  });

  const handleConnectWallet = () => {
    if (!isWalletConnected) {
      ConnectWallet(dispatch);
      toast.success("Wallet Connected!");
    }
  };

  const handleAmountChange = (e) => {
    const dollarValue = e.target.value * avaxMarketPrice;

    setSwapAmount({
      from: e.target.value,
      to: (dollarValue * 66).toFixed(2),
    });
  };

  const handleSwap = async () => {
    const dollarValue = swapAmount.from * avaxMarketPrice;

    if (swapAmount.from >= 3 && balance >= swapAmount.from) {
      try {
        const contract = new ethers.Contract(
          "0xa19d8B0c5039aA15969a76124993e1369dc54D1B",
          ContractABI,
          signer
      );

        const signedSigner = contract.connect(signer);

        await signedSigner.invest(
          ethers.utils.parseUnits(swapAmount.from, 18),
          ethers.utils.parseUnits((dollarValue * 66).toFixed(2), 18),
          {
            value: ethers.utils.parseUnits(swapAmount.from, 18),
          }
        );

        toast.success("Check Explorer for successful confirmation!");
        setSwapAmount({
          from: 0,
          to: 0,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Minimum sale amount is 3 AVAX");
    }
  };

  return (
    <div className="swap__container">
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
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
              <input
                type="text"
                placeholder="0"
                value={swapAmount.from}
                onChange={(e) => handleAmountChange(e)}
              />
              <Button>
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/avalanche-avax.png"
                  alt=""
                />{" "}
                {/* <span>AVAX</span> <i className="ri-arrow-down-s-line"></i> */}
                <span>AVAX</span>
              </Button>
            </div>
            <div className="price">
              <span>Market Price: ${avaxMarketPrice}</span>
              <span>Balance: {balance.toFixed(2)}</span>
            </div>
          </div>

          <div className="down__container">
            <i className="ri-arrow-up-down-line"></i>
          </div>

          <div className="form__container">
            <div className="to">
              <input
                disabled
                type="text"
                placeholder="0"
                value={swapAmount.to}
              />
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
              <Button onClick={handleSwap}>
                Proceed <i className="ri-arrow-right-line"></i>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
