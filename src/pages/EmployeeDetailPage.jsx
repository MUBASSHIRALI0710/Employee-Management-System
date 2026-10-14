import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  Briefcase,
  Edit3,
  Trash2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";
import { ConfirmModal } from "../components/common/ConfirmModal";

export const EmployeeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEmployee, deleteEmployee } = useEmployees();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const employee = getEmployee(id);

  if (!employee) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-800">Employee Not Found</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          The employee record with ID "{id}" does not exist.
        </p>
        <Link
          to="/employees"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteEmployee(employee.id);
    setShowDeleteModal(false);
    navigate("/employees");
  };

  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top back button and actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/employees"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Link>

        <div className="flex items-center gap-2">
          <Link
            to={`/employees/${employee.id}/edit`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </Link>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 sm:h-36 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700"></div>

        {/* Profile Content */}
        <div className="px-6 sm:px-10 pb-8 relative">
          {/* Avatar & Header details */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Avatar independently pulled up over banner */}
              <div className="-mt-14 sm:-mt-16 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-1.5 shadow-xl border-4 border-white flex-shrink-0 z-10">
                <div className="w-full h-full rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-extrabold text-2xl sm:text-3xl">
                  {initials}
                </div>
              </div>

              {/* Text Info - sits cleanly on white background with no banner overlap */}
              <div className="pt-2 sm:pt-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {employee.name}
                  </h1>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold ${
                      employee.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : employee.status === "Remote"
                        ? "bg-sky-50 text-sky-700 border border-sky-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        employee.status === "Active"
                          ? "bg-emerald-500"
                          : employee.status === "Remote"
                          ? "bg-sky-500"
                          : "bg-amber-500"
                      }`}
                    ></span>
                    {employee.status || "Active"}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-slate-600 font-medium flex items-center gap-2 mt-1">
                  <Briefcase className="w-4 h-4 text-slate-400" />
                  {employee.role}
                </p>
              </div>
            </div>

            {/* ID Badge */}
            <div className="self-start sm:self-end sm:pb-2">
              <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 inline-block">
                ID: {employee.id}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            {/* Email */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Email Address
              </span>
              <a
                href={`mailto:${employee.email}`}
                className="text-sm font-semibold text-slate-800 hover:text-indigo-600 flex items-center gap-2 truncate"
              >
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="truncate">{employee.email}</span>
              </a>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Phone Number
              </span>
              <a
                href={`tel:${employee.phone}`}
                className="text-sm font-semibold text-slate-800 hover:text-indigo-600 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{employee.phone}</span>
              </a>
            </div>

            {/* Department */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Department
              </span>
              <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{employee.department || "General"}</span>
              </div>
            </div>

            {/* Join Date */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Date of Joining
              </span>
              <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{employee.joinDate || "N/A"}</span>
              </div>
            </div>

            {/* Verification Status */}
            <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/60">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Record Status
              </span>
              <div className="text-sm font-semibold text-emerald-700 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span>Verified in Local Database</span>
              </div>
            </div>
          </div>

          {/* Professional Bio */}
          {employee.bio && (
            <div className="mt-6 p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                About / Responsibilities
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">{employee.bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Employee"
        message={`Are you sure you want to permanently delete ${employee.name}?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};
