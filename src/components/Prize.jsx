import React from "react";
import Scroll from "./Scroll";
import { svg_d } from "./handlers/svg.js";

const Prize = () => {
  const svg_default = (path) => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
        {path}
      </svg>
    );
  };
  const svgBank = (name, color, type = "solid") => {
    if (type === "solid") {
      return svg_default(<path fill={color} d={svg_d[name]} />);
    } else if (type === "outline") {
      return svg_default(
        <path fill="none" stroke={color} strokeWidth="2" d={svg_d[name]} />
      );
    } else {
      return null;
    }
  };

  return (
    <Scroll className="centered-flex content-section" id="prizes">
      <div className="prize-sub-cnt-left centered-flex">
        <div className="grand-prize centered-flex">
          <h1 className="prize-pool-text">
            {svgBank("crown", "#FFB300")}
            {svgBank("crown", "#FFB300")}
            {svgBank("crown", "#FFB300")}
            <br />A Prize Pool Of:
          </h1>
          <span className="prize-pool-amount">
            Rs. <br /> 50,000!
          </span>
        </div>
      </div>
      <div className="prize-sub-cnt-right centered-flex">
        <div className="centered-flex prize-merch-cnt">
          <div className="centered-flex podium-cnt scroll">
            <div className="podium-block centered-flex scroll s00">
              <div className="circle circle-silver centered-flex">
                {svgBank("trophy", "#C0C0C0")}
              </div>
              <div className="podium podium-silver centered-flex">
                <span className="position">
                  {svgBank("medal", "#ffffff", "solid")}
                  {svgBank("medal", "#ffffff", "solid")}
                </span>
                <br />
                <span className="money"> Rs. 15,000</span>
              </div>
            </div>
            <div className="podium-block centered-flex scroll s01">
              <div className="circle circle-gold centered-flex">
                {svgBank("trophy", "#FFD700")}
              </div>
              <div className="podium podium-gold centered-flex">
                <span className="position">
                  {svgBank("medal", "#ffffff", "solid")}
                  {svgBank("medal", "#ffffff", "solid")}
                  {svgBank("medal", "#ffffff", "solid")}
                </span>
                <br />
                <span className="money"> Rs. 15,000</span>
              </div>
            </div>
            <div className="podium-block centered-flex scroll s02">
              <div className="circle circle-bronze centered-flex">
                {svgBank("trophy", "#B87333")}
              </div>
              <div className="podium podium-bronze centered-flex">
                <span className="position">
                  {svgBank("medal", "#ffffff", "solid")}
                </span>
                <br />
                <span className="money"> Rs. 15,000</span>
              </div>
            </div>
          </div>
          <div className="merch-carousel"></div>
        </div>
        <div className="swags centered-flex">
          {svgBank("gifts", "#FFB703")}
          <span className="centered-flex merch-text">
            <span>Stickers, Merchandise</span>
            <span>& Freebies For Everyone!</span>
          </span>
        </div>
      </div>
    </Scroll>
  );
};

export default Prize;
