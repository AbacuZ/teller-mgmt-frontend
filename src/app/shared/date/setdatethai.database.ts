import { pad } from './pad';

export const setDateThaiDatabase = (data: any) => {
  if (data) {
    const month = Number(data.date.month) < 10 ? pad(data.date.month) : data.date.month;
    const day = Number(data.date.day) < 10 ? pad(data.date.day) : data.date.day;
    return data.date.year + '-' + month + '-' + day;
  } else {
    return '';
  }
};
