import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./nftcard.scss";

export default function NFTCard({data}) {
  const appContext = useContext(AppContext);
  const {appstate, setAppstate} = appContext;
  const balance = (data?.maxTokenSupply - data?.currentTokenSupply) || 0;

  const mintHandler = () => {
    // clear
    // mint the nft
  }

  return (
    <div className="nftcard">
      <div className="image">
        <img alt="" src={default_img} />
      </div>
      <div className="body">
        <span className="title">NFT Name</span>
        <span className="sub-label">0 of 200 left</span>
        {balance > 0 && <button className="btn-theme" onClick={mintHandler}>Mint</button>}
        {balance <= 0 && <button className="btn-disabled">SOLD</button>}
      </div>
    </div>
  );
}

export const default_img =
  "https://ipfs.io/ipfs/Qmf1RtLzVqgddNTL5JPSZeEDvfQqz6YzAtXEncwmpCKXEQ";
