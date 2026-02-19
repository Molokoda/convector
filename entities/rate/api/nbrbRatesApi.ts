export class NbrbRatesApi {
  private readonly baseUrl = 'https://api.nbrb.by/exrates/rates';

  async getRates(date: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/?periodicity=0&ondate=${date}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getRateHistory(cur_id: number, startDate: string, endDate: string) {
    try {
      const response = await fetch(
        `${this.baseUrl}/dynamics/${cur_id}?startdate=${startDate}&enddate=${endDate}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
