import React, { useState, useCallback } from "react";
import { ethers } from "ethers";

import abi from "../utils/escrow.abi.json";
import { CONTRACT_ADDRESS } from "../utils/constants";

import { useMasa } from "@masa-finance/masa-react";
import { masa, createSoulNameHandler, hasSoulName } from "../utils/masa";
import { switchChain } from "../utils/wallet";

const AuthContext = React.createContext({
  isConnected: false,
  account: "",
  connectWallet: () => {},

  mintSoulName: (name, address) => {},
  soulName: "",

  sendCrypto: (address, amount) => {},
  claimCrypto: (paymentId) => {},
  toBeClaimedList: [],
  sendList: [],

  fetchPaymentClaims: () => {},
  fetchUserSends: () => {},
  fetchPaymentDetails: (paymentId) => {},
});

export const AuthContextProvider = (props) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [soulname, setSoulName] = useState("");
  const [claimTxnArr, setClaimTxnArr] = useState([]);
  const [sendArr, setSendArr] = useState([]);

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

  async function sendCrypto(address, amount) {
    if (account && soulname && isConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("SIGNER IS _________", signer);
        const escrow = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("sending token... ");
        const sendTxn = await escrow.createPayment(address, {
          value: ethers.utils.parseEther(amount),
        });

        console.log("Transaction sent! Waiting for confirmation...", sendTxn);

        const receipt = await sendTxn.wait();

        console.log("Transaction confirmed! Transaction hash:", sendTxn.hash);

        console.log("Listening to events...", receipt);
        let paymentId;
        const paymentCreatedEvents = receipt.events.filter(
          (event) => event.event === "PaymentCreated"
        );

        if (paymentCreatedEvents.length > 0) {
          console.log("PaymentCreated event emitted!");
          console.log("Event details:", paymentCreatedEvents[0].args);
          paymentId = paymentCreatedEvents[0].args;
        }

        return paymentId.toString();
      } catch (err) {
        console.log("errror is ___", err);
      }
    } else {
      console.log("NOT CONNECTED ");
    }
  }

  async function claimCrypto(paymentId) {
    if (account && soulname && isConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("SIGNER IS _________", signer);
        const escrow = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("claiming payment id... ");
        const sendTxn = await escrow.releasePayment(paymentId);

        console.log("Transaction sent! Waiting for confirmation...", sendTxn);

        const receipt = await sendTxn.wait();

        console.log("Transaction confirmed! Transaction hash:", sendTxn.hash);
      } catch (err) {
        console.log("errror is ___", err);
      }
    } else {
      console.log("NOT CONNECTED ");
    }
  }
  async function fetchPaymentClaims() {
    if (account && soulname && isConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("SIGNER IS _________", signer);
        const escrow = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("fetching payment details ");
        const fetchTxn = await escrow.fetchReceiverIds();

        console.log("fetched payment details__--", fetchTxn);
        setClaimTxnArr(fetchTxn);
      } catch (err) {
        console.log("error is ", err);
      }
    } else {
      alert("Kindly Connect wallet");
    }
  }
  async function fetchUserSends() {
    if (account && soulname && isConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("SIGNER IS _________", signer);
        const escrow = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("fetching payment details ");
        const fetchTxn = await escrow.fetchSenderIds();

        console.log("fetched payment details__--", fetchTxn);
        setSendArr(fetchTxn);
      } catch (err) {
        console.log("error is ", err);
      }
    } else {
      alert("Kindly Connect wallet");
    }
  }
  async function fetchPaymentDetails(_payId) {
    if (account && soulname && isConnected) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log("SIGNER IS _________", signer);
        const escrow = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

        console.log("fetching payment details ");
        const fetchTxn = await escrow.getPayment(_payId);

        console.log("fetched payment details__--", fetchTxn);
        return fetchTxn;
      } catch (err) {
        console.log("error is ", err);
      }
    } else {
      alert("Kindly Connect wallet");
    }
  }
  return (
    <AuthContext.Provider
      value={{
        isConnected: isConnected,
        account: account,
        connectWallet: connectWalletHandler,
        mintSoulName: mintSoulName,
        soulName: soulname,
        sendCrypto: sendCrypto,
        claimCrypto: claimCrypto,
        toBeClaimedList: claimTxnArr,
        sendList: sendArr,
        fetchPaymentClaims: fetchPaymentClaims,
        fetchPaymentDetails: fetchPaymentDetails,
        fetchUserSends: fetchUserSends,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
