import { useEffect } from "react";
import HeaderLabel from "../../components/HeaderLabel/HeaderLabel.jsx";
import styles from "./HomePage.module.css";
import headerStyle from "../../components/HeaderLabel/HeaderLabel.module.css";

// define HomePage as a functional component
// updates the browser tab title as a side effect to loading this component
const HomePage = () => {
  useEffect(() => {
    document.title = "LeavesFree Eaves - Home";
  }, []); // empty array makes the effect only run once after the initial

  return (
    <>
    <div className={styles.header_container}>
    <HeaderLabel text="Project Overview" className={headerStyle.header}/>
    </div>
  <div className={styles.body}>
    <p>
      LeavesFree Eaves is a small business that installs specialized seamless gutters, providing a superior defense against water damage. Last year, the company expanded their area of service, resulting in an increase from 200 to 500 construction projects and generating revenue exceeding $2 million. To meet this demand, employee headcount was doubled, now totaling 10 temporary employees.
    </p>
    <p>
      Historically, LeavesFree Eaves tracked their projects on paper or spreadsheets. However, the recent influx of work has made this approach untenable. In the last season, 20 contracts were lost due to miscommunication about a project’s status. Additionally, unordered custom material caused a 2 week delay resulting in unsatisfied customers. There were also instances of fraud, with employees concealing and manipulating project records to perform the work independently for personal gain.
    </p>
    <p>
      A Resource Management System will effectively resolve these issues by tracking the status of Work Orders, and the Employees, Purchase Orders, and Materials allocated to them. It will be capable of handling 1,000 work orders and purchase orders annually, in addition to 50 employees and 100 material types. Immediate benefits of its database-driven design will include scheduling optimization and project monitoring. Anticipated future benefits of the aggregated historic data include key insights into areas of business health, such as performance metrics, procurement strategy, and customer satisfaction.
    </p>
  </div>
</>
  );
};

export default HomePage;