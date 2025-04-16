import { useState } from "react";
import styles from "./ui/Analysis.module.css";

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const websites = [
    { title: "Website One", description: "Description of website one" },
    { title: "Website Two", description: "Description of website two" },
    { title: "Website Three", description: "Description of website three" },
  ];

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div
          className={`${styles.navItem} ${
            activeTab === "profile" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </div>
        <div
          className={`${styles.navItem} ${
            activeTab === "sites" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("sites")}
        >
          My Sites
        </div>
        <div
          className={`${styles.navItem} ${
            activeTab === "billing" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("billing")}
        >
          Billing
        </div>
      </aside>

      <main className={styles.main}>
        {activeTab === "sites" && (
          <>
            <div className={styles.header}>
              <h1>Optimized Sites</h1>
              <button className={styles.filterBtn}>Filter</button>
            </div>
            <div className={styles.grid}>
              {websites.map((site, index) => (
                <div key={index} className={styles.card}>
                  <div className={styles.imagePlaceholder}></div>
                  <h3>{site.title}</h3>
                  <p>{site.description}</p>
                  <span className={styles.optimized}>Optimized</span>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "profile" && (
          <div className={styles.cardProfile}>
            <div className={styles.profileTop}>
              <div className={styles.avatarImage}></div>
              <div>
                <h2 className={styles.profileName}>John Doe</h2>
                <p className={styles.profileEmail}>john.doe@example.com</p>
                <button className={styles.changePasswordBtn}>
                  Change Password
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Billing Plan</h4>
              <p className={styles.value}>Pro</p>
            </div>

            <div className={styles.section}>
              <h4>Activity</h4>
              <div className={styles.activityRow}>
                <span>Updated Website Two</span>
                <span className={styles.timestamp}>2 hours ago</span>
              </div>
              <div className={styles.activityRow}>
                <span>Edited profile</span>
                <span className={styles.timestamp}>1 day ago</span>
              </div>
              <div className={styles.activityRow}>
                <span>Optimized Website Three</span>
                <span className={styles.timestamp}>3 days ago</span>
              </div>
            </div>

            <div className={styles.section}>
              <h4>Statistics</h4>
              <div className={styles.statsGrid}>
                <div>
                  <h3>3</h3>
                  <p>Total Sites</p>
                </div>
                <div>
                  <h3>4.7s</h3>
                  <p>Avg. Load Time</p>
                </div>
                <div>
                  <h3>86%</h3>
                  <p>Optimization</p>
                </div>
              </div>
            </div>

            <button className={styles.editBtn}>Edit Profile</button>
          </div>
        )}

        {activeTab === "billing" && (
          <div className={styles.profileCard}>
            <h2>Billing Plan</h2>
            <p>
              You are currently on the <strong>Pro</strong> plan.
            </p>
            <button className={styles.upgradeBtn}>Upgrade Plan</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analysis;
