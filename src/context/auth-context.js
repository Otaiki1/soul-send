import React, { useState, useCallback } from "react";
import { ethers } from "ethers";

import { useMasa } from "@masa-finance/masa-react";
import { masa, createSoulNameHandler } from "../utils/masa";
import { switchChain } from "../utils/wallet";

const AuthContext = React.createContext({
  isConnected: false,
  account: "",
  connectWallet: () => {},

  mintSoulName: (name, address) => {},
});

export const AuthContextProvider = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");

  const { connect, walletAddress, openMintSoulnameModal, currentNetwork } =
    useMasa();

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
        console.log("Your current Network is ", currentNetwork);
        const accounts = walletAddress;
        openMintSoulnameModal();

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

  const mintSoulName = async (name, address) => {
    try {
      const doneStuff = await createSoulNameHandler(name, address);
      console.log("YOU HAVE DONE STUFF _____", doneStuff);
    } catch (err) {
      console.log("ERROR IS ____", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isConnected: isConnected,
        account: account,
        connectWallet: connectWalletHandler,
        // mintSoulName: mintSoulName,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
