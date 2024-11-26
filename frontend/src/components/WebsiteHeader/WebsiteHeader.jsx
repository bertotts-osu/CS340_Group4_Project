import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./WebsiteHeader.module.css";

export default function WebsiteHeader() {
  return (
    <div className={styles.content_container}>
      <a href="/">
        <div className={styles.logo_container}>
          <img src="/gutter.png" className={styles.headerImage}/>
          <h1>LeavesFree Eaves</h1>
        </div>
      </a>
      <NavigationBar/>
      <Outlet/>
    </div>
  );
}