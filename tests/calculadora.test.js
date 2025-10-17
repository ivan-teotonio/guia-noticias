const claculadora = require("..//models/calculadora.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const resultado = claculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("somar 2 + 2 deveria retornar 105", () => {
  const resultado = claculadora.somar(2, 100);
  expect(resultado).toBe(105);
});
