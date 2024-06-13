import { LineaTicket, Producto, ResultadoLineaTicket } from "./modelo";
import {
  arrayLineas,
  calcularPrecioConIva,
  calcularPrecioSinIva,
  calcularResultadoTotal,
  desgloseIva,
} from "./ticket.helper";

describe("calcularPrecioSinIva", () => {
  it("debería devolver un error si no se introduce el producto o la cantidad", () => {
    // Arrange
    const producto: any = undefined;
    const cantidad: any = undefined;
    // Act
    const resultado = () => calcularPrecioSinIva(producto, cantidad);
    // Assert
    expect(resultado).toThrowError("Introduce producto o cantidad");
  });

  it("debería devolver el precio del producto multiplicado por la cantidad de producto", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "general",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioSinIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(30);
  });
});

describe("calcularPrecioConIva", () => {
  it("debería devolver un error si no se introduce el producto o la cantidad", () => {
    // Arrange
    const producto: any = undefined;
    const cantidad: any = undefined;
    // Act
    const resultado = () => calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toThrowError("Introduce producto o cantidad");
  });

  it("debería aplicarse el precio con iva general", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "general",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(36.3);
  });

  it("debería aplicarse el precio con iva reducido", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "reducido",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(33);
  });

  it("debería aplicarse el precio con iva superreducidoA", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "superreducidoA",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(31.5);
  });

  it("debería aplicarse el precio con iva superreducidoB", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "superreducidoB",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(31.2);
  });

  it("debería aplicarse el precio con iva superreducidoC", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "superreducidoC",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(30);
  });

  it("debería aplicarse el precio sin iva", () => {
    // Arrange
    const producto: Producto = {
      nombre: "arroz",
      precio: 10,
      tipoIva: "sinIva",
    };
    const cantidad = 3;
    // Act
    const resultado = calcularPrecioConIva(producto, cantidad);
    // Assert
    expect(resultado).toBe(30);
  });
});

describe("arrayLineas", () => {
  it("debería devolver un array de objetos ResultadoLineaTicket", () => {
    // Arrange
    const lineasTicket: LineaTicket[] = [
      {
        producto: {
          nombre: "Perfume",
          precio: 20,
          tipoIva: "general",
        },
        cantidad: 3,
      },
      {
        producto: {
          nombre: "Leche",
          precio: 1,
          tipoIva: "superreducidoC",
        },
        cantidad: 6,
      },
    ];
    // Act
    const resultado = arrayLineas(lineasTicket);
    // Assert
    expect(resultado).toEqual([
      {
        nombre: "Perfume",
        cantidad: 3,
        precioSinIva: 60,
        tipoIva: "general",
        precioConIva: 72.6,
      },
      {
        nombre: "Leche",
        cantidad: 6,
        precioSinIva: 6,
        tipoIva: "superreducidoC",
        precioConIva: 6,
      },
    ]);
  });
});

describe("calcularResultadoTotal", () => {
  it("debería devolver un objeto ResultadoTotalTicket con el total de la compra con iva, sin iva, y el iva aplicado", () => {
    // Arrange
    const lineas: ResultadoLineaTicket[] = [
      {
        nombre: "pan",
        cantidad: 3,
        precioSinIva: 3,
        tipoIva: "superreducidoC",
        precioConIva: 3,
      },
      {
        nombre: "leche",
        cantidad: 1,
        precioSinIva: 2,
        tipoIva: "reducido",
        precioConIva: 2.2,
      },
    ];
    // Act
    const resultado = calcularResultadoTotal(lineas);
    // Assert
    expect(resultado).toEqual({
      totalSinIva: 5,
      totalConIva: 5.2,
      totalIva: 0.2,
    });
  });
});

describe("desgloseIva", () => {
  it("debería devolver la cantidad de dinero gastado en ivas de cada tipo", () => {
    // Arrange
    const lineas: ResultadoLineaTicket[] = [
      {
        nombre: "pan",
        cantidad: 3,
        precioSinIva: 3,
        tipoIva: "superreducidoC",
        precioConIva: 3,
      },
      {
        nombre: "leche",
        cantidad: 1,
        precioSinIva: 2,
        tipoIva: "reducido",
        precioConIva: 2.2,
      },
    ];
    // Act
    const resultado = desgloseIva(lineas);
    // Assert
    expect(resultado).toEqual([
      {
        tipoIva: "reducido",
        cuantia: 0.2,
      },
      {
        tipoIva: "superreducidoC",
        cuantia: 0,
      },
    ]);
  });
});
