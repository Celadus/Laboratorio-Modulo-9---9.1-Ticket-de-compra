import {
  LineaTicket,
  Producto,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from "./modelo";

export const calcularPrecioSinIva = (
  producto: Producto,
  cantidad: number
): number => {
  return producto.precio * cantidad;
};

export const arrayLineas = (lineas: LineaTicket[]): ResultadoLineaTicket[] => {
  return lineas.map((linea) => ({
    nombre: linea.producto.nombre,
    cantidad: linea.cantidad,
    precioSinIva: calcularPrecioSinIva(linea.producto, linea.cantidad),
    tipoIva: linea.producto.tipoIva,
    precioConIva: calcularPrecioConIva(linea.producto, linea.cantidad),
  }));
};

export const calcularTotal = (
  lineas: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  const totalSinIva = Number(
    lineas.reduce((acc, linea) => acc + linea.precioSinIva, 0).toFixed(2)
  );
  const totalConIva = Number(
    lineas.reduce((acc, linea) => acc + linea.precioConIva, 0).toFixed(2)
  );
  const totalIva = Number((totalConIva - totalSinIva).toFixed(2));

  const resultado = {
    totalSinIva,
    totalConIva,
    totalIva,
  };

  return resultado;
};
