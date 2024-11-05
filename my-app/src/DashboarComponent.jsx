import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Estilos/AdminGestion.module.css";

const DashboardComponent = () => {
 

  return (
    
    <div className={styles.dashboardContainer}>
      <h2>Dashboard</h2>
      {/* Aquí se podrían mostrar gráficas, tablas, etc. */}
    </div>
  );
};

export default DashboardComponent;
