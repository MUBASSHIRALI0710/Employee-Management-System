import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit3, Trash2, Mail, Phone } from "lucide-react";

export const EmployeeTable = ({ employees, onRequestDelete }) => {
  // Generate consistent avatar background based on employee name
  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-100 text-blue-700 border-blue-200",
      "bg-indigo-100 text-indigo-700 border-indigo-200",
      "bg-purple-100 text-purple-700 border-purple-200",
      "bg-emerald-100 text-emerald-700 border-emerald-200",
      "bg-amber-100 text-amber-700 border-amber-200",
      "bg-rose-100 text-rose-700 border-rose-200",
      "bg-cyan-100 text-cyan-700 border-cyan-200",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3.5 px-4 sm:px-6">Employee</th>
              <th className="py-3.5 px-4 sm:px-6">Role & Dept</th>
              <th className="py-3.5 px-4 sm:px-6">Contact</th>
              <th className="py-3.5 px-4 sm:px-6">Status</th>
              <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {employees.map((emp) => {
              const avatarStyle = getAvatarColor(emp.name);
              const initials = getInitials(emp.name);

              return (
                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/70 transition-colors group"
                >
                  {/* Name + Avatar */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs border ${avatarStyle} flex-shrink-0`}
                      >
                        {initials}
                      </div>
                      <div>
                        <Link
                          to={`/employees/${emp.id}`}
                          className="font-semibold text-slate-900 hover:text-indigo-600 transition-colors block"
                        >
                          {emp.name}
                        </Link>
                        <span className="text-xs text-slate-400 font-mono">
                          ID: {emp.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role & Department */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="font-medium text-slate-800">{emp.role}</div>
                    <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-semibold text-slate-600 bg-slate-100 rounded-md">
                      {emp.department || "General"}
                    </span>
                  </td>

                  {/* Email & Phone */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex flex-col gap-0.5">
                      <a
                        href={`mailto:${emp.email}`}
                        className="text-slate-600 hover:text-indigo-600 flex items-center gap-1.5 text-xs truncate max-w-[220px]"
                        title={emp.email}
                      >
                        <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{emp.email}</span>
                      </a>
                      <a
                        href={`tel:${emp.phone}`}
                        className="text-slate-500 hover:text-indigo-600 flex items-center gap-1.5 text-xs"
                      >
                        <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{emp.phone}</span>
                      </a>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        emp.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : emp.status === "Remote"
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          emp.status === "Active"
                            ? "bg-emerald-500"
                            : emp.status === "Remote"
                            ? "bg-sky-500"
                            : "bg-amber-500"
                        }`}
                      ></span>
                      {emp.status || "Active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        to={`/employees/${emp.id}`}
                        className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/employees/${emp.id}/edit`}
                        className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Edit Employee"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => onRequestDelete(emp)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
