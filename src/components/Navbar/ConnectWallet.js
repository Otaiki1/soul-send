import styles from "./ConnectWallet.module.css";
export default function ConnectWallet(props) {
  return (
    <button
      className={styles.connectWalletWrapper}
      onClick={props.clickHandler}
    >
      <div className={styles.connectWallet}>Connect wallet</div>
    </button>
  );
}
