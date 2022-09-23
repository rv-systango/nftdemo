import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import service from "../../services/service";
import "./nftcard.scss";

export default function NFTCard({ data }) {
  const appContext = useContext(AppContext);
  const { appstate, setAppstate } = appContext;
  const balance = data?.maxTokenSupply - data?.currentTokenSupply || 0;
  const [mintProcessing, setMintProcessing] = useState(false);
  const [isPrevMinted, setIsPrevMinted] = useState(false);

  useEffect(checkMinted, [appstate.connected]);

  function checkMinted() {
    if (!appstate.contract) return;
    if (typeof window.ethereum === "undefined") return;
    if (!appstate.connected) {
      setIsPrevMinted(false);
      return;
    }
    service
      .isPreviouslyMinted(
        appstate.contract,
        data?.id,
        appstate.connectedAddress,
        setMintProcessing
      )
      .then((res) => {
        setIsPrevMinted(res);
      });
  }

  const mintHandler = () => {
    // clear
    // mint the nft
    if (mintProcessing) return;
    if (isPrevMinted) return;
    if (!appstate.contract) return;
    if (typeof window.ethereum === "undefined")
      return alert("Please install metamask.");
    if (!appstate.connected) return alert("Please connect to metamask.");
    service.mintNFT(
      appstate.contract,
      appstate.provider,
      data?.id,
      appstate.connectedAddress,
      setMintProcessing
    );
  };

  return (
    <div className="nftcard">
      <div className="image">
        <img alt="" src={default_img} />
      </div>
      <div className="body">
        <span className="title">{data?.name || "NFT Name"}</span>
        <span className="sub-label">
          {balance} of {data?.maxTokenSupply} left
        </span>
        {balance > 0 && (
          <button className={`${isPrevMinted ? "btn-disabled" : "btn-theme"}`} onClick={mintHandler}>
            {mintProcessing ? (
              <CircularProgress size={10} color="warning" />
            ) : isPrevMinted ? (
              "Minted"
            ) : (
              "Mint"
            )}
          </button>
        )}
        {balance <= 0 && <button className="btn-disabled">SOLD</button>}
      </div>
    </div>
  );
}

export const default_img =
  "https://ipfs.io/ipfs/Qmf1RtLzVqgddNTL5JPSZeEDvfQqz6YzAtXEncwmpCKXEQ";
