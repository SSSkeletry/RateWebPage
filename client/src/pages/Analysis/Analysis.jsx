import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "entities/User/model";
import {
  fetchWebsites,
  selectWebsites,
  selectWebsitesStatus,
  selectWebsitesError,
} from "entities/Website/model";
import styles from "./ui/Analysis.module.css";
import ProfileSection from "./sections/ProfileSection";
import SitesSection from "./sections/SitesSection";
import BillingSection from "./sections/BillingSection";

const Analysis = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const userStatus = useSelector((state) => state.user.status);
  const userError = useSelector((state) => state.user.error);

  const websites = useSelector(selectWebsites);
  const websitesStatus = useSelector(selectWebsitesStatus);
  const websitesError = useSelector(selectWebsitesError);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchWebsites());
  }, [dispatch]);

  if (userStatus === "loading" || websitesStatus === "loading")
    return <div>Loading...</div>;
  if (userStatus === "failed")
    return <div>Error loading user: {userError}</div>;
  if (websitesStatus === "failed")
    return <div>Error loading websites: {websitesError}</div>;

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
