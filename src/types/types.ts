export type TRegionCodes = '3800000000000' | ''

export interface IJobResponseData {
    status: string
    request: Request
    meta: Meta
    results: Results
}

export interface Meta {
    total: number
    limit: number
}

export interface Request {
    api: string
}

export interface Results {
    vacancies: VacancyElement[]
}

export interface VacancyElement {
    vacancy: VacancyData
}

export interface VacancyData {
    id: string
    source: string
    region: Region
    company: Company
    'creation-date': Date
    salary: string
    salary_min: number
    salary_max: number
    'job-name': string
    vac_url: string
    employment: string
    schedule: string
    duty: string
    category: Category
    requirement: Requirement
    addresses: Addresses
    social_protected: string
    term?: Term
    contact_list: ContactList[]
    contact_person: string
    work_places: number
    code_profession: string
    currency: string
}

export interface Addresses {
    address: Address[]
}

export interface Address {
    location: string
    lng: string
    lat: string
}

export interface Category {
    specialisation: string
}

export interface Company {
    companycode: string
    email?: string
    'hr-agency': boolean
    inn: string
    kpp: string
    name: string
    ogrn: string
    phone: string
    url: string
    site?: string
}

export interface ContactList {
    contact_type: string
    contact_value: string
}

export interface Region {
    region_code: string
    name: string
}

export interface Requirement {
    education: string
    experience: number
    qualification?: string
}

export interface Term {
    text: string
}
