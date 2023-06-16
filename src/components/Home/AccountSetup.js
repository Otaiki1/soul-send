import styles from "./HomeStyles.module.css";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";

export default function AccountSetup() {
  return (
    <div className={styles.accountSetupWrapper}>
      <Card cardHeader="Validate your account">
        <Input
          label="Enter Phone number"
          input={{ id: "phonenumber" }}
          isBlue={true}
        />
      </Card>
      <Card cardHeader="OTP verification">
        <Input label="Enter OTP" input={{ id: "otp" }} isBlue={true} />
      </Card>
      <Button btnText="Register" extraStyle={styles.btnStyle} />
    </div>
  );
}
