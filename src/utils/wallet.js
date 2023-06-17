import { ethers } from "ethers";
import { ChainsConfig } from "./constants";

export async function connectWalletToSite() {
  try {
    if (window.ethereum) {
      window.ethereum.enable();
      window.ethersProvider = new ethers.providers.JsonRpcProvider(
        window.ethereum
      );
      return true;
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
      return false;
    }
  } catch (e) {
    if (e.code === 4001) {
      alert(e.message);
    }
    return false;
  }
}

export async function switchChain() {
  const config = { ...ChainsConfig["CELO_TESTNET"] };

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${config.chainId.toString(16)}` }],
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [config],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
  }
}

