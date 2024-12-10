import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import HeaderLabel from "../../components/HeaderLabel/HeaderLabel.jsx";
import { resetDatabase } from "./HomePageAPI.js";
import styles from "./HomePage.module.css";
import headerStyle from "../../components/HeaderLabel/HeaderLabel.module.css";
/**
 * This file displays the landing page content for the application. It includes the project overview 
 * and a button to revert the database to its intial values based on the DDL.sql file.
 */

// define HomePage as a functional component
const HomePage = () => {
  useEffect(() => {
    document.title = "LeavesFree Eaves - Home";
  }, []); // empty array makes the effect only run once after the initial render

  // define variable states
  const [resultMessage, setResultMessage] = useState(false);

  // handle "Reset Database" button press 
  const { mutate: resetDB, isLoading } = useMutation(resetDatabase, {
    onSuccess: () => {
      setResultMessage("Database reset successfully!");
    },
    onError: () => {
      setResultMessage("Error: Unable to reset database.");
    },
  });

  return (
    <>
      <div className={styles.header_container}>
        <HeaderLabel text="Project Overview" className={headerStyle.header} />
      </div>
      <div className={styles.body}>
        <p>
          LeavesFree Eaves is a small business that installs specialized
          seamless gutters, providing a superior defense against water damage.
          Last year, the company expanded their area of service, resulting in an
          increase from 200 to 500 construction projects and generating revenue
          exceeding $2 million. To meet this demand, employee headcount was
          doubled, now totaling 10 temporary employees.
        </p>
        <p>
          Historically, LeavesFree Eaves tracked their projects on paper or
          spreadsheets. However, the recent influx of work has made this
          approach untenable. In the last season, 20 contracts were lost due to
          miscommunication about a project’s status. Additionally, unordered
          custom material caused a 2 week delay resulting in unsatisfied
          customers. There were also instances of fraud, with employees
          concealing and manipulating project records to perform the work
          independently for personal gain.
        </p>
        <p>
          A Resource Management System will effectively resolve these issues by
          tracking the status of Work Orders, and the Employees, Purchase
          Orders, and Materials allocated to them. It will be capable of
          handling 1,000 work orders and purchase orders annually, in addition
          to 50 employees and 100 material types. Immediate benefits of its
          database-driven design will include scheduling optimization and
          project monitoring. Anticipated future benefits of the aggregated
          historic data include key insights into areas of business health, such
          as performance metrics, procurement strategy, and customer
          satisfaction.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${isLoading ? styles.loading : ''}`}
          onClick={() => {
            setResultMessage(false);
            resetDB();
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Resetting...' : 'Reset Database'}
        </button>
      </div>
      {resultMessage && resultMessage.includes("Error:") ? (
        <div className={styles.msgError}>{resultMessage}</div>
      ) : (
        <div className={styles.msgSuccess}>{resultMessage}</div>
      )}
    </>
  );
};

export default HomePage;