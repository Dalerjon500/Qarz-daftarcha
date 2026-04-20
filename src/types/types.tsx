
export interface Qarzdor {
  qarzdor_id: number;
  full_name: string;
  phone_number: string;
  total_qarz: number;
}

export interface ReqQarzdor {
  full_name: string;
  phone_number: string;
}

export interface Qarz{
  qarz_id: number;
  qarzdor_id: number;
  datetime: string;
  miqdor: number;
  holati: boolean;
}

export interface ReqQarz{
  miqdor: number;
}

export interface QarzlarHistory {
  qarz_id: number;
      qarzdor_id: number;
      datetime: string;
      miqdor: number;
      holati: boolean;
      payments: [
        {
          payment_history_id: number;
          qarz_id: number;
          datetime: string;
          miqdor: number;
        }
      ];
}