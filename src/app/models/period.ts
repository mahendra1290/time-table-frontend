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

export interface Branch {
  code: string,
  label: string,
}

export interface Semester {
  label: string
}