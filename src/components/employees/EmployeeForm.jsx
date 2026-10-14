import React, { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, Briefcase, Building, AlertCircle, Check, ArrowLeft } from "lucide-react";
import { validateEmployee } from "../../utils/validators";

const DEPARTMENTS = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Human Resources",
  "Analytics",
  "Infrastructure",
  "Security",
  "Quality Assurance",
  "Finance",
];

const STATUS_OPTIONS = ["Active", "Remote", "On Leave"];

export const EmployeeForm = ({ initialData = null, onSubmit, isEditing = false }) => {

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    department: initialData?.department || "Engineering",
    status: initialData?.status || "Active",
    bio: initialData?.bio || "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    const nextData = { ...formData, [name]: value };
    setFormData(nextData);

    // If field has already been touched, validate immediately for live feedback
    if (touched[name]) {
      const { errors: newErrors } = validateEmployee(nextData);
      setErrors((prev) => ({
        ...prev,
        [name]: newErrors[name] || null,
      }));
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const { errors: newErrors } = validateEmployee(formData);
    setErrors((prev) => ({
      ...prev,
      [name]: newErrors[name] || null,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({
      name: true,
      role: true,
      email: true,
      phone: true,
      department: true,
    });

    const { isValid, errors: validationErrors } = validateEmployee(formData);
    setErrors(validationErrors);

    if (!isValid) return;

    setIsSubmitting(true);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Basic Information Section */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Personal & Role Details</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Please fill in the employee's essential employment information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className="block text-xs font-semibold text-slate-700">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Aarav Sharma"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                  touched.name && errors.name
                    ? "border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : touched.name && !errors.name && formData.name
                    ? "border-emerald-300 bg-emerald-50/20 text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
            </div>
            {touched.name && errors.name && (
              <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Role / Job Title */}
          <div className="space-y-1.5">
            <label htmlFor="role" className="block text-xs font-semibold text-slate-700">
              Job Title / Role <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <input
                id="role"
                name="role"
                type="text"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Senior Frontend Engineer"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                  touched.role && errors.role
                    ? "border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
            </div>
            {touched.role && errors.role && (
              <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.role}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-xs font-semibold text-slate-700">
              Email Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. aarav@company.com"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                  touched.email && errors.email
                    ? "border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : touched.email && !errors.email && formData.email
                    ? "border-emerald-300 bg-emerald-50/20 text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
            </div>
            {touched.email && errors.email && (
              <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-xs font-semibold text-slate-700">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. +91 98765 43210"
                className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-sm transition-all focus:outline-none ${
                  touched.phone && errors.phone
                    ? "border-rose-300 bg-rose-50/30 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
                    : "border-slate-200 bg-slate-50/50 text-slate-800 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                }`}
              />
            </div>
            {touched.phone && errors.phone && (
              <p className="flex items-center gap-1.5 text-xs text-rose-600 font-medium mt-1">
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>

          {/* Department Select */}
          <div className="space-y-1.5">
            <label htmlFor="department" className="block text-xs font-semibold text-slate-700">
              Department <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Building className="w-4 h-4" />
              </div>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Work Status */}
          <div className="space-y-1.5">
            <label htmlFor="status" className="block text-xs font-semibold text-slate-700">
              Employment Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bio / Description */}
        <div className="space-y-1.5 pt-2">
          <label htmlFor="bio" className="block text-xs font-semibold text-slate-700">
            Professional Summary / Notes <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            rows="3"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Brief description about the employee's responsibilities, strengths, or achievements..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition-all placeholder-slate-400"
          ></textarea>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/employees"
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 hover:shadow-indigo-200 transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          {isEditing ? "Save Changes" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};
