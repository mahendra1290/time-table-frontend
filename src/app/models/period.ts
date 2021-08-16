export interface Period {
  _id: string;
  startTime: number;
  endTime: number;
  day: number;
  subject: string;
  meetLink: string;
  sections?: string[];
  branch?: string;
  facultyName?: string;
}
