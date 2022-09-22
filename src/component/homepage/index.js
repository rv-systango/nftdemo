import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import NFTCard from "../nftcard";
import "./home.scss";

export default function Homepage() {
  const appContext = useContext(AppContext);
  const { appstate, setAppstate } = appContext;
  const btnClass = `btn-toggle ${appstate.connected ? "active" : ""}`;
  const btnText = appstate.connected ? "Connected" : "Disconnected";
  const [nfts, setNfts] = useState([]);

  useEffect(init, []);

  function init() {
    // clear
    // retrieve nfts by using smart contract
  }

  async function retrieveNFTS(contract) {
    // clear
    // retrieve nfts by using contract.retrieveNFTs();
  }

  const connectionHandler = async () => {
    // clear
    // connect to metamask
  };

  const connectedText = (
    <div className="sub-title">
      {appstate.connected && `Connected to : ${appstate.connectedAddress}`}
    </div>
  );

  const headerContent = (
    <>
      <span className="title">NFT Demo {connectedText}</span>
      <button className={btnClass} onClick={connectionHandler}>
        {btnText}
      </button>
    </>
  );

  const generateNFTCards = (item, index) => {
    return (
      <div key={`nft-item-${index}`}>
        <NFTCard data={item} />
      </div>
    );
  };

  return (
    <div className="homepage_container">
      <div className="header">{headerContent}</div>
      <div className="page-layout">
        <div className="sec section1">{nfts.map(generateNFTCards)}</div>
      </div>
    </div>
  );
}
