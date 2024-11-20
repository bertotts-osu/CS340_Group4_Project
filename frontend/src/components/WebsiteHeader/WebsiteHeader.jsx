import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./WebsiteHeader.module.css";

export default function WebsiteHeader() {
  return (
    <div className={styles.content_container}>
      <div className={styles.content_container}>
        <img src="/gutter.png" className={styles.headerImage} />
        <h1>LeavesFree Eaves </h1>
      </div>
      <NavigationBar />
      <div className={styles.content}>
      <Outlet/>
      </div>
    </div>
  );
}