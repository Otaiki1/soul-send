import styles from "./HomeStyles.module.css";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useState, useContext } from "react";
import AuthContext from "../../context/auth-context";

export default function MintSoulName(props) {
  const ctx = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [isMinted, setIsMinted] = useState(false);
  const [soulName, setSoulName] = useState("false");
  const mintNameHandler = () => {
    if (username && ctx.account) {
      ctx.mintSoulName(username, ctx.account);
    } else {
      alert("add username and/or connect wallet");
    }
  };
  return (
    <div className={styles.accountSetupWrapper}>
      <Card cardHeader="Mint Soulname">
        <Input
          label="Enter soulname"
          input={{ id: "soulname" }}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          isBlue={true}
        />
      </Card>

      <Button
        btnText="Mint"
        extraStyle={styles.btnStyle}
        clickHandler={mintNameHandler}
      />
      {isMinted && <p>You have Successfully Minted the soulname {soulName}</p>}
    </div>
  );
}
