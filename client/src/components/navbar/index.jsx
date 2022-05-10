import React from "react";
import "./styles/style.css";
import Button from "@mui/material/Button";

import { useDataLayerValue } from "../../contexts/DataLayer";

export default function Navbar() {
  const [{userPublicAddress}, dispatch] = useDataLayerValue();
  // dispatch({
  //   type: "SET_ACTIVE_HOMEMAIN_PAGE",
  //   payload: {
  //     active_page: e,
  //   },
  // });

  return (
    <div className="navbar__container">
      <img src="https://ik.imagekit.io/lexworld/Logo.png" alt="Playpoint.ai" />

      <div className="utilities">
        <Button onClick={() => {
          dispatch({
            type: "DISCONNECT_WALLET",
          });
        }} className="network">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/avalanche-avax.png"
            alt=""
          />
          <span>Avalanche</span>
          <span>
            <i className="ri-arrow-down-s-line"></i>
          </span>
        </Button>

        {/* {
          userPublicAddress !== "" ? (
            <Button className="network" onClick={connectWallet}>
              <img

                src="https://ik.imagekit.io/lexworld/Logo.png"
                alt=""
              />
              <span>Disconnect</span>
              <span>
                <i className="ri-arrow-down-s-line"></i>
              </span>
            </Button>
          ) : (
            <Button className="network" onClick={connectWallet}>
              <img

                src="https://ik.imagekit.io/lexworld/Logo.png"
                alt=""
              />
              <span>Connect</span>
              <span>
                <i className="ri-arrow-down-s-line"></i>
              </span>
            </Button>
          )
        } */}
        <Button className="downIcon">
          <i className="ri-menu-3-line"></i>
        </Button>
      </div>
    </div>
  );
}
