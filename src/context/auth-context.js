import React, { useState, useCallback } from "react";
import { ethers } from "ethers";

import { useMasa } from "@masa-finance/masa-react";
import { masa, createSoulNameHandler, hasSoulName } from "../utils/masa";
import { switchChain } from "../utils/wallet";

const AuthContext = React.createContext({
  isConnected: false,
  account: "",
  connectWallet: () => {},

  mintSoulName: (name, address) => {},
  soulName: "",
});

export const AuthContextProvider = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [soulname, setSoulName] = useState("");

  const {
    connect,
    walletAddress,
    openMintSoulnameModal,
    currentNetwork,
    isModalOpen,
  } = useMasa();

  const connectionHandler = useCallback(() => {
    connect();
  }, [connect]);

  async function connectWallet() {
    //Connect to Metamask
    if (window.ethereum) {
      try {
        // Request account access
        await switchChain();
        connectionHandler();
        const cN = await currentNetwork;
        console.log("Your current Network is ", cN);
        const accounts = walletAddress;
        const hasSn = await hasSoulName(walletAddress);
        if (hasSn.length > 0) {
          setSoulName(hasSn[0].tokenDetails[0]);

          console.log("has soulname ??", hasSn[0].tokenDetails[0]);
        }

        // console.log("has soulname ??", hasSn[0].tokenDetails[0]);

        if (accounts != "") {
          console.log("Connected to wallet!", accounts);
          setAccount(accounts);
          setIsConnected(true);
          return true;
        } else {
          console.log("Not connected");
          return false;
        }
      } catch (error) {
        console.log("Failed to connect to wallet:", error);
        return false;
      }
    }
    return false;
  }
  const connectWalletHandler = async () => {
    try {
      await connectWallet();
    } catch (err) {
      console.log(err);
    }
  };

  const mintSoulName = async () => {
    if (soulname == "") {
      try {
        openMintSoulnameModal();
      } catch (err) {
        console.log("ERROR IS ____", err);
      }
    }

    if (!isModalOpen) {
      const hasSn = await hasSoulName(walletAddress);
      if (hasSn.length > 0) {
        setSoulName(hasSn[0].tokenDetails[0]);

        console.log("has soulname ??", hasSn[0].tokenDetails[0]);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isConnected: isConnected,
        account: account,
        connectWallet: connectWalletHandler,
        mintSoulName: mintSoulName,
        soulName: soulname,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
