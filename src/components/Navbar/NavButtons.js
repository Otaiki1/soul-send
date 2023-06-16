import styles from "./NavButtons.module.css";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
export default function NavButtons(props) {
  const navigate = useNavigate();

  const onSendButtonClick = useCallback(() => {
    navigate("/send");
  }, [navigate]);
  const onHomeButtonClick = useCallback(() => {
    navigate("/");
  }, [navigate]);
  const onClaimButtonClick = useCallback(() => {
    navigate("/claim");
  }, [navigate]);
  return (
    <div className={styles.frameParent}>
      <div className={styles.homeParent}>
        <div className={styles.home} onClick={onHomeButtonClick}>
          <b className={props.active === 1 ? styles.active : ""}>Home</b>
          <div className={styles.frameChild} />
        </div>
        <div className={styles.home} onClick={onSendButtonClick}>
          <b className={props.active === 2 ? styles.active : ""}>Send</b>
          <div className={styles.frameChild} />
        </div>
        <div className={styles.home} onClick={onClaimButtonClick}>
          <b className={props.active === 3 ? styles.active : ""}>
            Claim
            <span className={props.notifAmount ? styles.badge : ""}>
              {props.notifAmount}
            </span>
          </b>

          <div className={styles.frameChild} />
        </div>
      </div>
    </div>
  );
}
