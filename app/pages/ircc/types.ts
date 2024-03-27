export type Country = 'CANADA';

export type State = 'AB' | 'British Columbia';

export type City = 'CALGARY' | 'Richmond';

export type Status = 'Active' | 'Administrative Revocation';

export interface RCIC {
  step1_surname: string;
  step1_given_name: string;
  form_consultant_id: string;
  country: Country;
  state: State;
  city: City;
  postal: string;
  address: string;
  companies: string[];
  form_membership_status_text: Status;
  form_date_status_changed: string;
  form_reason_text: string;
}

export interface RCICSearchResponse {
  count: number;
  cur_page: number;
  per_page: number;
  results: RCIC[];
}
