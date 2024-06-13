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

const calcularPrecioConIva = (
    producto: Producto,
    cantidad: number
    ): number => {
    let precioSinIva = calcularPrecioSinIva(producto, cantidad);
    let precioConIva = 0;
    
    switch (producto.tipoIva) {
        case "general":
        precioConIva = precioSinIva * 1.21;
        break;
        case "reducido":
        precioConIva = precioSinIva * 1.1;
        break;
        case "superreducidoA":
        precioConIva = precioSinIva * 1.04;
        break;
        case "superreducidoB":
        precioConIva = precioSinIva * 1.055;
        break;
        case "superreducidoC":
        precioConIva = precioSinIva * 1.059;
        break;
        case "sinIva":
        precioConIva = precioSinIva;
        break;
        default:
            throw new Error("Tipo de IVA no válido");
    }
    
    return Number(precioConIva.toFixed(2));
    }

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
