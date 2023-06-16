import { getShortAddress } from "../../utils/addressShort";
import styles from "./ConnectWallet.module.css";

export default function AddressBar(props) {
  return (
    <button className={styles.x7575788Wrapper} onClick={props.onclick}>
      <div className={styles.x7575788}>{getShortAddress(props.address)}</div>
    </button>
  );
}
