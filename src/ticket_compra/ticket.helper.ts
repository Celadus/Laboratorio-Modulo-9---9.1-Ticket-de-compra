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
    if (!producto || !cantidad) {
        throw new Error("Introduce producto o cantidad");
      }
    return Number((producto.precio * cantidad).toFixed(2));
};

export const calcularPrecioConIva = (
    producto: Producto,
    cantidad: number
    ): number => {
        if (!producto || !cantidad) {
            throw new Error("Introduce producto o cantidad");
        }

    const precio = calcularPrecioSinIva(producto, cantidad);
    let precioConIva = 0;
    
    switch (producto.tipoIva) {
        case "general":
        precioConIva = precio * 0.21;
        break;
        case "reducido":
        precioConIva = precio * 0.1;
        break;
        case "superreducidoA":
        precioConIva = precio * 0.05;
        break;
        case "superreducidoB":
        precioConIva = precio * 0.04;
        break;
        case "superreducidoC":
        precioConIva = precioConIva;;
        break;
        case "sinIva":
        precioConIva = precioConIva;
        break;
        default:
            throw new Error("Tipo de IVA no válido");
    }
    
    return Number((precio + precioConIva).toFixed(2));
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
    const desglose : TotalPorTipoIva[] = [];
     let general = 0;
        let reducido = 0;
        let superreducidoA = 0;
        let superreducidoB = 0;
        let superreducidoC = 0;
        let sinIva = 0;

        lineas.forEach((linea) => {
            switch (linea.tipoIva) {
                case "general":
                    general += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
                    break;
                case "reducido":
                    reducido += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
                    break;
                case "superreducidoA":
                    superreducidoA += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
                    break;
                case "superreducidoB":
                    superreducidoB += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
                    break;
                case "superreducidoC":
                    superreducidoC += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
                case "sinIva":
                    sinIva += Number((linea.precioConIva - linea.precioSinIva).toFixed(2));
                    break;
            }
        });

        if (general != 0) {
            desglose.push({ tipoIva: "general", cuantia: general });   
        }

        if (reducido != 0) {
            desglose.push({ tipoIva: "reducido", cuantia: reducido });
        }

        if (superreducidoA != 0) {
            desglose.push({ tipoIva: "superreducidoA", cuantia: superreducidoA });
        }

        if (superreducidoB != 0) {
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

