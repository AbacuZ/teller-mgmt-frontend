import * as moment from 'moment';

export const setFormDateThai = (data: any) => {
  if (data === '' || data == null) {
    return '';
  } else {
    const dataTemp: string[] = moment(data).format('YYYY-MM-DD').split('-');
    return {
      date: {
        year: Number(dataTemp[0]),
        month: Number(dataTemp[1]),
        day: Number(dataTemp[2])
      }
    };
  }
};
