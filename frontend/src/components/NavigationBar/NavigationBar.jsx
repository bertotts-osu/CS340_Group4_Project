import { NavLink } from "react-router-dom";
import styles from "./NavigationBar.module.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/work-orders", label: "Work Orders" },
  { path: "/employees", label: "Employees"},
  { path: "/work-order-employees", label: "Work Order Employees"},
  { path: "/purchase-orders", label: "Purchase Orders"},
  { path: "/purchase-order-items", label: "Purchase Order Items"},
  { path: "/materials", label: "Materials"},
];

export default function NavigationBar() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
        {links.map((link, index) => (
          <li key={index} className={styles.navItem}>
            <NavLink to={link.path} className={styles.active}>
              {link.label}
            </NavLink>
          </li>
        ))}
        </ul>
      </nav>
    </>
  );
}