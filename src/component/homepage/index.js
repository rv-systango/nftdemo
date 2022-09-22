import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import env from "../../environment";
import NFTCard from "../nftcard";
import "./home.scss";
import contractABI from "../../asstes/json/contractABI.json";

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
    const contractAddress = env.testnet.contract_address;
    const ABI = contractABI.abi;
    let provider = new ethers.providers.JsonRpcProvider(
      env.testnet.infura_address
    );
    if (typeof window.ethereum !== "undefined")
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const contract = new ethers.Contract(contractAddress, ABI, provider);
    if (!contract) return;
    setAppstate((s) => ({ ...s, contract }));
    retrieveNFTS(contract);
  }

  async function retrieveNFTS(contract) {
    // clear
    const data = await contract.retrieveNFTs(1, 5, true);
    if (!data) return;
    const nftsList = [];
    const fetchedNFTs = JSON.parse(data[0]);
    for (let i = 0; i < fetchedNFTs.length; i++) {
      const nftInfo = await (await fetch(fetchedNFTs[i].tokenUri)).json();
      const imageUri = "https://ipfs.io/ipfs/" + nftInfo.image.split("://")[1];
      const newItem = { ...fetchedNFTs[i], imageUri, ...nftInfo };
      nftsList.push(newItem);
    }
    setNfts(nftsList);
  }

  const connectionHandler = async () => {
    // clear
    // connect to metamask
    if (typeof window.ethereum === "undefined")
      return alert("Please install metamask.");
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) =>
        setAppstate((s) => ({
          ...s,
          connected: !appstate.connected,
          connectedAddress: accounts[0],
        }))
      )
      .catch((err) => console.log(err.message));
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
