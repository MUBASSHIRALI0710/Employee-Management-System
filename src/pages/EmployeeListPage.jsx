import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { UserPlus, SearchX } from "lucide-react";
import { useEmployees } from "../context/EmployeeContext";
import { SearchBar } from "../components/employees/SearchBar";
import { EmployeeTable } from "../components/employees/EmployeeTable";
import { EmployeeCard } from "../components/employees/EmployeeCard";
import { Pagination } from "../components/common/Pagination";
import { ConfirmModal } from "../components/common/ConfirmModal";

export const EmployeeListPage = () => {
  const { employees, deleteEmployee } = useEmployees();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name-asc");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [viewMode, setViewMode] = useState("table");

  // Pagination states (Items per page = 6 so pagination is demonstrative)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Deletion modal state
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Extract unique departments for filter
  const departments = useMemo(() => {
    const set = new Set();
    employees.forEach((emp) => {
      if (emp.department) set.add(emp.department);
    });
    return Array.from(set).sort();
  }, [employees]);

  // Combined Search, Filter & Sort logic
  const processedEmployees = useMemo(() => {
    let result = [...employees];

    // 1. Search filter by Name, Role, or Email
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (emp) =>
          emp.name?.toLowerCase().includes(q) ||
          emp.role?.toLowerCase().includes(q) ||
          emp.email?.toLowerCase().includes(q)
      );
    }

    // 2. Department filter
    if (departmentFilter !== "All") {
      result = result.filter((emp) => emp.department === departmentFilter);
    }

    // 3. Sorting
    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return (a.name || "").localeCompare(b.name || "");
      }
      if (sortBy === "name-desc") {
        return (b.name || "").localeCompare(a.name || "");
      }
      if (sortBy === "role-asc") {
        return (a.role || "").localeCompare(b.role || "");
      }
      if (sortBy === "role-desc") {
        return (b.role || "").localeCompare(a.role || "");
      }
      if (sortBy === "newest") {
        return (b.joinDate || "").localeCompare(a.joinDate || "");
      }
      return 0;
    });

    return result;
  }, [employees, searchQuery, departmentFilter, sortBy]);

  // Reset pagination to page 1 whenever filters change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (dept) => {
    setDepartmentFilter(dept);
    setCurrentPage(1);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setDepartmentFilter("All");
    setSortBy("name-asc");
    setCurrentPage(1);
  };

  // Paginated slice
  const totalPages = Math.ceil(processedEmployees.length / pageSize);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedEmployees.slice(startIndex, startIndex + pageSize);
  }, [processedEmployees, currentPage, pageSize]);

  // Deletion handlers
  const handleRequestDelete = (emp) => {
    setEmployeeToDelete(emp);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id);
      setEmployeeToDelete(null);

      // Adjust page if we deleted the last item on the current page
      if (paginatedEmployees.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Employee Directory
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your team members, update roles, and review profiles.
          </p>
        </div>

        <Link
          to="/employees/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm shadow-indigo-100 transition-all hover:shadow"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Employee</span>
        </Link>
      </div>

      {/* Search, Filter, Sort Bar */}
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        departmentFilter={departmentFilter}
        onDepartmentChange={handleDepartmentChange}
        departments={departments}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content: Table or Grid or Empty State */}
      {processedEmployees.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <SearchX className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No employees found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
            We couldn't find any team member matching your filter criteria. Try adjusting your query or clear all filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Responsive rendering: On mobile always show cards; on desktop respect user's viewMode */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {paginatedEmployees.map((emp) => (
                <EmployeeCard
                  key={emp.id}
                  employee={emp}
                  onRequestDelete={handleRequestDelete}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            {viewMode === "table" ? (
              <EmployeeTable
                employees={paginatedEmployees}
                onRequestDelete={handleRequestDelete}
              />
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                {paginatedEmployees.map((emp) => (
                  <EmployeeCard
                    key={emp.id}
                    employee={emp}
                    onRequestDelete={handleRequestDelete}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={processedEmployees.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(employeeToDelete)}
        title="Delete Employee"
        message={`Are you sure you want to delete ${employeeToDelete?.name}? This action will permanently remove their records from the directory.`}
        confirmText="Confirm Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setEmployeeToDelete(null)}
      />
    </div>
  );
};
