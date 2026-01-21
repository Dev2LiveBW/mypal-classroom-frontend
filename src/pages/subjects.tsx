import { CreateButton } from "@/components/refine-ui/buttons/create"
import { DataTable } from "@/components/refine-ui/data-table/data-table"
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb"
import { ListView } from "@/components/refine-ui/views/list-view"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEPARTMENT_OPTIONS } from "@/constants"
import { useTable } from "@refinedev/react-table"
import { Search } from "lucide-react"
import { Subject } from "@/types"
import { useMemo, useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { ColumnDef, useReactTable } from "@tanstack/react-table"
import { EditButton } from "@/components/refine-ui/buttons/edit"
const SubjectsList = () => {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedDepartment, setSelectedDepartment] = useState("all")
    
    const subjectColumns = useMemo<ColumnDef<Subject>[]>(
    () => [
      {
        id: "code",
        accessorKey: "course_code",
        size: 100,
        header: () => <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
      },
      {
        id: "name",
        accessorKey: "name",
        size: 200,
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => (
          <span className="text-foreground">{getValue<string>()}</span>
        ),
        filterFn: "includesString",
      },
      {
        id: "department",
        accessorKey: "department",
        size: 150,
        header: () => <p className="column-title">Department</p>,
        cell: ({ getValue }) => (
          <Badge variant="secondary">{getValue<string>()}</Badge>
        ),
      },
      {
        id: "description",
        accessorKey: "description",
        size: 300,
        header: () => <p className="column-title">Description</p>,
        cell: ({ getValue }) => (
          <span className="truncate line-clamp-2">{getValue<string>()}</span>
        ),
      },
      {
        id: "details",
        size: 140,
        header: () => <p className="column-title">Details</p>,
        cell: ({ row }) => (
          <EditButton
            resource="subjects"
            recordItemId={row.original.id}
            variant="outline"
            size="sm"
          />
        ),
      },
    ],
    []
  );




   const subjectTable = useTable<Subject>({
       columns: subjectColumns,
            refineCoreProps: {
            resource: "subjects",
            pagination: {
                pageSize: 10,
                mode: "server",
            },
            sorters: {
                mode: "server",
            },
        }
    })

    useEffect(() => {
        const filters = []
        
        if (selectedDepartment && selectedDepartment !== "all") {
            filters.push({
                id: "department",
                value: selectedDepartment,
            })
        }

        if (searchQuery) {
            filters.push({
                id: "name",
                value: searchQuery,
            })
        }

        subjectTable.reactTable.setColumnFilters(filters)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchQuery, selectedDepartment])

  return (
    <ListView>
        <Breadcrumb />

        <h1 className="page-title">Subjects</h1>

      <div className="intro-row">
        <p>Quick access to essential metrics and management tools.</p>

            <div className="actions-row">
                <div className=" flex search-field">
                <Search className="search-icon" />
                <input type="text" placeholder="Search by name" className="w-full pl-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                        {DEPARTMENT_OPTIONS.map((department) => (
                            <SelectItem key={department.value} value={department.value}>
                                {department.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <CreateButton />
             </div>
             </div>
        </div>
        
        <div className="mt-6">
            <DataTable table={subjectTable} />
        </div>
    </ListView>
  )
}

export default SubjectsList