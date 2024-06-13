import { LineaTicket } from "./modelo";

import { calculaTicket } from "./ticket";

describe("calculaTicket", () => {
    it("debe devolver un ticket con el precio total y el desglose del IVAshould return a ticket with the total price and the breakdown of the IVA", () => {
        // Arrange
        const lineas: LineaTicket[] = [
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
        const resultado = calculaTicket(lineas);
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
                    precioConIva: 6.36,
                },
                {
                    nombre: "Lasaña",
                    cantidad: 1,
                    precioSinIva: 5,
                    tipoIva: "superreducidoA",
                    precioConIva: 5.2,
                },
            ],
            total: {
                totalSinIva: 75,
                totalConIva: 88,
                totalIva: 13,
            },
            desgloseIva: [
                {
                    tipoIva: "general",
                    cuantia: 12.6,
                },
                {
                    tipoIva: "superreducidoC",
                    cuantia: 0.36,
                },
                {
                    tipoIva: "superreducidoA",
                    cuantia: 0.2,
                },
            ],
        });
});
});

