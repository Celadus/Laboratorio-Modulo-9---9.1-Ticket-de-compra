import {
  LineaTicket,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TicketFinal,
  TotalPorTipoIva,
} from "./modelo";


const calculaTicket = (lineasTicket: LineaTicket[]): TicketFinal => {
    const lineas: ResultadoLineaTicket[] = arrayLineas(lineasTicket);
    const total: ResultadoTotalTicket = calculaTotal(lineas);
    const desglose: TotalPorTipoIva[] = calculaDesglose(lineas);

    const ticket = {
        lineas,
        total,
        desgloseIva: desglose,
      };
        return ticket;
}