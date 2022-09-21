import React from "react";
import NFTCard from "../nftcard";
import "./home.scss";

export default function Homepage() {
  const headerContent = (
    <>
      <span className="title">NFT Demo</span>
      <button className="btn-toggle">Disconnected</button>
    </>
  );

  return (
    <div className="homepage_container">
      <div className="header">{headerContent}</div>
      <div className="page-layout">
        <div className="sec section1">
          {[1, 2, 3, 4].map((item, i) => {
            return (
              <div key={`nft-item-${i}`}>
                <NFTCard data={item} />
              </div>
            );
          })}
        </div>
        {/* <div className="sec section2">Not found..</div> */}
      </div>
    </div>
  );
}
