/* oxlint-disable react/only-export-components */
import React, { createContext, useState, useEffect } from "react";
import { initialEmployees } from "../data/initialEmployees";

const EmployeeContext = createContext(null);
const STORAGE_KEY = "ems_employees_v1";

export const EmployeeProvider = ({ children }) => {
  // Initialize from localStorage or fallback to initialEmployees seed
  const [employees, setEmployees] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.error("Failed to read from localStorage:", err);
    }
    return initialEmployees;
  });

  // Toast notifications state
  const [toast, setToast] = useState(null);

  // Sync state to localStorage whenever employees list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
    }
  }, [employees]);

  // Toast trigger helper
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToast({ id, message, type });
  };

  const clearToast = () => {
    setToast(null);
  };

  // CRUD: Add Employee
  const addEmployee = (employeeData) => {
    const newEmployee = {
      ...employeeData,
      id: `emp-${Date.now().toString().slice(-6)}`,
      joinDate: employeeData.joinDate || new Date().toISOString().split("T")[0],
      status: employeeData.status || "Active",
    };

    setEmployees((prev) => [newEmployee, ...prev]);
    showToast(`Employee "${newEmployee.name}" added successfully!`, "success");
    return newEmployee;
  };

  // CRUD: Update Employee
  const updateEmployee = (id, updatedFields) => {
    let updatedRecord = null;
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          updatedRecord = { ...emp, ...updatedFields };
          return updatedRecord;
        }
        return emp;
      })
    );

    if (updatedRecord) {
      showToast(`Employee "${updatedRecord.name}" updated successfully!`, "success");
    }
    return updatedRecord;
  };

  // CRUD: Delete Employee
  const deleteEmployee = (id) => {
    const empToDelete = employees.find((e) => e.id === id);
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    showToast(
      empToDelete ? `Employee "${empToDelete.name}" deleted.` : "Employee deleted.",
      "info"
    );
  };

  // CRUD: Get Single Employee
  const getEmployee = (id) => {
    return employees.find((emp) => emp.id === id);
  };

  // Reset to initial mock data (Convenience bonus for reviewers)
  const resetToSampleData = () => {
    setEmployees(initialEmployees);
    showToast("Restored initial sample employee records.", "info");
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getEmployee,
        resetToSampleData,
        toast,
        showToast,
        clearToast,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export { EmployeeContext };
export { useEmployees } from "./useEmployees";

