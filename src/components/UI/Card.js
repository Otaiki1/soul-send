import styles from "./Card.module.css";
export default function Card(props) {
  return (
    <div className={`${styles.card} ${props.otherClass}`}>
      <h2 className={styles.cardHeader}>{props.cardHeader}</h2>
      <p className={styles.cardBody}>{props.cardBody}</p>
      {props.children}
    </div>
  );
}
