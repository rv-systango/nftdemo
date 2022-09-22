import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./nftcard.scss";

export default function NFTCard({data}) {
  const appContext = useContext(AppContext);
  const {appstate, setAppstate} = appContext;
  const balance = data?.maxTokenSupply - data?.currentTokenSupply;
  console.log(appstate);
  const mintHandler = () => {
    console.log(appstate);
  }

  return (
    <div className="nftcard">
      <div className="image">
        <img alt="" src={data?.imageUri || default_img} />
      </div>
      <div className="body">
        <span className="title">{data?.name}</span>
        <span className="sub-label">{balance} of {data?.maxTokenSupply} left</span>
        {balance > 0 && <button className="btn-theme" onClick={mintHandler}>Mint</button>}
        {balance <= 0 && <button className="btn-disabled" onClick={mintHandler}>SOLD</button>}
      </div>
    </div>
  );
}

export const default_img =
  "https://ipfs.io/ipfs/Qmf1RtLzVqgddNTL5JPSZeEDvfQqz6YzAtXEncwmpCKXEQ";
