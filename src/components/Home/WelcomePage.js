import Button from "../UI/Button";
import Card from "../UI/Card";
import styles from "../../pages/Home.module.css";

const WelcomePage = (props) => {
  return (
    <Card>
      <h1 className={styles.youHaveReceived}>
        Welcome to Soul-Send ,{props.userSoulname}. Make your first transactions
        by either sending to a soulname or claiming a transaction sent to your
        soulname
      </h1>
      <div className={styles.btnGroup}>Navigate to either send or claim</div>
    </Card>
  );
};

export default WelcomePage;
