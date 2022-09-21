import React from "react";
import "./nftcard.scss";

export default function NFTCard({data}) {
  return (
    <div className="nftcard">
      <div className="image">
        <img alt="" src={default_img} />
      </div>
      <div className="body">
        <span className="title">Holy Cow {data}</span>
        <span className="sub-label">Holy Cow</span>
        <button className="btn-theme">Mint</button>
      </div>
    </div>
  );
}

export const default_img =
  "https://ipfs.io/ipfs/Qmf1RtLzVqgddNTL5JPSZeEDvfQqz6YzAtXEncwmpCKXEQ";
