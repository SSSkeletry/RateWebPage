import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "entities/User/model";
import styles from "./ui/Analysis.module.css";
import ProfileSection from "./sections/ProfileSection";
import SitesSection from "./sections/SitesSection";
import BillingSection from "./sections/BillingSection";

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
        {activeTab === "profile" && user && <ProfileSection user={user} />}
        {activeTab === "sites" && (
          <SitesSection websites={websites} styles={styles} />
        )}
        {activeTab === "billing" && user && <BillingSection user={user} />}
      </main>
    </div>
  );
};

export default Analysis;
