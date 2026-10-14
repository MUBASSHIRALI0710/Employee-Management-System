import React, { useEffect } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useEmployees } from "../../context/EmployeeContext";

export const Toast = () => {
  const { toast, clearToast } = useEmployees();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      clearToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  const typeConfig = {
    success: {
      bg: "bg-emerald-50 border-emerald-500 text-emerald-900",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
    },
    error: {
      bg: "bg-rose-50 border-rose-500 text-rose-900",
      icon: <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />,
    },
    info: {
      bg: "bg-blue-50 border-blue-500 text-blue-900",
      icon: <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />,
    },
  };

  const current = typeConfig[toast.type] || typeConfig.info;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md w-full px-4 sm:px-0 transition-all transform ease-out duration-300">
      <div
        className={`flex items-center justify-between p-4 rounded-xl shadow-lg border-l-4 ${current.bg} bg-white backdrop-blur-sm`}
        role="alert"
      >
        <div className="flex items-center gap-3">
          {current.icon}
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={clearToast}
          className="ml-3 text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
