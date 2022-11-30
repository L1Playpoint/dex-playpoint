import { Button } from "@mui/material";
import React from "react";
import "./styles/style.css";

export default function App() {
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
          <Button><i className="ri-upload-2-line"></i>List PPTT to Wallet</Button>
          <Button><img src="https://ik.imagekit.io/domsan/Screenshot_2022-12-01_at_04.00.00-removebg-preview_BHJK2CP_K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1669846541695" loading="lazy" alt="" /> Arbitrum</Button>
          <Button className="walletBtn__container"><i className="ri-lock-line"></i> Connect</Button>
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
          <input type="text" placeholder="Enter USDT amount..." />
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
          <input type="text" placeholder="Enter PPTT amount..." />
          <div className="swapInput__select">
            <img
              src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        <Button className="exchangeBtn__container">Exchange</Button>
      </div>

      <div className="footer__container">
        Copyright &copy; 2023 PPTT. All rights reserved.<br/>
        Proudly powered by <a href="">The Boring School</a> & Supported by <a href="">CodewithSudeep</a>.
      </div>
    </div>
  );
}
