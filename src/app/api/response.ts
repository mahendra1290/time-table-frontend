import { Period } from '../models/period';

export interface PeriodsApiResponse {
  message: string;
  status: string;
  periods: Period[];
  period?: Period;
}
