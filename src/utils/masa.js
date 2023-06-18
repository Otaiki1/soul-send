import {
  Masa,
  createSoulName,
  checkLogin,
  login,
  createIdentity,
  loadIdentity,
  listSoulNames,
  loadSoulnameByName,
} from "@masa-finance/masa-sdk";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
console.log("SIGNER IS _________", signer);

export const masa = new Masa({
  signer,
  environment: "production",
  networkName: "alfajores",
});
export async function hasSoulName(address) {
  try {
    const hasIdentity = await listSoulNames(masa, address);
    return hasIdentity;
  } catch (e) {
    console.log("errro is ", e);
    return false;
  }
}
export async function fetchSoulNameDetails(soulname) {
  try {
    const hasIdentity = await loadSoulnameByName(masa, soulname);
    return hasIdentity;
  } catch (e) {
    console.log("errro is ", e);
    return false;
  }
  return false;
}
export async function createSoulNameHandler(name, address) {
  try {
    const isLogIn = await checkLogin(masa);
    // console.log("ISLOGGEDIN____", isLogIn);
    if (!isLogIn) {
      const LOGIN = await login(masa);
      console.log("loggedIn user, _____", LOGIN);
    }
    const hasIdentity = await loadIdentity(masa, address);
    if (!hasIdentity) {
      const identity = await createIdentity(masa);
      console.log("Your identity is ___", identity);
    } else {
      console.log("Your identity is ___", hasIdentity);
    }
    const hasSoulName = await listSoulNames(masa, address);
    if (hasSoulName.length > 0) {
      console.log(hasSoulName);
    } else {
      // const response = await createSoulName(masa, "CELO", name, 200, address);
      const response = await masa.soulName.create("CELO", name, 200, address);
      console.log(response);
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}
