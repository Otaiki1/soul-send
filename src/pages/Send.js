import { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import styles from "./Send.module.css";
import AuthContext from "../context/auth-context";
import emailjs from "../utils/emailJsConfig";

const Send = () => {
  const ctx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   const sendTx = await ctx.sendCrypto(address, amount);
  //   if (sendTx) {
  //     console.log("sent to escrow");
  //     alert("Payment successful , note the payment id is ", sendTx);
  //     emailjs
  //       .send("service_psyg6bc", "template_gc65ykh", {
  //         to_email: email,
  //         from_name: "safe-send",
  //         message: `You have received ${amount} matic in your safe-send wallet from ${ctx.account},
  //          Head over to safe-send dapp to claim it, the payment Id is ${sendTx}, input this to claim`,
  //       })
  //       .then((response) => {
  //         console.log("Email sent successfully!", response);
  //       })
  //       .catch((error) => {
  //         console.error("Error sending email:", error);
  //       });
  //   } else {
  //     console.log("failed");
  //   }
  //   console.log(email);
  // };
  return (
    <>
      <Navbar active={2} />
      <form className={styles.sendForm} onSubmit={submitHandler}>
        <Card cardHeader="Send Crypto" otherClass={styles.moveLeft}>
          <Input
            label="Soul Name"
            input={{ id: "soulName" }}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            isBlue
          />
        </Card>
        <Card cardHeader="Transaction" otherClass={styles.move}>
          <Input
            label="Amount"
            input={{ id: "amount", type: "text" }}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            isBlue
          />
        </Card>
        <Card cardHeader="Notification time" otherClass={styles.move}>
          <Input
            label="Timing"
            input={{ id: "timing", type: "number" }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            isBlue
          />
        </Card>

        <div className={styles.sendBtnWrapper}>
          <button className={styles.sendBtn}>Send</button>
        </div>
      </form>
    </>
  );
};

export default Send;
