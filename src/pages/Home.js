import { useContext, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/UI/Button";
import Card from "../components/UI/Card";
import Input from "../components/UI/Input";
import styles from "./Home.module.css";

import MintSoulName from "../components/Home/MintSoulName";
import AuthContext from "../context/auth-context";
import WelcomePage from "../components/Home/WelcomePage";

const Home = () => {
  const ctx = useContext(AuthContext);

  const [currentStep, setCurrentStep] = useState(0);

  const onGetStartedClick = () => {
    if (currentStep === 3) {
      setCurrentStep(0);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <>
      <Navbar active={1} />
      {currentStep === 0 && <DefaultHome clickHandler={onGetStartedClick} />}
      {currentStep === 1 && <SoulNamePage clickHandler={onGetStartedClick} />}
      {currentStep === 2 && <WelcomePage userSoulname={ctx.soulName} />}
    </>
  );
};

const DefaultHome = (props) => {
  return (
    <div className={styles.welcome}>
      <div className={styles.welcomeText}>
        <h1 className={styles.theSafeWay}>
          The safe way of transacting crypto
        </h1>
        <p className={styles.safeguardYourCrypto}>
          Safeguard your crypto transactions, avoid costly mistakes by sending
          to a soulname and having the opportunity to revert transactions
        </p>

        <button
          className={styles.getStartedWrapper}
          onClick={props.clickHandler}
        >
          <div className={styles.getStarted}>Get started</div>
        </button>
      </div>
      <div className={styles.cardsSection}>
        <Card cardHeader="Transaction" otherClass={styles.move}>
          <Input label="Amount" input={{ id: "amount" }} />
        </Card>
        <Card cardHeader="Send Crypto" otherClass={styles.moveLeft}>
          <Input
            label="Recipient wallet"
            input={{ id: "recipientWallet" }}
            isBlue
          />
        </Card>
        <Card cardHeader="Notification" otherClass={styles.moveLefter}>
          <p className={styles.youHaveReceived}>
            You have received 0.02 ETH from 0X758758y784788....
          </p>
          <div className={styles.btnGroup}>
            <Button btnText="Claim" />
            <Button btnText="Reject" isDark={true} />
          </div>
        </Card>
      </div>
    </div>
  );
};
const SoulNamePage = (props) => {
  return (
    <>
      <h1 className={styles.mintWarning}>
        You have to mint a soulname before you can use safe-send
      </h1>
      <MintSoulName clickHandler={props.clickHandler} />
    </>
  );
};

export default Home;
