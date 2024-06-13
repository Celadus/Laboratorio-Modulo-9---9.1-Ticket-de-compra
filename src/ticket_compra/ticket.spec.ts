import { LineaTicket } from "./modelo";
import { calculaTicket } from "./ticket";

describe("calculaTicket", () => {
  it("debe devolver un ticket vacío si no se proporcionan líneas de ticket", () => {
    // Arrange
    const lineas: LineaTicket[] = [];
    // Act
    const resultado = calculaTicket(lineas);
    // Assert
    expect(resultado).toEqual({
      lineas: [],
      total: {
        totalSinIva: 0,
        totalConIva: 0,
        totalIva: 0,
      },
      desgloseIva: [],
    });
  });
});

describe("calculaTicket", () => {
  it("debe devolver un ticket con el precio total y el desglose del IVA para una sola línea de ticket", () => {
    // Arrange
    const lineas: LineaTicket[] = [
      {
        producto: {
          nombre: "Camiseta",
          precio: 10,
          tipoIva: "general",
        },
        cantidad: 2,
      },
    ];
    // Act
    const resultado = calculaTicket(lineas);
    // Assert
    expect(resultado).toEqual({
      lineas: [
        {
          nombre: "Camiseta",
          cantidad: 2,
          precioSinIva: 20,
          tipoIva: "general",
          precioConIva: 24.2,
        },
      ],
      total: {
        totalSinIva: 20,
        totalConIva: 24.2,
        totalIva: 4.2,
      },
      desgloseIva: [
        {
          tipoIva: "general",
          cuantia: 4.2,
        },
      ],
    });
  });

  describe("calculaTicket", () => {
    it("debe devolver un ticket con el precio total y el desglose del IVA para líneas de ticket con diferentes tipos de IVA", () => {
      // Arrange
      const lineasTicket: LineaTicket[] = [
        {
          producto: {
            nombre: "Legumbres",
            precio: 2,
            tipoIva: "general",
          },
          cantidad: 2,
        },
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
        {
          producto: {
            nombre: "Lasaña",
            precio: 5,
            tipoIva: "superreducidoA",
          },
          cantidad: 1,
        },
      ];
      // Act
      const resultado = calculaTicket(lineasTicket);
      // Assert
      expect(resultado).toEqual({
        lineas: [
          {
            nombre: "Legumbres",
            cantidad: 2,
            precioSinIva: 4,
            tipoIva: "general",
            precioConIva: 4.84,
          },
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
          {
            nombre: "Lasaña",
            cantidad: 1,
            precioSinIva: 5,
            tipoIva: "superreducidoA",
            precioConIva: 5.25,
          },
        ],
        total: {
          totalSinIva: 75,
          totalConIva: 88.69,
          totalIva: 13.69,
        },

        desgloseIva: [
          {
            tipoIva: "general",
            cuantia: 13.44,
          },
          {
            tipoIva: "superreducidoA",
            cuantia: 0.25,
          },
          {
            tipoIva: "superreducidoC",
            cuantia: 0,
          },
        ],
      });
    });
  });
});
