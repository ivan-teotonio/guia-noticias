test("GET /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  //
  const responseBody = await response.json();

  // checa se o campo updated_at é uma string válida de data
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString(); // Check if it's a valid date
  // checa se o campo updated_at é igual ao valor esperado
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  // checa se o campo dependecies.database.version está presente e é uma string
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.open_connections).toEqual(1);
});
