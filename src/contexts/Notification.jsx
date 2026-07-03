import React, { createContext, useContext, useState } from "react";
import styles from "./CSS/notification.module.css";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showNotification = (message, type = "add") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const getIcon = (type) => {
    switch (type) {
      case "add": return <p className={styles.add}></p>;
      case "modify": return <p className={styles.edit}></p>;
      case "delete": return <p className={styles.delete}></p>;
      case "error": return <p className={styles.error}>Errore imprevisto nell'operazione</p>;
      default: return <i className="fa-solid fa-circle-info"></i>;
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      
      {toast && (
        <div className={styles.toastContainer}>
          <div className={`${styles.toast} ${styles[toast.type]}`}>
            {getIcon(toast.type)}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);