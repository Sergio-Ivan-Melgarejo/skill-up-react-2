import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { rest } from "msw";
import { setupServer } from "msw/node";

import Register from "./Register";

// para simular un server y las respuesta
const server = setupServer(
  rest.get("https://goscrum-api.alkemy.org/auth/data", (_, res, ctx) => {
    return res(
      ctx.json({
        status_code: 200,
        message: "OK",
        result: {
          continente: ["America", "Europa", "Otro","zorro"],
          region: ["Otro", "Latam", "Brasil", "America del Norte"],
          Rol: ["Team Member", "Team Leader"],
        },
      })
    );
  })
);
beforeAll(() => server.listen());
afterAll(() => server.close());

it("fetch options", async () => {
  render(<Register />, { wrapper: MemoryRouter });
  expect(
    screen.getByRole("option", { name: "Seleccionar rol..." })
  ).toBeInTheDocument();

  expect(
    // para busquedas asincronas se usa find en vez de get
    await screen.findByRole("option", { name: "Europa" })
  ).toBeInTheDocument();
});
