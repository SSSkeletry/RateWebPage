import styles from "../ui/Analysis.module.css";

const BillingSection = ({ user }) => {
  return (
    <div className={styles.profileCard}>
      <h2>Billing Plan</h2>
      <p>
        You are currently on the <strong>{user.plan}</strong> plan.
      </p>
      <button className={styles.upgradeBtn}>Upgrade Plan</button>
    </div>
  );
};

export default BillingSection;
