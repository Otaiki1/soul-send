import Button from "./UI/Button";
import Card from "./UI/Card";
import Input from "./UI/Input";
import Modal from "./UI/Modal";

import styles from "./ClaimCard.module.css";

export default function ClaimCard() {
  return (
    <Modal>
      <Card cardHeader="Claim">
        <Input
          label="Claim Code"
          input={{ id: "claimCode", type: "text" }}
          isBlue
        />
      </Card>
      <Button btnText="Claim" isDark extraStyle={styles.btn} />
    </Modal>
  );
}
