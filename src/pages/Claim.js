import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import styles from "./Claim.module.css";
import AuthContext from "../context/auth-context";
// import AuthContext from "../context/auth-context";

function convertTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return `${formattedDate} ${formattedTime}`;
}

const Claim = () => {
  const ctx = useContext(AuthContext);

  const [paymentId, setPaymentId] = useState("");
  const [payObject, setPayObject] = useState([]);
  const [claimIds, setClaimIds] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);

  const {
    isConnected,
    fetchPaymentClaims,
    toBeClaimedList,
    fetchPaymentDetails,
    claimCrypto,
  } = ctx;

  const inputHandler = async (_payId) => {
    convertClaims(_payId);
  };
  const inputChanged = (val) => {
    inputHandler(val);
  };

  const convertClaims = async (id) => {
    const paymentDetail = await fetchPaymentDetails(id);
    const _payObject = {
      id: paymentDetail[0].toNumber(),
      amount: ethers.utils.formatEther(paymentDetail[1].toString()),
      receiverAddress: paymentDetail[2],
      senderAddress: paymentDetail[3],
      timestamp: paymentDetail[4].toNumber(),
      isCancelled: paymentDetail[5],
    };
    console.log("payment deettaailsss", paymentDetail);

    setPayObject({ ..._payObject, isOn: true });
  };

  const claimTxn = async (id) => {
    await claimCrypto(id);
    console.log("YOU HAVE SUCCESSFULLY BEEN PAID");
  };
  useEffect(() => {
    if (isConnected) {
      fetchPaymentClaims();
      let tempArr = toBeClaimedList.map((item) => item.toNumber());
      console.log("temp Arr is ", tempArr);
      setClaimIds(tempArr);
    }
  }, [isConnected]);
  return (
    <>
      <Navbar
        active={3}
        notifAmount={
          ctx.toBeClaimedList.length ? ctx.toBeClaimedList.length : ""
        }
      />
      {claimIds.length > 0 && (
        <div>
          <p>YOU have access to the following paymentIds</p>
          <ul>
            {claimIds.map((id) => (
              <li> {id}</li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.notifications}>
        <Card cardHeader="Fetch Payment ">
          <Input
            label="Payment Id"
            input={{
              id: "paymentId",
              type: "number",
              placeholder: "Input the payment id",
            }}
            onChange={(e) => inputChanged(e.target.value)}
            isBlue
          />
        </Card>
        {payObject.isOn && (
          <Card cardHeader="Notification">
            <p className={styles.youHaveReceived}>
              {`${payObject.senderAddress} has sent ${
                payObject.amount
              } CELO to ${
                payObject.receiverAddress
              }, It was sent on ${convertTimestamp(payObject.timestamp)}`}
            </p>
            <div className={styles.btnGroup}>
              <Button
                btnText="Claim"
                clickHandler={() => {
                  claimTxn(payObject.id);
                }}
              />
              <Button btnText="Reject" isDark={true} />
            </div>
          </Card>
        )}
        {/* {payDetailsObj.map((payObject) => (
          <Card cardHeader="Notification">
            <p className={styles.youHaveReceived}>
              {`${payItem.senderAddress} has sent ${payItem.amount} to ${
                payItem.receiverAddress
              }, It was sent on ${convertTimestamp(payItem.timestamp)}`}
            </p>
            <div className={styles.btnGroup}>
              <Button btnText="Claim" />
              <Button btnText="Reject" isDark={true} />
            </div>
          </Card>
        ))} */}
      </div>
    </>
  );
};

export default Claim;
