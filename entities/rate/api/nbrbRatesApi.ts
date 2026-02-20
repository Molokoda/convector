import { Rate, RateHistory } from '@/entities';

export class NbrbApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NbrbApiError';
  }
}

class NbrbRatesApi {
  private readonly baseUrl = 'https://api.nbrb.by/exrates/rates';

  async getRates(date: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/?periodicity=0&ondate=${date}`,
      );
      const data: Rate[] = await response.json();
      return data;
    } catch (error) {
      throw new NbrbApiError(
        error instanceof Error ? error.message : 'Ошибка сети',
      );
    }
  }

  async getRateHistory(cur_id: number, startDate: string, endDate: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/dynamics/${cur_id}?startdate=${startDate}&enddate=${endDate}`,
      );
      const data: RateHistory[] = await response.json();
      return data;
    } catch (error) {
      throw new NbrbApiError(
        error instanceof Error ? error.message : 'Ошибка сети',
      );
    }
  }
}

export const nbrbRatesApi = new NbrbRatesApi();
