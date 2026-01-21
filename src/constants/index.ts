export const DEPARTMENTS = [
    { value: "all", label: "All Departments" },
    { value: "ACCA Applied Knowledge", label: "ACCA Applied Knowledge" },
    { value: "ACCA Applied Skills", label: "ACCA Applied Skills" },
    { value: "ACCA Strategic Professional", label: "ACCA Strategic Professional" },
]       

export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((dept) => ({
    value: dept.value,
    label: dept.label,
}))
