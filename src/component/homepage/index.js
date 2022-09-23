import { CircularProgress } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import service from "../../services/service";
import NFTCard from "../nftcard";
import "./home.scss";

export default function Homepage() {
  const appContext = useContext(AppContext);
  const { appstate, setAppstate } = appContext;
  const btnClass = `btn-toggle ${appstate.connected ? "active" : ""}`;
  const btnText = appstate.connected ? "Connected" : "Disconnected";
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(init, []);
  useEffect(retrieveNFTS, [appstate?.contract]);
  useEffect(updateContract, [appstate.connected]);

  function init() {
    // clear
    // retrieve nfts by using smart contract
    service.connectContract(setAppstate);
  }

  function retrieveNFTS(contract) {
    // clear
    // retrieve nfts by using contract.retrieveNFTs();
    if(!appstate.contract) return;
    service.retrieveNFTs(appstate.contract).then((res) => {
      setNfts(res);
      setLoading(false);
    });
  }

  const connectionHandler = async () => {
    // clear
    // connect to metamask
    // setAppstate((s) => ({...s, connected : !appstate.connected}));
    service.connectWallet(setAppstate);
  };

  function updateContract(){
    if(!appstate.connected) return;
    service.updateContract(setAppstate);
  }

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
        <div className="sec section1">{loading ? <CircularProgress color="secondary" /> : nfts.map(generateNFTCards)}</div>
      </div>
    </div>
  );
}
