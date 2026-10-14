import React from "react";
import { Link } from "react-router-dom";
import { Eye, Edit3, Trash2, Mail, Phone, Calendar } from "lucide-react";

export const EmployeeCard = ({ employee, onRequestDelete }) => {
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

  const initials = employee.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header: Avatar, Name, Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border ${getAvatarColor(
                employee.name
              )} flex-shrink-0`}
            >
              {initials}
            </div>
            <div>
              <Link
                to={`/employees/${employee.id}`}
                className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1"
              >
                {employee.name}
              </Link>
              <p className="text-xs text-slate-500 font-medium">{employee.role}</p>
            </div>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold flex-shrink-0 ${
              employee.status === "Active"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : employee.status === "Remote"
                ? "bg-sky-50 text-sky-700 border border-sky-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {employee.status || "Active"}
          </span>
        </div>

        {/* Department tag */}
        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg">
            {employee.department || "General"}
          </span>
        </div>

        {/* Contact details */}
        <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
          <a
            href={`mailto:${employee.email}`}
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors truncate"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{employee.email}</span>
          </a>
          <a
            href={`tel:${employee.phone}`}
            className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{employee.phone}</span>
          </a>
          {employee.joinDate && (
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Joined {employee.joinDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
        <Link
          to={`/employees/${employee.id}`}
          className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          View Details
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to={`/employees/${employee.id}/edit`}
            className="p-1.5 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            title="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </Link>
          <button
            onClick={() => onRequestDelete(employee)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
