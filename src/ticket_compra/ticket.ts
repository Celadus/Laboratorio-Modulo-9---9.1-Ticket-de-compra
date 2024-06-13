import {
  LineaTicket,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TicketFinal,
  TotalPorTipoIva,
} from "./modelo";

import {
  arrayLineas,
  calcularResultadoTotal,
  desgloseIva,
} from "./ticket.helper";

export const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
  const lineas: ResultadoLineaTicket[] = arrayLineas(lineasTicket);
  const total: ResultadoTotalTicket = calcularResultadoTotal(lineas);
  const desglose: TotalPorTipoIva[] = desgloseIva(lineas);

  const ticket = {
    lineas,
    total,
    desgloseIva: desglose,
  };
  return ticket;
};
