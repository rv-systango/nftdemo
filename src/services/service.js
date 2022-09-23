import env from "../environment";
import contractABI from "../asstes/json/contractABI.json";
import { ethers } from "ethers";

export default class service {
  static async connectWallet(callback) {
    if (typeof window.ethereum === "undefined")
      return "Please install metamask.";
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        callback((s) => ({
          ...s,
          connected: !s.connected,
          connectedAddress: accounts[0],
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static async connectContract(callback) {
    const address = env.testnet.contract_address;
    const abi = contractABI.abi;
    let provider = new ethers.providers.JsonRpcProvider(
      env.testnet.infura_address
    );
    const contract = new ethers.Contract(address, abi, provider);
    if (!contract) return;
    callback((s) => ({ ...s, contract: contract, provider: provider }));
    return contract;
  }

  static async updateContract(callback) {
    if (!window.ethereum) return;
    const address = env.testnet.contract_address;
    const abi = contractABI.abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    const contract = new ethers.Contract(address, abi, provider.getSigner());
    if (!contract) return;
    callback((s) => ({ ...s, contract: contract, provider: provider }));
  }

  static async retrieveNFTs(contract, callback) {
    return new Promise(async (resolved) => {
      contract
        .retrieveNFTs(1, 5, true)
        .then(async (result) => {
          const data = JSON.parse(result[0]);
          const nftsList = [];
          for (let i = 0; i < data.length; i++) {
            const tokenDetails = await (await fetch(data[i].tokenUri)).json();
            nftsList.push({ ...tokenDetails, ...data[i] });
          }
          resolved(nftsList);
        })
        .catch((err) => {
          console.log(err);
          resolved([]);
        });
    });
  }

  static async mintNFT(contract, provider, index, address, callback) {
    try {
      contract
        .mintNFT(index, address)
        .then((response) => {
          console.log(response);
          callback(true);
          const interval = setInterval(async () => {
            provider.getTransactionReceipt(response?.hash || "").then((res) => {
              if (res) {
                callback(false);
                alert("NFT minted successfully.");
                clearInterval(interval);
              }
            });
          }, 4000);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  static async isPreviouslyMinted(contract, index, address, callback) {
    callback(true);
    return new Promise(async (resolved) => {
      contract
        .isPreviouslyMintedFrom(index, address)
        .then((res) => {
          callback(false);
          resolved(res);
        })
        .catch((err) => {
          console.log(err);
          resolved(false);
        });
    });
  }
}
