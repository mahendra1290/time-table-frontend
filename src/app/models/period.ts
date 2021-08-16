export interface Period {
  _id: string;
  startTime: number;
  endTime: number;
  days: number[];
  subject: string;
  meetLink: string;
  sections?: string[];
  branch?: string;
  facultyName?: string;
}
