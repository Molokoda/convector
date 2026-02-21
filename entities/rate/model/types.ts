export interface Rate {
  Cur_ID: number;
  Date: string;
  Cur_Abbreviation: string;
  Cur_Scale: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
}

export interface RateHistory {
  Cur_ID: number;
  Date: string;
  Cur_OfficialRate: number;
}
