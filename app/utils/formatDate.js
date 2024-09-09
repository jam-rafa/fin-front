import moment from "moment";
import 'moment/locale/pt-br';

moment.locale('pt-br'); // Define o locale para português

export const FormatDateBr = (data) => {
  return moment(data).format("D [de] MMMM YYYY");
};
