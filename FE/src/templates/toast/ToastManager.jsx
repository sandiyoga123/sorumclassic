import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a toast with unique ID
  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now(); // Unique ID for each toast
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-4 min-w-80">
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} message={toast.message} duration={toast.duration} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = () => useContext(ToastContext);
