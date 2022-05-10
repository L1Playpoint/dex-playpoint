import { Button } from "@mui/material";
import React from "react";
import "./styles/style.css";

export default function Swap() {
  return (
    <div className="swap__container">
      <div className="title">
        <div>
          <Button>
            History <i className="ri-history-line"></i>
          </Button>
        </div>
        <div>Playpoint Swap</div>
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
            <span>$3968</span>
            <span>Balance: 0</span>
        </div>
      </div>

      <div className="down__container">
        <i className="ri-arrow-up-down-line"></i>
      </div>

      <div className="form__container">
        <div className="to">
          <input disabled type="text" placeholder="0" />
          <Button disabled>
            <img
              src="https://ik.imagekit.io/lexworld/Logo.png"
              alt=""
            />{" "}
            <span>PPTT</span> 
            {/* <i className="ri-arrow-down-s-line"></i> */}
          </Button>
        </div>
        <div className="price">
            <span>$3968</span>
            <span>Balance: 0</span>
        </div>
      </div>

      <div className="swapButton">
          <Button>
            {/* Proceed <i className="ri-arrow-right-line"></i> */}
              Connect Wallet
          </Button>
      </div>
    </div>
  );
}