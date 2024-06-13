import { LineaTicket } from "./modelo";
import { calculaTicket } from "./ticket";


describe ("calculaTicket", () => {
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
        nombre: "Manzanas",
        precio: 1.5,
        tipoIva: "general",
      },
      cantidad: 3,
    },
  ];
  // Act
  const resultado = calculaTicket(lineas);
  // Assert
  expect(resultado).toEqual({
    lineas: [
      {
        nombre: "Manzanas",
        cantidad: 3,
        precioSinIva: 4.5,
        tipoIva: "general",
        precioConIva: 5.46,
      },
    ],
    total: {
      totalSinIva: 4.5,
      totalConIva: 5.46,
      totalIva: 0.96,
    },
    desgloseIva: [
      {
        tipoIva: "general",
        cuantia: 0.96,
      },
    ],
  });
});

describe("calculaTicket", () => {
  it("debe devolver un ticket con el precio total y el desglose del IVA para líneas de ticket con diferentes tipos de IVA", () => {
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
      {
        producto: {
          nombre: "Gafas de sol",
          precio: 50,
          tipoIva: "reducido",
        },
        cantidad: 1,
      },
      {
        producto: {
          nombre: "Libro",
          precio: 20,
          tipoIva: "superreducidoA",
        },
        cantidad: 3,
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
        {
          nombre: "Gafas de sol",
          cantidad: 1,
          precioSinIva: 50,
          tipoIva: "reducido",
          precioConIva: 53,
        },
        {
          nombre: "Libro",
          cantidad: 3,
          precioSinIva: 60,
          tipoIva: "superreducidoA",
          precioConIva: 63,
        },
      ],
      total: {
        totalSinIva: 130,
        totalConIva: 140.2,
        totalIva: 10.2,
      },
      desgloseIva: [
        {
          tipoIva: "general",
          cuantia: 4.2,
        },
        {
          tipoIva: "reducido",
          cuantia: 3,
        },
        {
          tipoIva: "superreducidoA",
          cuantia: 3,
        },
      ],
    });
  });
});

