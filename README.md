# 🏢 Employee Management System (EMS)

A polished, production-ready Single-Page Application (SPA) built with **React**, **Tailwind CSS**, and **React Router DOM**, demonstrating comprehensive CRUD workflows, robust state management, and real-time validation.

> Developed for the **Frontend Intern Assignment — Employee Management System**.

---

## 🌟 Live Features & Capabilities

### ✅ Core Requirements (Must-Have)
1. **Employee List (Read):**
   - Displays all employee profiles with **Name**, **Role / Designation**, **Email**, **Phone**, **Department**, **Status**, and **Action triggers**.
   - Dual viewing modes: Clean responsive corporate **Table view** for desktop and modular **Card view** for mobile & quick browsing.
2. **Add Employee (Create):**
   - Interactive modal/form route (`/employees/new`) with dedicated fields.
   - Comprehensive client-side validations ensuring required fields are non-empty and well-formed.
   - Newly added employees instantly reflect across views and persist into memory and `localStorage`.
3. **Edit Employee (Update):**
   - Edit route (`/employees/:id/edit`) pre-populated with employee data.
   - Updates immediately synchronize across state without needing a manual page reload.
4. **Delete Employee (Delete):**
   - Safe deletion flow with custom accessible **Confirmation Modal** preventing accidental removals.
5. **Search & Filter:**
   - Real-time search box instantly filtering across **Employee Name**, **Role / Title**, and **Email Address**.
6. **State Management:**
   - Centralized state orchestrated using React **Context API** (`EmployeeContext`) and custom hook (`useEmployees`).
7. **Mock Data Source:**
   - Seeded with a realistic dataset of 12 corporate employees across various departments (Engineering, Design, Marketing, QA, etc.).

---

### 🎁 Bonus & Extra Credit Features Implemented
* 💾 **Persistent `localStorage` Sync:** All additions, updates, and deletions automatically persist in browser storage. State survives page refreshes and browser restarts.
* ↕️ **Multi-attribute Sorting:** Dynamic sorting by:
  - Name (A → Z)
  - Name (Z → A)
  - Role (A → Z)
  - Role (Z → A)
  - Date Joined (Newest first)
* 🏢 **Department Filter:** Quick categorical dropdown filtering (Engineering, Design, Product, etc.).
* ⚠️ **Inline Validation & Error Handling:**
  - Real-time inline field validation on touch/blur.
  - Regex verification for email formats (`name@domain.com`).
  - Digit length validation for international and local phone numbers.
  - Minimum character constraints on names and roles.
* 📄 **Client-Side Pagination:**
  - Configurable page size (6 per page) with interactive numeric pages, previous/next buttons, and responsive item counters.
* 🧭 **Full React Router Architecture:**
  - `/` → Redirects to `/employees`
  - `/employees` → Directory list & search view
  - `/employees/new` → Add employee form
  - `/employees/:id` → Detailed single employee profile view
  - `/employees/:id/edit` → Update employee form
  - `*` → Polished 404 Not Found fallback page
* 🔔 **Interactive Toast Notifications:**
  - Floating slide-in alerts giving instant feedback when an employee is created, modified, or deleted.
* 🔄 **One-Click Mock Data Reset:**
  - Quick reload button in navbar to restore the default sample dataset at any time for easy demoing.

---

## 📁 Project Architecture & Component Breakdown

```text
src/
├── components/
│   ├── common/
│   │   ├── ConfirmModal.jsx     # Reusable confirmation dialog for deletions
│   │   ├── Pagination.jsx       # Dynamic page switcher & range indicator
│   │   └── Toast.jsx            # Auto-dismissing success/alert banners
│   ├── employees/
│   │   ├── EmployeeCard.jsx     # Mobile-friendly card UI with status chips
│   │   ├── EmployeeForm.jsx     # Unified reusable form for Add & Edit
│   │   ├── EmployeeTable.jsx    # Dense desktop table view with actions
│   │   └── SearchBar.jsx        # Search input, department filter & sort controls
│   └── layout/
│       └── Navbar.jsx           # Sticky navigation header with branding & stats
├── context/
│   ├── EmployeeContext.jsx      # Global React Context with localStorage engine
│   └── useEmployees.js          # Clean custom consumer hook
├── data/
│   └── initialEmployees.js      # Realistic initial seed mock data
├── pages/
│   ├── EmployeeDetailPage.jsx   # Detailed profile route (/employees/:id)
│   ├── EmployeeFormPage.jsx     # Form route (/employees/new & :id/edit)
│   ├── EmployeeListPage.jsx     # Dashboard directory page (/employees)
│   └── NotFoundPage.jsx         # 404 route fallback
├── utils/
│   └── validators.js            # Input validation logic & regex patterns
├── App.jsx                      # App root with client route tree
├── main.jsx                     # Entry point wrapping Router & Context
└── index.css                    # Tailwind CSS directives
```

---

## 🚀 Setup & Local Execution

Follow these quick steps to get the app running locally:

### 1. Clone the Repository
```bash
git clone https://github.com/MUBASSHIRALI0710/Employee-Management-System.git
cd Employee-Management-System
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Application
You can use either `npm start` or `npm run dev`:
```bash
npm start
```
> The development server will launch at `http://localhost:5173/`. Open it in your web browser.

### 4. Build for Production
To create an optimized production bundle:
```bash
npm run build
```

---

## 🛠️ Tech Stack

* **Core:** React 19, JavaScript (ES Modules)
* **Build Tool:** Vite 8
* **Styling:** Tailwind CSS 3
* **Routing:** React Router DOM 7
* **Icons:** Lucide React
* **Persistence:** HTML5 LocalStorage API

---

## 👨‍💻 Author
- **Mubasshir Ali**
- GitHub: [@MUBASSHIRALI0710](https://github.com/MUBASSHIRALI0710)
