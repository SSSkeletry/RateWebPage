import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../features/user/userSlice";
import styles from "./ui/Analysis.module.css";

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const { user, websites, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading data: {error}</div>;

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        {["profile", "sites", "billing"].map((tab) => (
          <div
            key={tab}
            className={`${styles.navItem} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        ))}
      </aside>

      <main className={styles.main}>
        {activeTab === "sites" && (
          <>
            <div className={styles.header}>
              <h1>Optimized Sites</h1>
              <button className={styles.filterBtn}>Filter</button>
            </div>
            <div className={styles.grid}>
              {websites.length > 0 ? (
                websites.map((site, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.imagePlaceholder}></div>
                    <h3>{site.title}</h3>
                    <p>{site.description}</p>
                    <span className={styles.optimized}>Optimized</span>
                  </div>
                ))
              ) : (
                <p>No websites available.</p>
              )}
            </div>
          </>
        )}

        {activeTab === "profile" && user && (
          <div className={styles.cardProfile}>
            <div className={styles.profileTop}>
              <div className={styles.avatarImage}></div>
              <div>
                <h2 className={styles.profileEmail}>{user.email}</h2>
                <button className={styles.changePasswordBtn}>
                  Change Password
                </button>
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
        )}

        {activeTab === "billing" && user && (
          <div className={styles.profileCard}>
            <h2>Billing Plan</h2>
            <p>
              You are currently on the <strong>{user.plan}</strong> plan.
            </p>
            <button className={styles.upgradeBtn}>Upgrade Plan</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Analysis;
