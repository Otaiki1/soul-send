import { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import styles from "./Send.module.css";
import AuthContext from "../context/auth-context";
import { fetchSoulNameDetails } from "../utils/masa";
import TxnInfoCard from "../components/TxnInfoCard";

const Send = () => {
  const ctx = useContext(AuthContext);
  const [showSentModal, setShowSentModal] = useState(false);
  const [email, setEmail] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [inputGood, setInputGood] = useState(true);

  const checkValue = async (value) => {
    let stripped = value.split(".")[0];
    const soulnameDetails = await fetchSoulNameDetails(stripped);
    if (soulnameDetails) {
      setReceiverAddress(soulnameDetails.owner);
      setInputGood(true);
    } else {
      setInputGood(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const sendTx = await ctx.sendCrypto(receiverAddress, amount);
      setPaymentId(sendTx);
      if (sendTx) {
        setShowSentModal(true);
        setEmail("");
        setAmount("");
      }
    } catch (err) {
      console.log(err);
    }

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
  };

  const closeModal = () => {
    setShowSentModal(false);
  };
  return (
    <>
      <Navbar active={2} />
      {showSentModal && (
        <TxnInfoCard
          headline={`You have successfully created payment of ${amount}`}
          txnId={paymentId}
          sender={ctx.account}
          receiver={receiverAddress}
          onClose={closeModal}
        />
      )}
      <form className={styles.sendForm} onSubmit={submitHandler}>
        <Card cardHeader="Send Crypto" otherClass={styles.moveLeft}>
          <Input
            label="Soul Name"
            input={{ id: "soulName" }}
            onChange={(e) => {
              checkValue(e.target.value);
            }}
            isBlue={inputGood}
          />
          {!inputGood && <p>invalid celo address</p>}
          {inputGood && <p>correct</p>}
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
        <Card cardHeader="Email Address" otherClass={styles.move}>
          <Input
            label="Email Addresss"
            input={{ id: "emailAddress", type: "email" }}
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
