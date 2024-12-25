import React, { createContext, useContext, useState, useCallback } from "react";
import Toast from "./Toast";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Add a toast with a unique ID
  const addToast = useCallback((message, type = "success", duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    setIsVisible(true);
  }, []);

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prev) => {
      const newToasts = prev.filter((toast) => toast.id !== id);
      if (newToasts.length === 0) {
        // When the last toast is removed, trigger container fade out
        setTimeout(() => {
          setIsVisible(false);
        }, 0);
      }
      return newToasts;
    });
  }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {/* Only render if there are toasts or during fade-out */}
      {(toasts.length > 0 || isVisible) && (
        <div className={`fixed top-4 right-4 z-50 flex flex-col gap-4 min-w-80 transition-opacity duration-300 ${toasts.length === 0 ? "opacity-0" : "opacity-100"}`}>
          {toasts.map((toast) => (
            <Toast key={toast.id} type={toast.type} message={toast.message} duration={toast.duration} onClose={() => removeToast(toast.id)} />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
};

// Hook to use the toast context
export const useToast = () => useContext(ToastContext);
