import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center p-4">
      <div className="max-w-md bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-slate-800">Page Not Found</h2>
        <p className="text-sm text-slate-500">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>
        <div className="pt-2">
          <Link
            to="/employees"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all"
          >
            <Home className="w-4 h-4" />
            Return to Employee Directory
          </Link>
        </div>
      </div>
    </div>
  );
};
