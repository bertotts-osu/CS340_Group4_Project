import { Outlet } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./WebsiteHeader.module.css";

export default function WebsiteHeader() {
  return (
    <>
      <div className={styles.headerContainer}>
        <img src="/gutter.png" className={styles.headerImage}></img>
        <h1>LeavesFree Eaves </h1>
      </div >
      <div className={styles.bar}></div>
      <NavigationBar />
      <div className={styles.content}></div>
      <Outlet />
    </>
  );
}