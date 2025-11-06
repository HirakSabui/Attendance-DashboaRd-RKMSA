# Real time Staff Attendance Management System (Ramakrishna Mission Shilpapitha) (rkmsa.in)(Username: Admin and Password: FIPL)

A lightweight front-end prototype for managing staff attendance, manual entries, and employee records. This repository contains an HTML/CSS/JS based dashboard intended for local use or as a starting point for integration with a backend.

## Key Features
- Attendance report generator (month/year/project selection)
- Designation and category filtering
- Quick edit and advanced edit attendance forms
- Manual punch in/out entry panels
- Employee management (add/edit) modals
- Export or generate staff lists (PDF buttons in UI — requires implementation/backend)

## Prerequisites
- Modern web browser (Chrome, Edge, Firefox)
- No server required for static testing. A simple local server (e.g., Live Server extension in VS Code or `python -m http.server`) is recommended to avoid file permission issues.

## How to run
1. Open the folder `c:\Users\Hirak\OneDrive\Desktop\RKMS DashBoard`.
2. Open `index4.html` in your browser:
   - Double-click the file, or
   - Serve the folder and browse to `http://localhost:8000/index4.html`.

## Usage overview
- Login form (front-end only) is at the top — customize `script.js` for authentication logic.
- Use the nav tabs to switch between:
  - Attendance Report — fetch/generate reports and apply designation filters.
  - Employee Management — add, edit, or refresh employee data.
  - Edit Attendance — advanced editing with reasons and preview.
  - Manual Entry — punch in/punch out manual records.
- Modals: `addEmployeeModal` and `editEmployeeModal` let you manage employee records.

## Project structure
- index4.html — Main UI file (entry point)
- style.css — Styling for the dashboard (if present)
- script.js — JavaScript logic for interactions (if present)
- README.md — This file

(Other assets or scripts can be added to the same folder.)

## Development notes
- The current UI is frontend-only. To persist data, connect `script.js` calls to an API/backend (Node/Express, PHP, etc.) or to local storage for prototyping.
- Buttons that imply "Generate PDF" or "Fetch Attendance Data" should be wired to backend endpoints or libraries (e.g., jsPDF) to produce actual files.

## Contributing
- Make small, focused pull requests.
- Describe changes in PRs and include screenshots for UI updates.
- Use semantic commit messages.

## License
MIT — adapt as needed for your organization.

