import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";

export interface Subject {
    id: string;
    course_code: string;
    name: string;
    department: string;
    description: string;
}

export const ACCA_COURSES: Subject[] = [
    {
        id: "1",
        course_code: "BT-F1",
        name: "Business and Technology",
        department: "ACCA Applied Knowledge",
        description: "Focuses on how businesses operate effectively, efficiently and ethically and shows the critical role finance professionals play in achieving this."
    },
    {
        id: "2",
        course_code: "MA-F2",
        name: "Management Accounting",
        department: "ACCA Applied Knowledge",
        description: "Develop management accounting techniques to help you support businesses to plan, control and monitor performance."
    },
    {
        id: "3",
        course_code: "FA-F3",
        name: "Financial Accounting",
        department: "ACCA Applied Knowledge",
        description: "Learn the underlying principles and concepts of financial accounting, accounting techniques and the preparation of basic financial statements."
    },
    {
        id: "4",
        course_code: "LW-F4",
        name: "Corporate and Business Law",
        department: "ACCA Applied Skills",
        description: "Develop an understanding of the general legal framework, and of specific legal areas relating to business, recognising the need to seek further specialist legal advice where necessary."
    },
    {
        id: "5",
        course_code: "PM-F5",
        name: "Performance Management",
        department: "ACCA Applied Skills",
        description: "Develop knowledge and skills in the application of management accounting techniques to quantitative and qualitative information for planning, decision-making, performance evaluation, and control."
    },
    {
        id: "6",
        course_code: "TX-F6",
        name: "Taxation",
        department: "ACCA Applied Skills",
        description: "Develop knowledge and skills relating to the tax system as applicable to individuals, single companies, and groups of companies."
    },
    {
        id: "7",
        course_code: "FR-F7",
        name: "Financial Reporting",
        department: "ACCA Applied Skills",
        description: "Develop knowledge and skills in understanding and applying accounting standards and the theoretical framework in the preparation of financial statements of entities, including groups and how to analyse and interpret those financial statements."
    },
    {
        id: "8",
        course_code: "AA-F8",
        name: "Audit and Assurance",
        department: "ACCA Applied Skills",
        description: "Develop knowledge and understanding of the process of carrying out the assurance engagement and its application in the context of the professional regulatory framework."
    },
    {
        id: "9",
        course_code: "FM-F9",
        name: "Financial Management",
        department: "ACCA Applied Skills",
        description: "Develop the knowledge and skills expected of a finance manager, in relation to investment, financing, and dividend policy decisions."
    },
    {
        id: "10",
        course_code: "SBL",
        name: "Strategic Business Leader",
        department: "ACCA Strategic Professional",
        description: "Apply knowledge, skills and exercise professional judgement in the application and evaluation of financial and business scenarios."
    },
    {
        id: "11",
        course_code: "SBR",
        name: "Strategic Business Reporting",
        department: "ACCA Strategic Professional",
        description: "Apply knowledge, skills and exercise professional judgement in the application and evaluation of financial reporting principles and practices in a range of business contexts and situations."
    }
];

export const dataProvider: DataProvider = {
    getList: async<TData extends BaseRecord = BaseRecord>(
        {resource, filters, pagination, sorters}: GetListParams): Promise<GetListResponse<TData>> => {  
        if(resource === "subjects") {
            let data = [...ACCA_COURSES];

            if (filters) {
                filters.forEach((filter) => {
                    if (filter.operator === "eq" && filter.value) {
                         // @ts-ignore
                        data = data.filter((item) => item[filter.field] === filter.value);
                    }
                    if (filter.operator === "contains" && filter.value) {
                         // @ts-ignore
                        data = data.filter((item) => item[filter.field]?.toLowerCase().includes(filter.value.toString().toLowerCase()));
                    }
                });
            }

            if (sorters && sorters.length > 0) {
                data.sort((a, b) => {
                    const sorter = sorters[0];
                    // @ts-ignore
                    const fieldA = a[sorter.field];
                    // @ts-ignore
                    const fieldB = b[sorter.field];

                    if (typeof fieldA === "string" && typeof fieldB === "string") {
                        if (sorter.order === "asc") {
                            return fieldA.localeCompare(fieldB);
                        } else {
                            return fieldB.localeCompare(fieldA);
                        }
                    }
                    if (fieldA < fieldB) return sorter.order === "asc" ? -1 : 1;
                    if (fieldA > fieldB) return sorter.order === "asc" ? 1 : -1;
                    return 0;
                });
            }

            const total = data.length;

            const { current, pageSize } = pagination as any ?? {};

            if (current && pageSize) {
                const start = (current - 1) * pageSize;
                const end = start + pageSize;
                data = data.slice(start, end);
            }

            return { data: data as unknown as TData[], total };
        }
        return { data: [], total: 0 };
    },
    getOne: async () => { throw new Error("This function is not present in the mock"); },
    create: async () => { throw new Error("This function is not present in the mock"); },
    update: async () => { throw new Error("This function is not present in the mock"); },
    deleteOne: async () => { throw new Error("This function is not present in the mock"); },
    getApiUrl: () => "",
};