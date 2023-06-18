import styles from "./HomeStyles.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";

export default function MintSoulName(props) {
  const ctx = useContext(AuthContext);

  const [isMinted, setIsMinted] = useState(false);
  const [soulName, setSoulName] = useState("false");
  const mintNameHandler = () => {
    if (ctx.account) {
      ctx.mintSoulName();
      if (ctx.soulName) {
        setSoulName(ctx.soulName);
        setIsMinted(true);
      }
    } else {
      alert("Kindly connect wallet");
    }
  };
  return (
    <div className={styles.accountSetupWrapper}>
      <Button
        btnText="Mint a soulname"
        extraStyle={styles.btnStyle}
        clickHandler={mintNameHandler}
      />

      {isMinted && (
        <Card>
          <p>You have Successfully Minted the soulname {soulName}</p>
          <Button btnText="Next" clickHandler={props.clickHandler} />
        </Card>
      )}
    </div>
  );
}
