let authToken = ""
let employeeData = {}
let attendanceData = {}
let processedAttendanceData = {}
const editedAttendanceData = {}
const manualEntries = {}
let currentDesignationFilter = "all"
let realTimeEmployees = []

const permanentStaffFallback = [
  { id: "1", name: "Mr. Manash Ranjan Ghosh", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "2", name: "Mr. Bikash Mondal", designation: "Lecturer", department: "Mechanical Engineering" },
  { id: "3", name: "Mr. Sankha Ghosh", designation: "Lecturer", department: "Civil Engineering" },
  { id: "4", name: "Dr. Ritwik Chakraborty", designation: "Lecturer", department: "Civil Engineering" },
  { id: "5", name: "Mr. Tapan Biswas", designation: "Lecturer", department: "Science & Humanities" },
  { id: "6", name: "Mr. Sanjoy Saha", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "7", name: "Dr. Supriyo Mukherjee", designation: "Lecturer", department: "Civil Engineering" },
  { id: "8", name: "Mr. Debashis Biswas", designation: "Lecturer", department: "Mechanical Engineering" },
  { id: "9", name: "Mr. Kaushik Haldar", designation: "Lecturer", department: "Chemistry" },
  { id: "10", name: "Mr. Suvankar Basu Mallick", designation: "Lecturer", department: "Civil Engineering" },
  { id: "11", name: "Mr. Hemadri Chatterjee", designation: "Lecturer", department: "Science & Humanities" },
  {
    id: "12",
    name: "Mr. Tapas Chakraborty",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  {
    id: "13",
    name: "Mr. Rupesh Kr. Jain",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  { id: "14", name: "Mr. Debajyoti Roy Barma", designation: "Lecturer", department: "Civil Engineering" },
  { id: "15", name: "Mr. Krishnendu Haldar", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "16", name: "Mr. Subhajit Ojha", designation: "Lecturer", department: "Civil Engineering" },
  { id: "17", name: "Mr. Pritam Ghosh", designation: "Lecturer", department: "Mechanical Engineering" },
  { id: "18", name: "Mr. Sreejit Mahanta", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "19", name: "Mr. Ayan Saha", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "20", name: "Mr. Pravin Kumar", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "21", name: "Mr. Atit Sarkar", designation: "Workshop Instructor", department: "Pattern Shop" },
  { id: "22", name: "Mr. Arunava Ghosh", designation: "Workshop Instructor", department: "Mechanical Engineering" },
  {
    id: "23",
    name: "Mr. Arun Kumar Majumder",
    designation: "Workshop Instructor",
    department: "Mechanical Engineering",
  },
  { id: "24", name: "Mr. Avijit Halder", designation: "Workshop Instructor", department: "Mechanical Engineering" },
  { id: "25", name: "Mr. Amit Kumar Mondal", designation: "Workshop Instructor", department: "Mechanical Engineering" },
  { id: "26", name: "Mr. Samaresh Pal", designation: "Workshop Instructor", department: "Mechanical Engineering" },
  { id: "27", name: "Mr. Arnab Goswami", designation: "Workshop Instructor", department: "Mechanical Engineering" },
  { id: "28", name: "Mr. Santanu Bhattacharjee", designation: "Store Keeper", department: "STORE" },
  { id: "29", name: "Mr. Subal Chandra Sarkar", designation: "Store Assistant", department: "STORE" },
  { id: "30", name: "Mr. Tapas Kumar Biswas", designation: "Junior Clerk", department: "OFFICE" },
  { id: "31", name: "Mr. Rajat Mondal", designation: "Typist", department: "OFFICE" },
  { id: "32", name: "Mr. Avinaba Biswas", designation: "Laboratory Assistant", department: "Civil Engineering" },
  { id: "33", name: "Mr. Biswanath Chakraborty", designation: "Group D Staff", department: "OFFICE" },
  { id: "34", name: "Mr. Ashim Seal", designation: "Group D Staff", department: "OFFICE" },
  { id: "35", name: "Mr. Narottam Sarkar", designation: "Group D Staff", department: "OFFICE" },
  { id: "36", name: "Mr. Shyam Prakash Shaw", designation: "Group D Staff", department: "OFFICE" },
  { id: "37", name: "Mr. Arindam Das", designation: "Group D Staff", department: "OFFICE" },
  { id: "38", name: "Mr. Somen Das", designation: "Group D Staff", department: "OFFICE" },
  { id: "57", name: "Mr. Totan Halder", designation: "Workshop Instructor", department: "Mechanical Engineering" },
  { id: "58", name: "Mr. Naresh Murmu", designation: "Laboratory Assistant", department: "Electrical Engineering" },
]

const partTimeStaffFallback = [
  {
    id: "39",
    name: "Mr. Paritosh Maiti",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  {
    id: "40",
    name: "Mr. Swapan Kr. Mondal",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  {
    id: "41",
    name: "Mr. Santanu Basu",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  {
    id: "42",
    name: "Mr. Sagar Bose",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  { id: "43", name: "Mr. Subhajit Ghosh", designation: "Lecturer", department: "Civil Engineering" },
  {
    id: "44",
    name: "Mr. Partha Sarkar",
    designation: "Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  { id: "46", name: "Mr. Satyaban Basuri", designation: "Lecturer", department: "Electrical Engineering" },
  { id: "47", name: "Mr. Prasenjit Das", designation: "Lecturer", department: "Dept1" },
  { id: "48", name: "Mr. Subhash Kr. Nandy", designation: "Junior Lecturer", department: "Mechanical Engineering" },
  {
    id: "49",
    name: "Mr. Anjan Sengupta",
    designation: "Junior Lecturer",
    department: "Electronics & Telecommunication Engineering",
  },
  {
    id: "50",
    name: "Mr. Subrata Kr. Brahma",
    designation: "Laboratory Assistant (Part-Time)",
    department: "Civil Engineering",
  },
  {
    id: "51",
    name: "Mr. Biswajit Halder",
    designation: "Group D cum Electrician ",
    department: "Electrical Engineering",
  },
  {
    id: "52",
    name: "Mr. Ramajiban Layek",
    designation: "Maintenance Supervisor",
    department: "Mechanical Engineering",
  },
]

const allStaffFallback = [...permanentStaffFallback, ...partTimeStaffFallback]

function normalizeNameForComparison(name) {
  if (!name || typeof name !== "string") return ""
  return removeSalutation(name)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[^\w\s]/g, "")
}

function areNamesSimilar(name1, name2) {
  const norm1 = normalizeNameForComparison(name1)
  const norm2 = normalizeNameForComparison(name2)

  if (norm1 === norm2) return true

  const words1 = norm1.split(" ").filter((w) => w.length > 2)
  const words2 = norm2.split(" ").filter((w) => w.length > 2)

  if (words1.length >= 2 && words2.length >= 2) {
    const matches = words1.filter((w1) => words2.some((w2) => w1.includes(w2) || w2.includes(w1)))
    return matches.length >= 2
  }

  return false
}

function createUniqueEmployeeKey(id, name) {
  return `${id}_${normalizeNameForComparison(name)}`
}

function validateAndDeduplicateFallbackData() {
  const seen = new Map()
  const seenIds = new Set()
  const duplicates = []
  const cleanedFallback = []
  ;[...permanentStaffFallback, ...partTimeStaffFallback]
    .filter((emp) => emp.id !== "45") // Filter out employee ID 45
    .forEach((emp) => {
      const normalizedName = normalizeNameForComparison(emp.name)

      if (seenIds.has(emp.id)) {
        duplicates.push({
          type: "ID_DUPLICATE",
          duplicate: emp,
          original: cleanedFallback.find((e) => e.id === emp.id),
        })
        return
      }

      const existing = Array.from(seen.values()).find((existingEmp) => areNamesSimilar(existingEmp.name, emp.name))

      if (existing) {
        duplicates.push({
          type: "NAME_SIMILAR",
          duplicate: emp,
          original: existing,
        })

        if (Number.parseInt(emp.id) < Number.parseInt(existing.id)) {
          const existingIndex = cleanedFallback.findIndex((e) => e.id === existing.id)
          if (existingIndex !== -1) {
            cleanedFallback[existingIndex] = emp
            seen.set(normalizedName, emp)
            seenIds.delete(existing.id)
            seenIds.add(emp.id)
          }
        }
      } else {
        seen.set(normalizedName, emp)
        seenIds.add(emp.id)
        cleanedFallback.push(emp)
      }
    })

  cleanedFallback.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id))

  return {
    cleanedData: cleanedFallback,
    duplicates: duplicates,
    removedCount: duplicates.length,
  }
}

async function fetchEmployeesFromAPI() {
  try {
    const response = await fetch("http://localhost/SmartFace/Platform/EmployeeApprover/GetEmployeeApproverDetails", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        AuthToken: authToken,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const apiData = await response.json()

    if (!Array.isArray(apiData) || apiData.length === 0) {
      return processEmployeeFallbackData()
    }

    const processedEmployees = []
    const seenNames = new Map()
    const seenIds = new Set()
    const apiDuplicates = []

    apiData.forEach((employee, index) => {
      const empId =
        employee.EmpID ||
        employee.EmployeeID ||
        employee.ID ||
        employee.WorkerID ||
        employee.ApproverID ||
        (index + 1).toString()

      // Skip employee ID 45
      if (empId === "45" || empId === 45) {
        return
      }

      const empName =
        employee.EmpName ||
        employee.EmployeeName ||
        employee.Name ||
        employee.WorkerName ||
        employee.ApproverName ||
        `Employee ${empId}`

      const empDesignation = employee.Designation || employee.Position || employee.JobTitle || mapDesignationById(empId)

      const empDepartment = employee.Department || employee.Dept || employee.Division || mapDepartmentById(empId)

      const validId = empId.toString().trim()
      const normalizedName = normalizeNameForComparison(empName)

      if (seenIds.has(validId)) {
        apiDuplicates.push({
          type: "API_ID_DUPLICATE",
          employee: { id: validId, name: empName },
        })
        return
      }

      const existingSimilar = Array.from(seenNames.values()).find((existing) => areNamesSimilar(existing.name, empName))

      if (existingSimilar) {
        apiDuplicates.push({
          type: "API_NAME_SIMILAR",
          employee: { id: validId, name: empName },
          existing: existingSimilar,
        })
        return
      }

      if (validId && empName) {
        const employeeObj = {
          id: validId,
          name: empName.trim(),
          designation: empDesignation,
          department: empDepartment,
          isActive: employee.IsActive !== false,
          apiSource: true,
        }

        processedEmployees.push(employeeObj)
        seenNames.set(normalizedName, employeeObj)
        seenIds.add(validId)
      }
    })

    const finalEmployeeList = mergeAPIDataWithFallback(processedEmployees)
    realTimeEmployees = finalEmployeeList

    employeeData = {}
    finalEmployeeList.forEach((emp) => {
      employeeData[emp.id] = {
        name: emp.name,
        dept: emp.department,
        desig: emp.designation,
      }
    })

    return finalEmployeeList
  } catch (error) {
    console.error("Error fetching employees from API:", error)
    return processEmployeeFallbackData()
  }
}

function mergeAPIDataWithFallback(apiEmployees) {
  const validationResult = validateAndDeduplicateFallbackData()
  const cleanedFallback = validationResult.cleanedData

  const mergedEmployees = []
  const seenNames = new Map()
  const seenIds = new Set()
  const mergeConflicts = []

  // Process API employees first, excluding ID 45
  apiEmployees
    .filter((emp) => emp.id !== "45") // Filter out employee ID 45
    .forEach((apiEmp) => {
      const normalizedName = normalizeNameForComparison(apiEmp.name)
      const empId = apiEmp.id.toString()

      const existsById = seenIds.has(empId)
      const existsBySimilarName = Array.from(seenNames.values()).find((existing) =>
        areNamesSimilar(existing.name, apiEmp.name),
      )

      if (!existsById && !existsBySimilarName) {
        mergedEmployees.push(apiEmp)
        seenNames.set(normalizedName, apiEmp)
        seenIds.add(empId)
      } else {
        if (existsById) {
          mergeConflicts.push({
            type: "ID_CONFLICT",
            apiEmployee: apiEmp,
          })
        }
        if (existsBySimilarName) {
          mergeConflicts.push({
            type: "NAME_CONFLICT",
            apiEmployee: apiEmp,
            existing: existsBySimilarName,
          })
        }
      }
    })

  // Process fallback employees, excluding ID 45
  cleanedFallback
    .filter((emp) => emp.id !== "45") // Filter out employee ID 45
    .forEach((fallbackEmp) => {
      const normalizedName = normalizeNameForComparison(fallbackEmp.name)
      const empId = fallbackEmp.id.toString()

      const existsById = seenIds.has(empId)
      const existsBySimilarName = Array.from(seenNames.values()).find((existing) =>
        areNamesSimilar(existing.name, fallbackEmp.name),
      )

      if (!existsById && !existsBySimilarName) {
        const fallbackEmployee = {
          id: empId,
          name: fallbackEmp.name,
          designation: fallbackEmp.designation,
          department: fallbackEmp.department,
          isActive: true,
          apiSource: false,
        }

        mergedEmployees.push(fallbackEmployee)
        seenNames.set(normalizedName, fallbackEmployee)
        seenIds.add(empId)
      }
    })

  mergedEmployees.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id))
  return mergedEmployees
}

function processEmployeeFallbackData() {
  const validationResult = validateAndDeduplicateFallbackData()

  const fallbackEmployees = validationResult.cleanedData
    .filter((emp) => emp.id !== "45") // Filter out employee ID 45
    .map((emp) => ({
      id: emp.id,
      name: emp.name,
      designation: emp.designation,
      department: emp.department,
      isActive: true,
      apiSource: false,
    }))

  employeeData = {}
  fallbackEmployees.forEach((emp) => {
    employeeData[emp.id] = {
      name: emp.name,
      dept: emp.department,
      desig: emp.designation,
    }
  })

  return fallbackEmployees
}

function mapDesignationById(empId) {
  // Skip ID 45
  if (empId === "45" || empId === 45) {
    return null
  }

  const staff = allStaffFallback.find((s) => s.id === empId.toString())
  if (staff) return staff.designation

  const id = Number.parseInt(empId)
  if (id >= 1 && id <= 20) return "Lecturer"
  if (id >= 21 && id <= 27 && id === 57) return "Workshop Instructor"
  if (id === 28) return "Store Keeper"
  if (id === 29) return "Store Assistant"
  if (id === 30) return "Junior Clerk"
  if (id === 31) return "Typist"
  if (id === 32 && id <= 58) return "Laboratory Assistant"
  if (id >= 33 && id <= 38) return "Group D Staff"
  if (id >= 39 && id <= 47 && id !== 45) return "Lecturer"
  if (id >= 48 && id <= 49) return "Junior Lecturer"
  if (id === 50) return "Laboratory Assistant"
  if (id === 51) return "Group D cum Electrician"
  if (id === 52) return "Maintenance Supervisor"

  return "Staff Member"
}

function mapDepartmentById(empId) {
  // Skip ID 45
  if (empId === "45" || empId === 45) {
    return null
  }

  const staff = allStaffFallback.find((s) => s.id === empId.toString())
  return staff ? staff.department : "OFFICE"
}

function removeSalutation(fullName) {
  if (!fullName || typeof fullName !== "string") return fullName

  const salutations = [
    "Mr\\.?",
    "Mrs\\.?",
    "Ms\\.?",
    "Miss",
    "Dr\\.?",
    "Prof\\.?",
    "Professor",
    "Sir",
    "Madam",
    "Mam",
    "Shri",
    "Smt\\.?",
    "Swami",
    "Sri",
    "Sree",
    "Brahm\\.?",
    "Rev\\.?",
    "Father",
    "Brother",
    "Sister",
  ]

  const salutationPattern = new RegExp(`^(${salutations.join("|")})\\s+`, "i")
  return fullName.replace(salutationPattern, "").trim()
}

function getCurrentStaffList() {
  // Filter out employee ID 45 from the current staff list
  const currentList = realTimeEmployees.length > 0 ? realTimeEmployees : allStaffFallback
  return currentList.filter((emp) => emp.id !== "45")
}

function getEmployeeDesignation(employeeId) {
  // Skip ID 45
  if (employeeId === "45" || employeeId === 45) {
    return null
  }

  const currentStaff = getCurrentStaffList()
  const staff = currentStaff.find((s) => s.id === employeeId.toString())
  return staff ? staff.designation : mapDesignationById(employeeId)
}

function getEmployeeDepartment(employeeId) {
  // Skip ID 45
  if (employeeId === "45" || employeeId === 45) {
    return null
  }

  const currentStaff = getCurrentStaffList()
  const staff = currentStaff.find((s) => s.id === employeeId.toString())
  return staff ? staff.department : mapDepartmentById(employeeId)
}

function isPermanentStaff(employeeId) {
  const id = Number.parseInt(employeeId)
  // Permanent staff IDs are 1-38 and 57-58, excluding 45
  return (id >= 1 && id <= 38) || (id >= 57 && id <= 58)
}

function isPartTimeStaff(employeeId) {
  const id = Number.parseInt(employeeId)
  // Exclude ID 45 from part-time staff check
  return id >= 39 && id <= 52 && id !== 45
}

function getStaffDetails(employeeId) {
  // Skip ID 45
  if (employeeId === "45" || employeeId === 45) {
    return null
  }

  const currentStaff = getCurrentStaffList()
  const staff = currentStaff.find((s) => s.id === employeeId.toString())
  return staff || null
}

function updateDesignationFilter() {
  const filterSelect = document.getElementById("designationFilter")
  const filterInfo = document.getElementById("filterInfo")
  const currentFilter = document.getElementById("currentFilter")

  currentDesignationFilter = filterSelect.value
  currentFilter.textContent = filterSelect.selectedOptions[0].text

  if (currentDesignationFilter !== "all") {
    filterInfo.style.display = "block"
  } else {
    filterInfo.style.display = "none"
  }

  if (processedAttendanceData?.employees?.length) {
    updateFilteredEmployeeCount()
  }
}

function updateFilteredEmployeeCount() {
  if (!processedAttendanceData?.employees?.length) return

  let employees = processedAttendanceData.employees.filter((emp) => emp.id !== "45") // Filter out employee ID 45

  let filteredCount = employees.length

  if (currentDesignationFilter === "permanent-staff") {
    employees = employees.filter((emp) => emp.isPermanent)
    filteredCount = employees.length
  } else if (currentDesignationFilter === "part-time-staff") {
    employees = employees.filter((emp) => emp.isPartTime)
    filteredCount = employees.length
  } else if (currentDesignationFilter === "lecturer") {
    employees = employees.filter((emp) => emp.designation === "Lecturer")
    filteredCount = employees.length
  } else if (currentDesignationFilter === "workshop-instructor") {
    employees = employees.filter((emp) => emp.designation === "Workshop Instructor")
    filteredCount = employees.length
  } else if (currentDesignationFilter === "junior-lecturer") {
    employees = employees.filter((emp) => emp.designation === "Junior Lecturer")
    filteredCount = employees.length
  } else if (currentDesignationFilter === "laboratory-assistant") {
    employees = employees.filter((emp) => emp.designation === "Laboratory Assistant")
    filteredCount = employees.length
  } else if (currentDesignationFilter === "group-d-staff") {
    employees = employees.filter((emp) => emp.designation.includes("Group D Staff"))
    filteredCount = employees.length
  } else if (currentDesignationFilter === "office-support-staff") {
    // NEW: Combined filter for office support staff
    employees = employees.filter((emp) =>
      ["Store Keeper", "Store Assistant", "Junior Clerk", "Typist", "Laboratory Assistant"].includes(emp.designation),
    )
    filteredCount = employees.length
  }

  const filteredCountElement = document.getElementById("filteredCount")
  if (filteredCountElement) {
    filteredCountElement.textContent = filteredCount
  }
}

function applyDesignationFilter() {
  if (!processedAttendanceData?.employees?.length) {
    showMessage("Please fetch attendance data first before applying filters.", "warning", "reportContainer")
    return
  }

  // Update the filtered count display
  updateFilteredEmployeeCount()

  const month = document.getElementById("monthSelect").value
  const year = document.getElementById("yearSelect").value

  // Regenerate the report with the current filter
  generateSimplePDFReport(processedAttendanceData, month, year)

  showMessage(
    `Filter applied: ${document.getElementById("designationFilter").selectedOptions[0].text}`,
    "success",
    "reportContainer",
  )
}

async function login(event) {
  event.preventDefault()

  const username = document.getElementById("username").value.trim()
  const password = document.getElementById("password").value.trim()
  const errorDiv = document.getElementById("loginError")

  errorDiv.innerHTML = ""

  if (!username || !password) {
    errorDiv.innerHTML = '<div class="alert alert-danger">Please enter both username and password.</div>'
    return
  }

  try {
    const response = await fetch(
      `http://localhost/smartface/api/BaseApi/Login?UserName=${encodeURIComponent(username)}&Password=${encodeURIComponent(password)}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    const result = await response.json()
    authToken = result.AuthToken || "authenticated"

    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("username", username)
    localStorage.setItem("authToken", authToken)

    document.getElementById("currentUser").textContent = username

    document.getElementById("loginSection").style.display = "none"
    document.getElementById("mainContainer").style.display = "block"

    await fetchEmployeesFromAPI()

    loadDashboardStats()
    loadEmployeeList()
  } catch (error) {
    errorDiv.innerHTML = `<div class="alert alert-error">Login failed: ${error.message}</div>`
  }
}

function splitDateTime(iso) {
  const [date, time] = iso.split("T")
  return { date: date, time: time ? time.split(".")[0] : "" }
}

function processAttendanceDataWithDateRange(rawData, fromDate, toDate) {
  const employeeMap = new Map()
  const nameToIdMap = new Map()
  const processedRecords = new Set()
  const attendanceConflicts = []

  const startDate = new Date(fromDate)
  const endDate = new Date(toDate)
  const allDatesInRange = []

  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    allDatesInRange.push(d.toISOString().split("T")[0])
  }

  rawData.forEach((record, index) => {
    const employeeId = record.WorkerID?.toString().trim()
    const employeeName = record.WorkerName?.toString().trim()

    if (!employeeId || !employeeName) return

    const normalizedName = normalizeNameForComparison(employeeName)
    const recordKey = `${employeeId}_${record.AttendanceDateTime}_${record.PunchType}`

    if (processedRecords.has(recordKey)) {
      return
    }
    processedRecords.add(recordKey)

    const existingIdForName = nameToIdMap.get(normalizedName)
    if (existingIdForName && existingIdForName !== employeeId) {
      const fallbackEmployee = allStaffFallback.find((s) => s.id === employeeId || s.id === existingIdForName)
      const preferredId = fallbackEmployee
        ? fallbackEmployee.id
        : Number.parseInt(employeeId) < Number.parseInt(existingIdForName)
          ? employeeId
          : existingIdForName

      attendanceConflicts.push({
        type: "NAME_ID_CONFLICT",
        conflictingName: employeeName,
        ids: [employeeId, existingIdForName],
        resolvedId: preferredId,
      })

      if (!employeeMap.has(preferredId)) {
        const staffDetails = getStaffDetails(preferredId)
        employeeMap.set(preferredId, {
          id: preferredId,
          name: employeeName,
          fullName: employeeName,
          cleanName: removeSalutation(employeeName),
          designation: staffDetails ? staffDetails.designation : mapDesignationById(preferredId),
          department: staffDetails ? staffDetails.department : mapDepartmentById(preferredId),
          isPermanent: isPermanentStaff(preferredId),
          isPartTime: isPartTimeStaff(preferredId),
          staffType: isPermanentStaff(preferredId)
            ? "Permanent"
            : isPartTimeStaff(preferredId)
              ? "Part-time"
              : "Unknown",
          attendance: new Map(),
          conflictResolved: true,
        })
      }
      return
    }

    nameToIdMap.set(normalizedName, employeeId)

    if (!employeeMap.has(employeeId)) {
      const staffDetails = getStaffDetails(employeeId)
      const designation = staffDetails ? staffDetails.designation : mapDesignationById(employeeId)
      const department = staffDetails ? staffDetails.department : mapDepartmentById(employeeId)
      const isPermanent = isPermanentStaff(employeeId)
      const isPartTime = isPartTimeStaff(employeeId)

      employeeMap.set(employeeId, {
        id: employeeId,
        name: employeeName,
        fullName: employeeName,
        cleanName: removeSalutation(employeeName),
        designation: designation,
        department: department,
        isPermanent: isPermanentStaff(employeeId), // This should be true for permanent staff
        isPartTime: isPartTimeStaff(employeeId), // This should be true for part-time staff
        staffType: isPermanent ? "Permanent" : isPartTime ? "Part-time" : "Unknown",
        attendance: new Map(),
        conflictResolved: false,
      })
    }
  })

  const validationResult = validateAndDeduplicateFallbackData()
  validationResult.cleanedData.forEach((staff) => {
    const normalizedName = normalizeNameForComparison(staff.name)
    const existingIdForName = nameToIdMap.get(normalizedName)

    if (!existingIdForName && !employeeMap.has(staff.id)) {
      employeeMap.set(staff.id, {
        id: staff.id,
        name: staff.name,
        fullName: staff.name,
        cleanName: removeSalutation(staff.name),
        designation: staff.designation,
        department: staff.department,
        isPermanent: isPermanentStaff(staff.id),
        isPartTime: isPartTimeStaff(staff.id),
        staffType: isPermanentStaff(staff.id) ? "Permanent" : isPartTimeStaff(staff.id) ? "Part-time" : "Unknown",
        attendance: new Map(),
        fromExcel: true,
      })

      nameToIdMap.set(normalizedName, staff.id)
    }
  })

  const attendancePivot = {}
  rawData.forEach((record) => {
    const employeeId = record.WorkerID?.toString().trim()
    const attendanceDateTime = record.AttendanceDateTime
    const punchType = record.PunchType?.toString().trim().toUpperCase()

    if (!employeeId || !attendanceDateTime || !employeeMap.has(employeeId)) {
      return
    }

    const { date, time } = splitDateTime(attendanceDateTime)

    if (!attendancePivot[date]) {
      attendancePivot[date] = {}
    }
    if (!attendancePivot[date][employeeId]) {
      attendancePivot[date][employeeId] = { inTimes: [], outTimes: [] }
    }

    if (punchType === "I") {
      attendancePivot[date][employeeId].inTimes.push(time)
    } else if (punchType === "O") {
      attendancePivot[date][employeeId].outTimes.push(time)
    }
  })

  const finalEmployees = []
  employeeMap.forEach((employee, employeeId) => {
    const finalAttendance = {}

    allDatesInRange.forEach((dateStr) => {
      const dayKey = new Date(dateStr).getDate().toString().padStart(2, "0")
      const dayData = attendancePivot[dateStr] && attendancePivot[dateStr][employeeId]

      if (dayData) {
        const inTimes = dayData.inTimes.sort()
        const outTimes = dayData.outTimes.sort()

        finalAttendance[dayKey] = {
          date: dateStr,
          in: inTimes.length > 0 ? inTimes[0] : "",
          out: outTimes.length > 0 ? outTimes[outTimes.length - 1] : "",
          totalPunches: inTimes.length + outTimes.length,
          status: "original",
          remarks: "",
        }
      } else {
        finalAttendance[dayKey] = {
          date: dateStr,
          in: "",
          out: "",
          totalPunches: 0,
          status: "original",
          remarks: "",
        }
      }
    })

    finalEmployees.push({
      id: employeeId,
      name: employee.fullName,
      cleanName: employee.cleanName,
      displayName: employee.cleanName,
      designation: employee.designation,
      department: employee.department,
      isPermanent: employee.isPermanent,
      isPartTime: employee.isPartTime,
      staffType: employee.staffType,
      attendance: finalAttendance,
      conflictResolved: employee.conflictResolved || false,
      fromExcel: employee.fromExcel || false,
    })
  })

  finalEmployees.sort((a, b) => Number.parseInt(a.id) - Number.parseInt(b.id))

  const permanentCount = finalEmployees.filter((e) => e.isPermanent).length
  const partTimeCount = finalEmployees.filter((e) => e.isPartTime).length

  return {
    employees: finalEmployees,
    totalEmployees: finalEmployees.length,
    permanentCount: permanentCount,
    partTimeCount: partTimeCount,
    rawRecords: rawData.length,
    uniqueNames: nameToIdMap.size,
    duplicatesRemoved: validationResult.removedCount + attendanceConflicts.length,
    conflictsResolved: attendanceConflicts.length,
    excelEmployees: finalEmployees.filter((e) => e.fromExcel).length,
    dateRange: allDatesInRange,
    totalDaysInRange: allDatesInRange.length,
  }
}

async function fetchAttendance() {
  const projectId = document.getElementById("projectId").value.trim()
  const projectCode = document.getElementById("projectCode").value.trim()
  const month = document.getElementById("monthSelect").value
  const year = document.getElementById("yearSelect").value

  if (!projectId || !projectCode || !month || !year) {
    showMessage("All fields are required.", "error", "reportContainer")
    return
  }

  document.getElementById("reportContainer").innerHTML = '<div class="loading">Fetching attendance data...</div>'

  const monthNum = Number.parseInt(month)
  const yearNum = Number.parseInt(year)
  const lastDay = new Date(yearNum, monthNum, 0).getDate()

  const fromDate = `${yearNum}-${monthNum.toString().padStart(2, "0")}-01`
  const toDate = `${yearNum}-${monthNum.toString().padStart(2, "0")}-${lastDay.toString().padStart(2, "0")}`

  try {
    const response = await fetch("http://localhost/smartface/api/Attendance/GetAttendanceDataByCreatedOn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        AuthToken: authToken,
      },
      body: JSON.stringify({
        ProjectId: projectId,
        ProjectCode: projectCode,
        CreatedFromDate: fromDate + " 00:00:00",
        CreatedToDate: toDate + " 23:59:59",
      }),
    })

    if (!response.ok) {
      throw new Error(response.status === 401 ? "Unauthorized" : "Fetch error")
    }

    const rawData = await response.json()

    if (!Array.isArray(rawData) || rawData.length === 0) {
      showMessage("No attendance data found for the selected period.", "error", "reportContainer")
      return
    }

    attendanceData = rawData
    processedAttendanceData = processAttendanceDataWithDateRange(rawData, fromDate, toDate)

    applyEditedData()
    applyManualEntries()

    generateSimplePDFReport(processedAttendanceData, month, year)

    showMessage(
      `Successfully processed ${rawData.length} attendance records for ${processedAttendanceData.totalEmployees} unique employees! (${processedAttendanceData.permanentCount} Permanent, ${processedAttendanceData.partTimeCount} Part-time) - Includes ALL ${processedAttendanceData.totalDaysInRange} days from ${fromDate} to ${toDate}`,
      "success",
      "reportContainer",
    )

    document.getElementById("totalEmployees").textContent = processedAttendanceData.totalEmployees
    updateFilteredEmployeeCount()
  } catch (error) {
    console.error("Fetch error:", error)
    showMessage(`Error fetching data: ${error.message}`, "error", "reportContainer")
  }
}

function applyEditedData() {
  if (!processedAttendanceData?.employees || Object.keys(editedAttendanceData).length === 0) {
    return
  }

  processedAttendanceData.employees.forEach((employee) => {
    const empId = employee.id

    if (editedAttendanceData[empId]) {
      Object.keys(editedAttendanceData[empId]).forEach((dayKey) => {
        const editedDay = editedAttendanceData[empId][dayKey]

        if (!employee.attendance[dayKey]) {
          employee.attendance[dayKey] = {}
        }

        employee.attendance[dayKey] = {
          ...employee.attendance[dayKey],
          ...editedDay,
          status: "edited",
        }
      })
    }
  })
}

function applyManualEntries() {
  if (!processedAttendanceData?.employees || Object.keys(manualEntries).length === 0) {
    return
  }

  processedAttendanceData.employees.forEach((employee) => {
    const empId = employee.id

    if (manualEntries[empId]) {
      Object.keys(manualEntries[empId]).forEach((dayKey) => {
        const manualEntry = manualEntries[empId][dayKey]

        if (!employee.attendance[dayKey]) {
          employee.attendance[dayKey] = {
            date: manualEntry.date,
            in: "",
            out: "",
            totalPunches: 0,
            status: "manual",
            remarks: "",
          }
        }

        if (manualEntry.in) employee.attendance[dayKey].in = manualEntry.in
        if (manualEntry.out) employee.attendance[dayKey].out = manualEntry.out
        if (manualEntry.remarks) {
          employee.attendance[dayKey].remarks = employee.attendance[dayKey].remarks
            ? employee.attendance[dayKey].remarks + "; " + manualEntry.remarks
            : manualEntry.remarks
        }
        employee.attendance[dayKey].status = "manual"
      })
    }
  })
}

function updateIndividualDutyField(empId, date, field, value) {
  const dayKey = date.split("-")[2]

  if (!editedAttendanceData[empId]) {
    editedAttendanceData[empId] = {}
  }

  if (!editedAttendanceData[empId][dayKey]) {
    editedAttendanceData[empId][dayKey] = {
      date: date,
      editedAt: new Date().toISOString(),
      editedBy: document.getElementById("currentUser").textContent,
    }
  }
if (field === "in-time") {
    editedAttendanceData[empId][dayKey].in = value
    // Preserve existing type if it's already set, otherwise default to night-duty
    if (!editedAttendanceData[empId][dayKey].type) {
      editedAttendanceData[empId][dayKey].type = "night-duty"
    }
  } else if (field === "out-time") {
    editedAttendanceData[empId][dayKey].out = value
    // Preserve existing type if it's already set, otherwise default to night-duty
    if (!editedAttendanceData[empId][dayKey].type) {
      editedAttendanceData[empId][dayKey].type = "night-duty"
    }
  }
  // Update only the specific field
  if (field === "in-time") {
    editedAttendanceData[empId][dayKey].in = value
    // Preserve existing type if it's already set, otherwise default to on-duty
    if (!editedAttendanceData[empId][dayKey].type) {
      editedAttendanceData[empId][dayKey].type = "on-duty"
    }
  } else if (field === "out-time") {
    editedAttendanceData[empId][dayKey].out = value
    // Preserve existing type if it's already set, otherwise default to on-duty
    if (!editedAttendanceData[empId][dayKey].type) {
      editedAttendanceData[empId][dayKey].type = "on-duty"
    }
  }

  // Update the processed data immediately
  if (processedAttendanceData?.employees) {
    const employee = processedAttendanceData.employees.find((emp) => emp.id === empId)
    if (employee) {
      if (!employee.attendance[dayKey]) {
        employee.attendance[dayKey] = {}
      }
 if (field === "in-time") {
        employee.attendance[dayKey].in = value
        if (!employee.attendance[dayKey].type) {
          employee.attendance[dayKey].type = "night-duty"
        }
      } else if (field === "out-time") {
        employee.attendance[dayKey].out = value
        if (!employee.attendance[dayKey].type) {
          employee.attendance[dayKey].type = "night-duty"
        }
      }
      // Only update the specific field, preserve other data including type
      if (field === "in-time") {
        employee.attendance[dayKey].in = value
        if (!employee.attendance[dayKey].type) {
          employee.attendance[dayKey].type = "on-duty"
        }
      } else if (field === "out-time") {
        employee.attendance[dayKey].out = value
        if (!employee.attendance[dayKey].type) {
          employee.attendance[dayKey].type = "on-duty"
        }
      }

      employee.attendance[dayKey].status = "edited"
    }
  }

  showMessage(`${field} updated for Employee ${empId} on ${date}`, "success", "reportContainer")
}

// NEW ENHANCED FUNCTION: Create editable time input for duty records
function createEditableTimeInput(empId, date, field, currentValue) {
  const input = document.createElement("input")
  input.type = "time"
  input.value = currentValue || ""
  input.className = "duty-time-input"
  input.style.fontSize = "10px"
  input.style.width = "70px"
  input.style.border = "1px solid #ccc"
  input.style.borderRadius = "3px"
  input.style.padding = "2px"

  // FIX ➜ Ensure edited input is centered like the static cell
  input.style.textAlign = "center"
  input.style.display = "inline-block"
  input.style.verticalAlign = "middle"

  input.addEventListener("change", function () {
    updateIndividualDutyField(empId, date, field, this.value)
    const timeDisplay = this.parentElement.querySelector(".time-display")
    if (timeDisplay) {
      timeDisplay.textContent = this.value || "On Duty"
    }
  })

  input.addEventListener("blur", function () {
    this.style.display = "none"
    const timeDisplay = this.parentElement.querySelector(".time-display")
    if (timeDisplay) {
      timeDisplay.style.display = "block"
    }
  })

  return input
}

// NEW ENHANCED FUNCTION: Create clickable time display for duty records
function createClickableTimeDisplay(empId, date, field, timeValue, dutyType = "on-duty") {
  const display = document.createElement("div")
  display.className = "time-display clickable-time"

  // Set appropriate display text based on duty type
  const displayText = timeValue || (dutyType === "night-duty" ? "Night Duty" : "On Duty")
  display.textContent = displayText

  display.style.cursor = "pointer"
  display.style.fontSize = "12px"
  display.style.padding = "2px"
  display.style.borderRadius = "3px"

  if (dutyType === "night-duty") {
    display.style.backgroundColor = "#f0f0ff" // Light purple for night duty
  } else {
    display.style.backgroundColor = "#f0f8ff" // Light blue for on duty
  }

  // FIX ➜ Center display in cell both horizontally and vertically
  display.style.textAlign = "center"
  display.style.display = "flex"
  display.style.justifyContent = "center"
  display.style.alignItems = "center"

  display.title = `Click to edit ${field}`

  display.addEventListener("click", function () {
    this.style.display = "none"
    const timeInput = this.parentElement.querySelector(".duty-time-input")
    if (timeInput) {
      timeInput.style.display = "inline-block"
      timeInput.focus()
    }
  })

  return display
}

function generateSimplePDFReport(processedData, month, year) {
  const container = document.getElementById("reportContainer")
  container.innerHTML = ""
  container.style.textAlign = "center" // Center-align the entire container

  if (!processedData?.employees?.length) {
    container.innerHTML = '<div class="alert alert-error">No employee data available for PDF generation</div>'
    return
  }

  let employees = processedData.employees
  let filterDescription = "All Staff"
  let filteredCount = employees.length

  if (currentDesignationFilter === "permanent-staff") {
    employees = employees.filter((emp) => emp.isPermanent)
    filterDescription = "Permanent Staff Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "part-time-staff") {
    employees = employees.filter((emp) => isPartTimeStaff(emp.id))
    filterDescription = "Part-time Staff Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "lecturer") {
    employees = employees.filter((emp) => emp.designation === "Lecturer")
    filterDescription = "Lecturers Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "workshop-instructor") {
    employees = employees.filter((emp) => emp.designation === "Workshop Instructor")
    filterDescription = "Workshop Instructors Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "junior-lecturer") {
    employees = employees.filter((emp) => emp.designation === "Junior Lecturer")
    filterDescription = "Junior Lecturers Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "laboratory-assistant") {
    employees = employees.filter((emp) => emp.designation === "Laboratory Assistant")
    filterDescription = "Laboratory Assistants Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "group-d-staff") {
    employees = employees.filter((emp) => emp.designation.includes("Group D Staff"))
    filterDescription = "Group D Staff Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "office-support-staff") {
    // NEW: Combined filter for office support staff
    employees = employees.filter((emp) =>
      ["Store Keeper", "Store Assistant", "Junior Clerk", "Typist", "Laboratory Assistant"].includes(emp.designation),
    )
    filterDescription =
      "Office Support Staff (Store Keeper, Store Assistant, Junior Clerk, Typist, Laboratory Assistant)"
    filteredCount = employees.length
  } else if (currentDesignationFilter !== "all") {
    employees = employees.filter((emp) => emp.designation === currentDesignationFilter)
    filterDescription = currentDesignationFilter + " Only"
    filteredCount = employees.length
  }

  if (employees.length === 0) {
    container.innerHTML = `<div class="alert alert-warning">No employees found for filter: ${filterDescription}</div>`
    return
  }

  const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" })
  const monthYear = `${monthName} ${year}`
  const totalDays =
    processedData.totalDaysInRange || new Date(Number.parseInt(year), Number.parseInt(month), 0).getDate()

  const filteredCountElement = document.getElementById("filteredCount")
  if (filteredCountElement) {
    filteredCountElement.textContent = filteredCount
  }

  const summaryDiv = document.createElement("div")
  summaryDiv.className = "no-print summary-section"
  summaryDiv.style.maxWidth = "800px"
  summaryDiv.style.margin = "0 auto"
  summaryDiv.style.textAlign = "left"
  summaryDiv.innerHTML = `
        <h3 style="margin: 0 0 1rem 0; text-align: center;">${filterDescription} Report Ready</h3>
        <div class="summary-grid">
            <div><strong>Period:</strong> ${monthYear} (${totalDays} days)</div>
            <div><strong>Filtered Employees:</strong> ${filteredCount}</div>
            <div><strong>Filter:</strong> ${filterDescription}</div>
            <div><strong>Data Source:</strong> EmployeeApprover API + Excel Fallback</div>
            <div><strong>Edited Records:</strong> ${Object.keys(editedAttendanceData).length}</div>
            <div><strong>Manual Entries:</strong> ${Object.keys(manualEntries).length}</div>
            <div><strong>Duplicates Removed:</strong> ${processedData.duplicatesRemoved || 0}</div>
            <div><strong>Conflicts Resolved:</strong> ${processedData.conflictsResolved || 0}</div>
            <div><strong>Excel Employees:</strong> ${processedData.excelEmployees || 0}</div>
        </div>
    `
  container.appendChild(summaryDiv)

  const employeesPerPage = 4
  const totalPages = Math.ceil(employees.length / employeesPerPage)

  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1
  const currentYear = today.getFullYear()

  for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
    const startIdx = pageIndex * employeesPerPage
    const endIdx = Math.min(startIdx + employeesPerPage, employees.length)
    const pageEmployees = employees.slice(startIdx, endIdx)

    const pageDiv = document.createElement("div")
    pageDiv.className = "print-page"
    pageDiv.style.display = "inline-block" // Center the page div
    pageDiv.style.margin = "0 auto" // Center the page div
    pageDiv.style.textAlign = "center" // Center content inside page div

    const headerDiv = document.createElement("div")
    headerDiv.className = "print-constant-header"
    headerDiv.style.textAlign = "center" // Center header text
    let headerText = `Ramakrishna Mission Shilpapitha, Belgharia, Kolkata 700056<br>Staff Attendance for ${monthYear}`
    if (currentDesignationFilter !== "all") {
      headerText += `<br><small>(${filterDescription})</small>`
    }
    headerDiv.innerHTML = headerText
    pageDiv.appendChild(headerDiv)

    const tableContainer = document.createElement("div")
    tableContainer.style.display = "inline-block" // Center the table
    tableContainer.style.margin = "0 auto" // Center the table
    tableContainer.style.textAlign = "center" // Center content inside table container

    const table = document.createElement("table")
    table.className = "simple-print-table interactive-report"
    table.style.fontSize = "12px"
    table.style.borderCollapse = "collapse"
    table.style.margin = "0 auto" // Center the table
    table.style.width = "auto" // Let table size based on content

    const thead = table.createTHead()

    const nameRow = thead.insertRow()
    const dateHeaderCell = nameRow.insertCell()
    dateHeaderCell.innerHTML = "Date"
    dateHeaderCell.rowSpan = 2
    dateHeaderCell.className = "date-col"
    dateHeaderCell.style.border = "1px solid #000"
    dateHeaderCell.style.width = "50px" // Fixed width for date column

    pageEmployees.forEach((emp) => {
      const nameCell = nameRow.insertCell()
      nameCell.colSpan = 2
      nameCell.className = "employee-header"
      nameCell.innerHTML = `${emp.displayName} (${emp.id})`
      nameCell.style.border = "1px solid #000"
      nameCell.style.textAlign = "center"
      nameCell.style.width = "150px" // Fixed width for employee columns
    })

    const timeHeaderRow = thead.insertRow()
    pageEmployees.forEach(() => {
      const inHeader = timeHeaderRow.insertCell()
      inHeader.innerHTML = "In"
      inHeader.className = "time-col"
      inHeader.style.border = "1px solid #000"
      inHeader.style.textAlign = "center"
      inHeader.style.padding = "3px"
      inHeader.style.width = "75px" // Fixed width for time columns

      const outHeader = timeHeaderRow.insertCell()
      outHeader.innerHTML = "Out"
      outHeader.className = "time-col"
      outHeader.style.border = "1px solid #000"
      outHeader.style.textAlign = "center"
      outHeader.style.padding = "3px"
      outHeader.style.width = "75px" // Fixed width for time columns
    })

    const tbody = table.createTBody()

    for (let day = 1; day <= totalDays; day++) {
      const dayStr = day.toString().padStart(2, "0")
      const dateStr = `${year}-${month.toString().padStart(2, "0")}-${dayStr}`
      const row = tbody.insertRow()

      const dateCell = row.insertCell()
      dateCell.innerHTML = dayStr
      dateCell.className = "date-col"
      dateCell.style.border = "1px solid #000"
      dateCell.style.textAlign = "center"
      dateCell.style.padding = "3px"

      pageEmployees.forEach((emp) => {
        const dayData = emp.attendance[dayStr]

        const isFutureDate =
          Number.parseInt(year) > currentYear ||
          (Number.parseInt(year) === currentYear && Number.parseInt(month) > currentMonth) ||
          (Number.parseInt(year) === currentYear && Number.parseInt(month) === currentMonth && day > currentDay)

        const formatTime = (timeStr) => {
          if (!timeStr) return ""
          return timeStr.length >= 8 ? timeStr.substring(0, 8) : timeStr
        }

        let inTime = ""
        let outTime = ""
        let status = ""
        let remarks = ""

        if (!isFutureDate && dayData) {
          remarks = dayData.remarks || ""
          status = dayData.type || ""
         
          if (dayData.type === "night-duty") {
            inTime = dayData.in || "Night Duty"
            outTime = dayData.out || "Night Duty"
          } else if (dayData.type === "on-duty") {
            inTime = dayData.in || "On Duty"
            outTime = dayData.out || "On Duty"
          } else if (dayData.type === "casual-leave") {
            inTime = "CL"
            outTime = "CL"
          } else if (dayData.type === "medical-leave") {
            inTime = "ML"
            outTime = "ML"
          } else if (dayData.type === "half-casual-leave") {
            inTime = "HCL"
            outTime = "HCL"
          } else if (dayData.type === "earn-leave") {
            inTime = "EL"
            outTime = "EL"
          } else if (dayData.type === "absent") {
            inTime = "Absent"
            outTime = "Absent"
          } else if (dayData.in || dayData.out) {
            inTime = formatTime(dayData.in)
            outTime = formatTime(dayData.out)
          }
        }

        // Create in-time cell with enhanced editing capability
        const inCell = row.insertCell()
        inCell.className = "time-col"
        inCell.style.border = "1px solid #000"
        inCell.style.textAlign = "center"
        inCell.style.padding = "3px"

        // Create time container div
        const inTimeContainer = document.createElement("div")
        inTimeContainer.className = "time-container"
        inTimeContainer.setAttribute("data-status", status)
        inTimeContainer.style.fontSize = "12px"
        inTimeContainer.style.position = "relative"

        // For on-duty and night-duty records, create editable time display
        if (status === "on-duty" || status === "night-duty") {
          const timeDisplay = createClickableTimeDisplay(emp.id, dateStr, "in-time", inTime, status)
          const timeInput = createEditableTimeInput(emp.id, dateStr, "in-time", inTime)
          timeInput.style.display = "none"

          inTimeContainer.appendChild(timeDisplay)
          inTimeContainer.appendChild(timeInput)
        } else {
          // For non-duty records, show regular time display
          const inTimeDisplay = document.createElement("div")
          inTimeDisplay.textContent = inTime
          inTimeDisplay.style.fontSize = "12px"
          inTimeContainer.appendChild(inTimeDisplay)
        }

        // Add dropdown for status selection
        const inStatusDropdown = document.createElement("select")
        inStatusDropdown.className = "attendance-status-dropdown no-print"
        inStatusDropdown.setAttribute("data-emp-id", emp.id)
        inStatusDropdown.setAttribute("data-date", dateStr)
        inStatusDropdown.setAttribute("data-field", "in")
        inStatusDropdown.style.fontSize = "10px"
        inStatusDropdown.style.width = "100%"
        inStatusDropdown.style.marginTop = "2px"

        const options = [
          { value: "", text: "-- Select --" },
          { value: "present", text: "Present" },
          { value: "absent", text: "Absent" },
          { value: "on-duty", text: "On Duty" },
          { value: "night-duty", text: "Night Duty" },
          { value: "casual-leave", text: "Casual Leave" },
          { value: "medical-leave", text: "Medical Leave" },
          { value: "half-casual-leave", text: "Half Casual Leave" },
          { value: "earn-leave", text: "Earn Leave" },
        ]

        options.forEach((opt) => {
          const option = document.createElement("option")
          option.value = opt.value
          option.textContent = opt.text
          option.selected = status === opt.value
          inStatusDropdown.appendChild(option)
        })

        inStatusDropdown.addEventListener("change", function () {
          updateAttendanceStatus(this)
        })

        inTimeContainer.appendChild(inStatusDropdown)
        inCell.appendChild(inTimeContainer)

        // Create out-time cell with enhanced editing capability
        const outCell = row.insertCell()
        outCell.className = "time-col"
        outCell.style.border = "1px solid #000"
        outCell.style.textAlign = "center"
        outCell.style.padding = "3px"

        // Create time container div for out time
        const outTimeContainer = document.createElement("div")
        outTimeContainer.className = "time-container"
        outTimeContainer.setAttribute("data-status", status)
        outTimeContainer.style.fontSize = "12px"
        outTimeContainer.style.position = "relative"

        // For on-duty and night-duty records, create editable time display
        if (status === "on-duty" || status === "night-duty") {
          const timeDisplay = createClickableTimeDisplay(emp.id, dateStr, "out-time", outTime, status)
          const timeInput = createEditableTimeInput(emp.id, dateStr, "out-time", outTime)
          timeInput.style.display = "none"

          outTimeContainer.appendChild(timeDisplay)
          outTimeContainer.appendChild(timeInput)
        } else {
          // For non-duty records, show regular time display
          const outTimeDisplay = document.createElement("div")
          outTimeDisplay.textContent = outTime
          outTimeDisplay.style.fontSize = "12px"
          outTimeContainer.appendChild(outTimeDisplay)
        }

        // Add dropdown for status selection
        const outStatusDropdown = document.createElement("select")
        outStatusDropdown.className = "attendance-status-dropdown no-print"
        outStatusDropdown.setAttribute("data-emp-id", emp.id)
        outStatusDropdown.setAttribute("data-date", dateStr)
        outStatusDropdown.setAttribute("data-field", "out")
        outStatusDropdown.style.fontSize = "10px"
        outStatusDropdown.style.width = "100%"
        outStatusDropdown.style.marginTop = "2px"

        options.forEach((opt) => {
          const option = document.createElement("option")
          option.value = opt.value
          option.textContent = opt.text
          option.selected = status === opt.value
          outStatusDropdown.appendChild(option)
        })

        outStatusDropdown.addEventListener("change", function () {
          updateAttendanceStatus(this)
        })

        outTimeContainer.appendChild(outStatusDropdown)
        outCell.appendChild(outTimeContainer)

        if (remarks) {
          inCell.className += " remarks-cell"
          inCell.title = remarks
          outCell.className += " remarks-cell"
          outCell.title = remarks
        }
      })
    }

    tableContainer.appendChild(table)
    pageDiv.appendChild(tableContainer)
    const signatureDiv = document.createElement("div")
    signatureDiv.className = "signature-line"
    signatureDiv.style.marginTop = "40px" // Add proper gap above signature
    signatureDiv.style.textAlign = "right" // Align signature to right
    signatureDiv.style.paddingRight = "100px" // Add some right padding
    signatureDiv.innerHTML = `
      <div style="border-top: 1px solid #000; width: 200px; display: inline-block;"></div>
      <div style="text-align: right; font-weight: bold;">Officer-in-Charge Signature</div>
    `
    pageDiv.appendChild(signatureDiv)
    container.appendChild(pageDiv)
  }

  const actionDiv = document.createElement("div")
  actionDiv.className = "no-print action-buttons"
  actionDiv.style.textAlign = "center" // Center action buttons
  actionDiv.style.marginTop = "20px"
  actionDiv.innerHTML = `
        <div style="margin-bottom: 1rem;">
            <button onclick="printSimplePDFPages()" class="btn btn-success">
                Print A4 Portrait Report (${totalPages} Pages) - ${filterDescription}
            </button>
            <button onclick="exportSimpleExcel()" class="btn btn-info">
                Export to Excel
            </button>
            <button onclick="refreshEmployeeData()" class="btn btn-warning">
                Refresh Employee Data
            </button>
        </div>
    `
  container.appendChild(actionDiv)
}

function updateAttendanceStatus(selectElement) {
  const empId = selectElement.getAttribute("data-emp-id")
  const date = selectElement.getAttribute("data-date")
  const field = selectElement.getAttribute("data-field")
  const status = selectElement.value

  const dayKey = date.split("-")[2]

  if (!editedAttendanceData[empId]) {
    editedAttendanceData[empId] = {}
  }

  if (!editedAttendanceData[empId][dayKey]) {
    editedAttendanceData[empId][dayKey] = {
      date: date,
      type: status,
      editedAt: new Date().toISOString(),
      editedBy: document.getElementById("currentUser").textContent,
    }
  } else {
    editedAttendanceData[empId][dayKey].type = status
  }

  // Update the processed data immediately
  if (processedAttendanceData?.employees) {
    const employee = processedAttendanceData.employees.find((emp) => emp.id === empId)
    if (employee) {
      if (!employee.attendance[dayKey]) {
        employee.attendance[dayKey] = {}
      }

      employee.attendance[dayKey] = {
        ...employee.attendance[dayKey],
        type: status,
        status: "edited",
      }
    }
  }

  // Update the other dropdown to match
  const allDropdowns = document.querySelectorAll(
    `.attendance-status-dropdown[data-emp-id="${empId}"][data-date="${date}"]`,
  )
  allDropdowns.forEach((dropdown) => {
    if (dropdown !== selectElement) {
      dropdown.value = status
    }
  })

  // Regenerate the report to reflect changes
  const month = document.getElementById("monthSelect").value
  const year = document.getElementById("yearSelect").value
  generateSimplePDFReport(processedAttendanceData, month, year)

  showMessage(`Attendance status updated for Employee ${empId} on ${date}`, "success", "reportContainer")
}

async function refreshEmployeeData() {
  showMessage("Refreshing employee data from API...", "info", "reportContainer")

  try {
    await fetchEmployeesFromAPI()
    loadEmployeeList()
    loadDashboardStats()
    showMessage("Employee data refreshed successfully!", "success", "reportContainer")
  } catch (error) {
    showMessage(`Error refreshing employee data: ${error.message}`, "error", "reportContainer")
  }
}

function printSimplePDFPages() {
  if (!processedAttendanceData?.employees?.length) {
    alert("No attendance data available. Please fetch data first.")
    return
  }

  let employees = processedAttendanceData.employees
  let filterDescription = "All Staff"
  let filteredCount = employees.length

  if (currentDesignationFilter === "permanent-staff") {
    employees = employees.filter((emp) => emp.isPermanent)
    filterDescription = "Permanent Staff Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "part-time-staff") {
    employees = employees.filter((emp) => emp.isPartTime)
    filterDescription = "Part-time Staff Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "lecturer") {
    employees = employees.filter((emp) => emp.designation === "Lecturer")
    filterDescription = "Lecturers Only"
  } else if (currentDesignationFilter === "workshop-instructor") {
    employees = employees.filter((emp) => emp.designation === "Workshop Instructor")
    filterDescription = "Workshop Instructors Only"
  } else if (currentDesignationFilter === "junior-lecturer") {
    employees = employees.filter((emp) => emp.designation === "Junior Lecturer")
    filterDescription = "Junior Lecturers Only"
  } else if (currentDesignationFilter === "laboratory-assistant") {
    employees = employees.filter((emp) => emp.designation === "Laboratory Assistant")
    filterDescription = "Laboratory Assistants Only"
  } else if (currentDesignationFilter === "group-d-staff") {
    employees = employees.filter((emp) => emp.designation.includes("Group D Staff"))
    filterDescription = "Group D Staff Only"
  } else if (currentDesignationFilter === "office-support-staff") {
    // NEW: Combined filter for office support staff
    employees = employees.filter((emp) =>
      ["Store Keeper", "Store Assistant", "Junior Clerk", "Typist", "Laboratory Assistant"].includes(emp.designation),
    )
    filterDescription = "Office Support Staff"
  } else if (currentDesignationFilter !== "all") {
    employees = employees.filter((emp) => emp.designation === currentDesignationFilter)
    filterDescription = currentDesignationFilter + " Only"
  }

  const totalPages = Math.ceil(employees.length / 4)
  const month = document.getElementById("monthSelect").selectedOptions[0].text
  const year = document.getElementById("yearSelect").value
  const totalDays =
    processedAttendanceData.totalDaysInRange ||
    new Date(Number.parseInt(year), Number.parseInt(document.getElementById("monthSelect").value), 0).getDate()

  const confirmMsg = `Print ${totalPages} A4 portrait pages with fixed footer?`

  if (confirm(confirmMsg)) {
    // Set print-specific styles before printing
    document.body.classList.add("printing")

    // Trigger print
    window.print()

    // Remove print class after printing
    setTimeout(() => {
      document.body.classList.remove("printing")
    }, 1000)
  }
}

function exportSimpleExcel() {
  if (!processedAttendanceData?.employees?.length) {
    alert("No data available for export.")
    return
  }

  let employees = processedAttendanceData.employees
  let filterDescription = "All_Staff"
  let filteredCount = employees.length

  if (currentDesignationFilter === "permanent-staff") {
    employees = employees.filter((emp) => emp.isPermanent)
    filterDescription = "Permanent_Staff_Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "part-time-staff") {
    employees = employees.filter((emp) => emp.isPartTime)
    filterDescription = "Part_time_Staff_Only"
    filteredCount = employees.length
  } else if (currentDesignationFilter === "lecturer") {
    employees = employees.filter((emp) => emp.designation === "Lecturer")
    filterDescription = "Lecturers_Only"
  } else if (currentDesignationFilter === "workshop-instructor") {
    employees = employees.filter((emp) => emp.designation === "Workshop Instructor")
    filterDescription = "Workshop_Instructors_Only"
  } else if (currentDesignationFilter === "office-support-staff") {
    // NEW: Combined filter for office support staff
    employees = employees.filter((emp) =>
      ["Store Keeper", "Store Assistant", "Junior Clerk", "Typist", "Laboratory Assistant"].includes(emp.designation),
    )
    filterDescription = "Office_Support_Staff"
  } else if (currentDesignationFilter !== "all") {
    employees = employees.filter((emp) => emp.designation === currentDesignationFilter)
    filterDescription = currentDesignationFilter.replace(/\s+/g, "_") + "_Only"
  }

  const month = document.getElementById("monthSelect").value
  const year = document.getElementById("yearSelect").value
  const monthName = new Date(year, month - 1).toLocaleString("default", { month: "long" })
  const totalDays =
    processedAttendanceData.totalDaysInRange || new Date(Number.parseInt(year), Number.parseInt(month), 0).getDate()

  let csvContent = `Ramakrishna Mission Shilpapitha - Staff Attendance Report\n`
  csvContent += `Belgharia, Kolkata 700056\n`
  csvContent += `Period: ${monthName} ${year} (${totalDays} days)\n`
  csvContent += `Filter: ${filterDescription.replace(/_/g, " ")}\n`
  csvContent += `Generated: ${new Date().toLocaleString("en-IN")}\n`
  csvContent += `Filtered Employees: ${employees.length}\n`
  csvContent += `Data Source: EmployeeApprover API + Excel Fallback\n`
  csvContent += `Edited Records: ${Object.keys(editedAttendanceData).length}\n`
  csvContent += `Manual Entries: ${Object.keys(manualEntries).length}\n`
  csvContent += `Duplicates Removed: ${processedAttendanceData.duplicatesRemoved || 0}\n`
  csvContent += `Conflicts Resolved: ${processedAttendanceData.conflictsResolved || 0}\n`
  csvContent += `Excel Employees: ${processedAttendanceData.excelEmployees || 0}\n\n`
  csvContent += `Employee ID,Clean Name,Designation,Department,Staff Type,Date,Day,In Time,Out Time,Status,Remarks,Data Source,Conflict Resolved,From Excel\n`

  employees.forEach((emp) => {
    const staffType = emp.isPermanent ? "Permanent" : emp.isPartTime ? "Part-time" : "Unknown"

    for (let day = 1; day <= totalDays; day++) {
      const dayStr = day.toString().padStart(2, "0")
      const dateStr = `${year}-${month.toString().padStart(2, "0")}-${dayStr}`
      const dayName = new Date(year, month - 1, day).toLocaleDateString("en-IN", { weekday: "long" })

      const dayData = emp.attendance[dayStr]
      let inTime = ""
      let outTime = ""
      let status = "Absent"
      let remarks = ""
      let dataSource = "Original"

      if (dayData) {
        dataSource = dayData.status === "edited" ? "Edited" : dayData.status === "manual" ? "Manual" : "API Real-time"
        remarks = dayData.remarks || ""
       
        if (dayData.type === "night-duty") {
          status = "Night Duty"
          inTime = dayData.in || "Night Duty"
          outTime = dayData.out || "Night Duty"
        } else if (dayData.type === "on-duty") {
          status = "On Duty"
          inTime = dayData.in || "On Duty"
          outTime = dayData.out || "On Duty"
        } else if (dayData.type === "casual-leave") {
          status = "Casual Leave"
          inTime = "CL"
          outTime = "CL"
        } else if (dayData.type === "medical-leave") {
          status = "Medical Leave"
          inTime = "ML"
          outTime = "ML"
        } else if (dayData.in || dayData.out) {
          status = "Present"
          inTime = dayData.in || ""
          outTime = dayData.out || ""
        }
      }

      csvContent += `${emp.id},"${emp.displayName}","${emp.designation}","${emp.department}","${staffType}",${dateStr},${dayName},${inTime},${outTime},${status},"${remarks}",${dataSource},${emp.conflictResolved ? "Yes" : "No"},${emp.fromExcel ? "Yes" : "No"}\n`
    }
  })

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${filterDescription}_Attendance_${monthName}_${year}_Office_Support_Staff_Combined.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  showMessage(
    `${filterDescription.replace(/_/g, " ")} attendance export completed with combined Office Support Staff filter!`,
    "success",
    "reportContainer",
  )
}

// Rest of the functions remain the same...
function quickUpdateAttendance() {
  const empId = document.getElementById("quickEditEmployeeId").value.trim()
  const date = document.getElementById("quickEditDate").value
  const type = document.getElementById("quickEditType").value
  const inTime = document.getElementById("quickEditInTime").value
  const outTime = document.getElementById("quickEditOutTime").value
  const remarks = document.getElementById("quickEditRemarks").value.trim()

  if (!empId || !date || !type) {
    showMessage("Employee ID, Date, and Type are required.", "error", "reportContainer")
    return
  }

  const currentStaff = getCurrentStaffList()
  const employeeExists = currentStaff.find((emp) => emp.id === empId)
  if (!employeeExists) {
    showMessage(`Employee ID ${empId} not found in system. Please check the ID.`, "error", "reportContainer")
    return
  }

  const dayKey = date.split("-")[2]

  if (!editedAttendanceData[empId]) {
    editedAttendanceData[empId] = {}
  }

  const editedData = {
    date: date,
    type: type,
    remarks: remarks,
    editedAt: new Date().toISOString(),
    editedBy: document.getElementById("currentUser").textContent,
  }

  if (type === "present" || type === "night-duty" || type === "on-duty" || type === "earn-leave") {
    editedData.in = inTime
    editedData.out = outTime
  } else {
    editedData.in = ""
    editedData.out = ""
  }

  editedAttendanceData[empId][dayKey] = editedData

  if (processedAttendanceData?.employees) {
    const employee = processedAttendanceData.employees.find((emp) => emp.id === empId)
    if (employee) {
      if (!employee.attendance[dayKey]) {
        employee.attendance[dayKey] = {}
      }

      employee.attendance[dayKey] = {
        ...employee.attendance[dayKey],
        ...editedData,
        status: "edited",
      }

      const month = document.getElementById("monthSelect").value
      const year = document.getElementById("yearSelect").value
      generateSimplePDFReport(processedAttendanceData, month, year)
    }
  }

  showMessage(
    `Quick attendance update completed for Employee ${empId} (${employeeExists.name}) on ${date}! Report refreshed with Office Support Staff filter capability.`,
    "success",
    "reportContainer",
  )

  document.getElementById("quickEditEmployeeId").value = ""
  document.getElementById("quickEditInTime").value = ""
  document.getElementById("quickEditOutTime").value = ""
  document.getElementById("quickEditRemarks").value = ""
}

function addManualAttendance() {
  const empId = document.getElementById("manualEmpId").value.trim()
  const date = document.getElementById("manualEntryDate").value
  const type = document.getElementById("manualEntryType").value
  const inTime = document.getElementById("manualInTime").value
  const outTime = document.getElementById("manualOutTime").value
  const remarks = document.getElementById("manualRemarks").value.trim()

  if (!empId || !date || !type) {
    showMessage("Employee ID, Date, and Type are required.", "error", "reportContainer")
    return
  }

  const currentStaff = getCurrentStaffList()
  const employeeExists = currentStaff.find((emp) => emp.id === empId)
  if (!employeeExists) {
    showMessage(`Employee ID ${empId} not found in system. Please check the ID.`, "error", "reportContainer")
    return
  }

  const dayKey = date.split("-")[2]

  if (!manualEntries[empId]) {
    manualEntries[empId] = {}
  }

  const manualData = {
    date: date,
    type: type,
    remarks: remarks || "Manual Entry",
    createdAt: new Date().toISOString(),
    createdBy: document.getElementById("currentUser").textContent,
  }

  if (type === "in" || type === "both") {
    manualData.in = inTime
  }
  if (type === "out" || type === "both") {
    manualData.out = outTime
  }

  manualEntries[empId][dayKey] = manualData

  if (processedAttendanceData?.employees) {
    const employee = processedAttendanceData.employees.find((emp) => emp.id === empId)
    if (employee) {
      if (!employee.attendance[dayKey]) {
        employee.attendance[dayKey] = {
          date: date,
          in: "",
          out: "",
          totalPunches: 0,
          status: "manual",
          remarks: "",
        }
      }

      if (manualData.in) employee.attendance[dayKey].in = manualData.in
      if (manualData.out) employee.attendance[dayKey].out = manualData.out
      employee.attendance[dayKey].remarks = manualData.remarks
      employee.attendance[dayKey].status = "manual"

      const month = document.getElementById("monthSelect").value
      const year = document.getElementById("yearSelect").value
      generateSimplePDFReport(processedAttendanceData, month, year)
    }
  }

  showMessage(
    `Manual attendance entry added for Employee ${empId} on ${date}! Report refreshed with Office Support Staff filtering.`,
    "success",
    "reportContainer",
  )

  document.getElementById("manualEmpId").value = ""
  document.getElementById("manualInTime").value = ""
  document.getElementById("manualOutTime").value = ""
  document.getElementById("manualRemarks").value = ""
}

function toggleTimeFields() {
  const editType = document.getElementById("editType").value
  const timeFields = document.getElementById("timeFields")

  if (
    editType === "present" ||
    editType === "half-day" ||
    editType === "on-duty" ||
    editType === "night-duty" || // Added night-duty to show time fields
    editType === "earn-leave" ||
    editType === "half-casual-leave"
  ) {
    timeFields.style.display = "grid"
  } else {
    timeFields.style.display = "none"
  }
}

function toggleQuickEditTimeFields() {
  const editType = document.getElementById("quickEditType").value
  const timeFields = document.getElementById("quickTimeFields")

  if (editType === "present" || editType === "on-duty" || editType === "night-duty" || editType === "earn-leave") {
    // Added night-duty to show time fields in quick edit
    timeFields.style.display = "grid"
  } else {
    timeFields.style.display = "none"
  }
}

async function updateAttendance() {
  const empId = document.getElementById("editEmployeeId").value.trim()
  const date = document.getElementById("editDate").value
  const type = document.getElementById("editType").value
  const inTime = document.getElementById("editInTime").value
  const outTime = document.getElementById("editOutTime").value
  const reason = document.getElementById("editReason").value.trim()

  if (!empId || !date || !type) {
    showMessage("Employee ID, Date, and Type are required.", "error", "editResult")
    return
  }

  const dayKey = date.split("-")[2]

  if (!editedAttendanceData[empId]) {
    editedAttendanceData[empId] = {}
  }

  const editedData = {
    date: date,
    type: type,
    reason: reason,
    editedAt: new Date().toISOString(),
    editedBy: document.getElementById("currentUser").textContent,
  }

  if (
    type === "present" ||
    type === "half-day" ||
    type === "night-duty" ||
    type === "on-duty" ||
    type === "earn-leave" ||
    type === "half-casual-leave"
  ) {
    editedData.in = inTime
    editedData.out = outTime
  } else {
    editedData.in = ""
    editedData.out = ""
  }

  editedAttendanceData[empId][dayKey] = editedData

  if (processedAttendanceData?.employees) {
    const employee = processedAttendanceData.employees.find((emp) => emp.id === empId)
    if (employee) {
      if (!employee.attendance[dayKey]) {
        employee.attendance[dayKey] = {}
      }

      employee.attendance[dayKey] = {
        ...employee.attendance[dayKey],
        ...editedData,
        status: "edited",
      }

      const month = document.getElementById("monthSelect").value
      const year = document.getElementById("yearSelect").value
      generateSimplePDFReport(processedAttendanceData, month, year)
    }
  }

  showMessage(
    `Advanced attendance updated successfully for Employee ${empId} on ${date}! Report refreshed with Office Support Staff filter.`,
    "success",
    "editResult",
  )

  document.getElementById("editEmployeeId").value = ""
  document.getElementById("editInTime").value = ""
  document.getElementById("editOutTime").value = ""
  document.getElementById("editReason").value = ""
}

function previewChanges() {
  const empId = document.getElementById("editEmployeeId").value.trim()
  const date = document.getElementById("editDate").value
  const type = document.getElementById("editType").value
  const inTime = document.getElementById("editInTime").value
  const outTime = document.getElementById("editOutTime").value

  if (!empId || !date) {
    showMessage("Employee ID and Date are required for preview.", "warning", "editResult")
    return
  }

  const previewContainer = document.getElementById("attendancePreview")
  previewContainer.innerHTML = `
        <div class="edit-form">
            <h4>Preview Changes</h4>
            <div class="employee-card">
                <h5>Employee ID: ${empId}</h5>
                <div><strong>Date:</strong> ${date}</div>
                <div><strong>Status:</strong> ${type}</div>
                ${
                  type === "present" ||
                  type === "half-day" ||
                  type === "night-duty" ||
                  type === "on-duty" ||
                  type === "earn-leave" ||
                  type === "half-casual-leave"
                    ? `
                    <div class="time-display">
                        <span class="time-in">IN: ${inTime || "Not set"}</span>
                        <span class="time-out">OUT: ${outTime || "Not set"}</span>
                    </div>
                `
                    : ""
                }
                <div style="margin-top: 10px;">
                    <button class="btn btn-success" onclick="confirmChanges()">Confirm Changes</button>
                    <button class="btn btn-danger" onclick="cancelChanges()">Cancel</button>
                </div>
            </div>
        </div>
    `
}

function confirmChanges() {
  updateAttendance()
  document.getElementById("attendancePreview").innerHTML = ""
}

function cancelChanges() {
  document.getElementById("attendancePreview").innerHTML = ""
  showMessage("Changes cancelled.", "info", "editResult")
}

async function addManualEntry() {
  const empId = document.getElementById("manualEmployeeId").value.trim()
  const date = document.getElementById("manualDate").value
  const punchType = document.getElementById("manualPunchType").value
  const time = document.getElementById("manualTime").value
  const remarks = document.getElementById("manualEntryRemarks").value.trim()

  if (!empId || !date || !punchType || !time) {
    showMessage("All fields are required.", "error", "manualResult")
    return
  }

  const entryData = {
    employeeId: empId,
    date: date,
    punchType: punchType,
    time: time,
    remarks: remarks || "Manual Entry",
    createdBy: document.getElementById("currentUser").textContent,
    createdAt: new Date().toISOString(),
    isManual: true,
  }

  showMessage(`Manual entry added successfully for Employee ${empId}!`, "success", "manualResult")

  document.getElementById("manualEmployeeId").value = ""
  document.getElementById("manualDate").value = ""
  document.getElementById("manualPunchType").value = "I"
  document.getElementById("manualTime").value = ""
  document.getElementById("manualEntryRemarks").value = ""
}

function showAddEmployeeModal() {
  document.getElementById("addEmployeeModal").style.display = "block"
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none"
}

async function addEmployee() {
  const id = document.getElementById("newEmployeeId").value.trim()
  const name = document.getElementById("newEmployeeName").value.trim()
  const dept = document.getElementById("newEmployeeDept").value.trim()
  const desig = document.getElementById("newEmployeeDesig").value.trim()

  if (!id || !name) {
    showMessage("Employee ID and Name are required.", "error", "addEmployeeResult")
    return
  }

  try {
    employeeData[id] = { name, dept, desig }

    realTimeEmployees.push({
      id: id,
      name: name,
      designation: desig,
      department: dept,
      isActive: true,
      apiSource: false,
    })

    showMessage("Employee added successfully!", "success", "addEmployeeResult")

    document.getElementById("newEmployeeId").value = ""
    document.getElementById("newEmployeeName").value = ""
    document.getElementById("newEmployeeDept").value = ""
    document.getElementById("newEmployeeDesig").value = ""

    loadEmployeeList()
    loadDashboardStats()

    setTimeout(() => closeModal("addEmployeeModal"), 2000)
  } catch (error) {
    showMessage(`Error adding employee: ${error.message}`, "error", "addEmployeeResult")
  }
}

function loadEmployeeList() {
  const container = document.getElementById("employeeList")

  const currentStaff = getCurrentStaffList()

  if (currentStaff.length === 0 && Object.keys(employeeData).length === 0) {
    container.innerHTML =
      '<p style="text-align: center; color: #666;">No employees found. Add employees to get started.</p>'
    return
  }

  let tableHTML = `
        <table class="data-table">
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Source</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `

  currentStaff.forEach((emp) => {
    tableHTML += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.department || "N/A"}</td>
                <td>${emp.designation}</td>
                <td><span style="color: ${emp.apiSource ? "green" : "blue"}">${emp.apiSource ? "API" : "Manual"}</span></td>
                <td>
                    <button class="btn btn-warning" onclick="editEmployee('${emp.id}')">Edit</button>
                    ${!emp.apiSource ? `<button class="btn btn-danger" onclick="deleteEmployee('${emp.id}')">Delete</button>` : ""}
                </td>
            </tr>
        `
  })

  Object.entries(employeeData).forEach(([id, emp]) => {
    if (!currentStaff.find((staff) => staff.id === id)) {
      tableHTML += `
                <tr>
                    <td>${id}</td>
                    <td>${emp.name}</td>
                    <td>${emp.dept || "N/A"}</td>
                    <td>${emp.desig || "N/A"}</td>
                    <td><span style="color: blue">Manual</span></td>
                    <td>
                        <button class="btn btn-warning" onclick="editEmployee('${id}')">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEmployee('${id}')">Delete</button>
                    </td>
                </tr>
            `
    }
  })

  tableHTML += "</tbody></table>"
  container.innerHTML = tableHTML
}

function editEmployee(id) {
  alert(`Edit employee functionality for ID: ${id} (to be implemented)`)
}

function deleteEmployee(id) {
  if (confirm(`Are you sure you want to delete employee ${id}?`)) {
    delete employeeData[id]

    realTimeEmployees = realTimeEmployees.filter((emp) => emp.id !== id || emp.apiSource)

    loadEmployeeList()
    loadDashboardStats()
    showMessage("Employee deleted successfully!", "success", "employeeList")
  }
}

async function loadDashboardStats() {
  try {
    const currentStaff = getCurrentStaffList()
    const totalEmployees =
      processedAttendanceData?.employees?.length || currentStaff.length || Object.keys(employeeData).length || "0"
    document.getElementById("totalEmployees").textContent = totalEmployees
    document.getElementById("presentToday").textContent = "32"
    document.getElementById("averageAttendance").textContent = "85%"
    document.getElementById("pendingLeaves").textContent = "5"
  } catch (error) {
    console.error("Error loading dashboard stats:", error)
  }
}

function showSection(sectionName) {
  document.querySelectorAll(".content-section").forEach((s) => s.classList.remove("active"))
  document.querySelectorAll(".nav-tab").forEach((t) => t.classList.remove("active"))

  const sections = {
    attendance: "attendanceSection",
    employees: "employeeSection",
    editAttendance: "editAttendanceSection",
    manualEntry: "manualEntrySection",
  }

  if (sections[sectionName]) {
    document.getElementById(sections[sectionName]).classList.add("active")
    if (event && event.target) {
      event.target.classList.add("active")
    }
  }
}

function showMessage(message, type, containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  const messageDiv = document.createElement("div")
  messageDiv.className = `alert alert-${type}`
  messageDiv.innerHTML = message

  container.insertBefore(messageDiv, container.firstChild)

  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.parentNode.removeChild(messageDiv)
    }
  }, 8000)
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("authToken")
    location.reload()
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const storedUsername = localStorage.getItem("username")
  const storedAuthToken = localStorage.getItem("authToken")

  if (isLoggedIn && storedUsername && storedAuthToken) {
    authToken = storedAuthToken
    document.getElementById("currentUser").textContent = storedUsername
    document.getElementById("loginSection").style.display = "none"
    document.getElementById("mainContainer").style.display = "block"

    fetchEmployeesFromAPI()
    loadDashboardStats()
    loadEmployeeList()
  }

  const today = new Date()
  const currentMonth = (today.getMonth() + 1).toString()
  const currentYear = today.getFullYear()

  document.getElementById("monthSelect").value = currentMonth.padStart(2, "0")
  document.getElementById("yearSelect").value = currentYear

  const todayStr = today.toISOString().split("T")[0]
  document.getElementById("editDate").value = todayStr
  document.getElementById("manualDate").value = todayStr
  document.getElementById("quickEditDate").value = todayStr
  document.getElementById("manualEntryDate").value = todayStr

  // Initialize time fields toggle
  toggleQuickEditTimeFields()
})