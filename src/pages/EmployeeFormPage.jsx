import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEmployees } from "../context/EmployeeContext";
import { EmployeeForm } from "../components/employees/EmployeeForm";
import { UserPlus, Edit3, ArrowLeft, AlertCircle } from "lucide-react";

export const EmployeeFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployee, addEmployee, updateEmployee } = useEmployees();

  const isEditing = Boolean(id);
  const employee = isEditing ? getEmployee(id) : null;

  const handleSubmit = (formData) => {
    if (isEditing) {
      updateEmployee(id, formData);
    } else {
      addEmployee(formData);
    }
    navigate("/employees");
  };

  // If in edit mode but employee with given ID was not found
  if (isEditing && !employee) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Employee Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          The employee ID you are attempting to edit does not exist or has been deleted.
        </p>
        <Link
          to="/employees"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Employee Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Link
            to="/employees"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-indigo-50 text-indigo-600">
                {isEditing ? <Edit3 className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {isEditing ? `Edit Employee: ${employee.name}` : "Add New Employee"}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isEditing
                ? "Update the details and save changes below."
                : "Fill out the form below to register a new team member."}
            </p>
          </div>
        </div>
      </div>

      {/* Form Component */}
      <EmployeeForm
        initialData={employee}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};
