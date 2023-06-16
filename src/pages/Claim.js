import { useContext, useState } from "react";
import { ethers } from "ethers";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import styles from "./Claim.module.css";
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
  // const ctx = useContext(AuthContext);
  // const [paymentId, setPaymentId] = useState("");
  // const [payObject, setPayObject] = useState({ isOn: false });

  // const inputHandler = async (_payId) => {
  //   setPaymentId(_payId);
  //   const paymentDetails = await ctx.fetchPaymentDetails(_payId);
  //   const _payObject = {
  //     amount: ethers.utils.parseEther(paymentDetails[1]),
  //     fromAddress: paymentDetails[2],
  //     toAddress: paymentDetails[3],
  //     timestamp: paymentDetails[4],
  //     isCancelled: paymentDetails[5],
  //   };
  //   setPayObject({ ..._payObject, isOn: true });
  // };
  return (
    <>
      <Navbar active={3} address="0X7575788..." notifAmount={3} />
      <div className={styles.notifications}>
        <Card cardHeader="Fetch Payment ">
          <Input
            label="Payment Id"
            input={{
              id: "paymentId",
              type: "number",
              placeholder: "Input the payment id",
            }}
            onChange={(e) => inputHandler(e.target.value)}
            isBlue
          />
        </Card>
        {/* {payObject.isOn && (
          <Card cardHeader="Notification">
            <p className={styles.youHaveReceived}>
              {`${payObject.fromAddress} has sent ${payObject.amount} to ${
                payObject.toAddress
              }, It was sent on ${convertTimestamp(payObject.timestamp)}`}
            </p>
            <div className={styles.btnGroup}>
              <Button btnText="Claim" />
              <Button btnText="Reject" isDark={true} />
            </div>
          </Card>
        )} */}
      </div>
    </>
  );
};

export default Claim;
