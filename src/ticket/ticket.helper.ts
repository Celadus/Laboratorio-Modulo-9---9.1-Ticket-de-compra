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

export const calcularPrecioConIva = (
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

export const calcularResultadoTotal = (
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

export const desgloseIva = (lineas: ResultadoLineaTicket[]): TotalPorTipoIva[] => {
    const desglose = TotalPorTipoIva[] = [];
     let general = 0;
        let reducido = 0;
        let superreducidoA = 0;
        let superreducidoB = 0;
        let superreducidoC = 0;
        let sinIva = 0;

        lineas.forEach((linea) => {
            switch (linea.tipoIva) {
                case "general":
                    general += linea.precioConIva;
                    break;
                case "reducido":
                    reducido += linea.precioConIva;
                    break;
                case "superreducidoA":
                    superreducidoA += linea.precioConIva;
                    break;
                case "superreducidoB":
                    superreducidoB += linea.precioConIva;
                    break;
                case "superreducidoC":
                    superreducidoC += linea.precioConIva;
                    break;
                case "sinIva":
                    sinIva += linea.precioConIva;
                    break;
                default:
                    throw new Error("Tipo de IVA no válido");
            }
        });

        if (general > 0) {
            desglose.push({ tipoIva: "general", cuantia: general });   
        }

        if (reducido > 0) {
            desglose.push({ tipoIva: "reducido", cuantia: reducido });
        }

        if (superreducidoA > 0) {
            desglose.push({ tipoIva: "superreducidoA", cuantia: superreducidoA });
        }

        if (superreducidoB > 0) {
            desglose.push({ tipoIva: "superreducidoB", cuantia: superreducidoB });
        }

        if (lineas.some((linea) => linea.tipoIva === "superreducidoC")) {
            desglose.push({ tipoIva: "superreducidoC", cuantia: superreducidoC });
        }

        if (lineas.some((linea) => linea.tipoIva === "sinIva")) {
            desglose.push({ tipoIva: "sinIva", cuantia: sinIva });
        }

        return desglose;
};

