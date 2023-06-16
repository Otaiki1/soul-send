import Modal from "./UI/Modal";
import styles from "./TxnInfoCard.module.css";
import Button from "./UI/Button";

export default function TxnInfoCard(props) {
  return (
    <Modal>
      <div className={styles.txnDetailWrapper}>
        <div className={styles.txnDetail}>
          <h4>Transaction Id:</h4>
          <p>{props.txnId}</p>
        </div>
        <div className={styles.txnDetail}>
          <h4>Claim Code:</h4>
          <p>{props.claimCode}</p>
        </div>
        <div className={styles.txnDetail}>
          <h4>Sender:</h4>
          <p>{props.sender}</p>
        </div>
        <div className={styles.txnDetail}>
          <h4>Receiver:</h4>
          <p>{props.receiver}</p>
        </div>
        <Button btnText="Close" isDark extraStyle={styles.btn} />
      </div>
    </Modal>
  );
}
