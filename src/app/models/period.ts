export interface Period {
  id?: string;
  startTime: number;
  endTime: number;
  day: number;
  subject: string;
  meetLink: string;
  sections?: string[];
  branch?: string;
  semester?: string;
  facultyName?: string;
}

export interface Subject {
  subjectCode: string,
  subjectName: string,
  branchCode: string,
  semCode: string,
  meetLink?: string,
  facultyName?: string,
  periods: Period[]
}

export interface Branch {
  code: string,
  label: string,
}

export interface Semester {
  label: string
}