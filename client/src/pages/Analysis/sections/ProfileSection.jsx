import styles from "../ui/Analysis.module.css";

const ProfileSection = ({ user }) => {
  return (
    <div className={styles.cardProfile}>
      <div className={styles.profileTop}>
        <div className={styles.avatarImage}></div>
        <div>
          <h2 className={styles.profileEmail}>{user.email}</h2>
          <button className={styles.changePasswordBtn}>Change Password</button>
        </div>
      </div>

      <div className={styles.section}>
        <h4>Billing Plan: {user.plan}</h4>
      </div>

      <div className={styles.section}>
        <h4>Activity</h4>
        {user.activity?.length > 0 ? (
          user.activity.map((item, index) => (
            <div key={index} className={styles.activityRow}>
              <span>{item.action}</span>
              <span className={styles.timestamp}>{item.time}</span>
            </div>
          ))
        ) : (
          <p>No activity yet.</p>
        )}
      </div>

      <div className={styles.section}>
        <h4>Statistics</h4>
        <div className={styles.statsGrid}>
          <div>
            <h3>{user.stats?.totalSites || 0}</h3>
            <p>Total Sites</p>
          </div>
          <div>
            <h3>{user.stats?.avgLoadTime || 0}s</h3>
            <p>Avg. Load Time</p>
          </div>
          <div>
            <h3>{user.stats?.optimization || 0}%</h3>
            <p>Optimization</p>
          </div>
        </div>
      </div>

      <button className={styles.editBtn}>Edit Profile</button>
    </div>
  );
};

export default ProfileSection;
