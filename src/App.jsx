import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Toast } from "./components/common/Toast";
import { EmployeeListPage } from "./pages/EmployeeListPage";
import { EmployeeFormPage } from "./pages/EmployeeFormPage";
import { EmployeeDetailPage } from "./pages/EmployeeDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/new" element={<EmployeeFormPage />} />
          <Route path="/employees/:id" element={<EmployeeDetailPage />} />
          <Route path="/employees/:id/edit" element={<EmployeeFormPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            Employee Management System (EMS) &bull; Frontend Intern Assignment
          </p>
          <p className="flex items-center gap-1">
            Built with React, Tailwind CSS, Context API &amp; LocalStorage
          </p>
        </div>
      </footer>

      {/* Global Notification Toast */}
      <Toast />
    </div>
  );
}
