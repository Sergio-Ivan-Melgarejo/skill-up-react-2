import { render, screen } from "@testing-library/react";
import Donate from "./Donate";

// se pueden agrupar los test con describe
describe("renderizado en Donate", () => {
  // it es para los test (primer argumento es un pregunta, segundo una funcion)
  it("renderiza un h1", () => {
    // al que se le aplicara el test
    render(<Donate />);

    // el test a aplicar (preguntamos si esta en el documento)
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Colaborá con el proyecto",
      })
    ).toBeInTheDocument();
  });

  it("renderiza un a con href", () => {
    render(<Donate />);
    // preguntamos un link tiene el atributo href
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "https://mpago.la/1pkJ26p"
    );
  });

  it("renderiza un a con target _blank", () => {
    render(<Donate />);
    // preguntamos un link tiene el atributo href
    expect(screen.getByRole("link")).toHaveAttribute(
      "target",
      "_blank"
    );
  });
});
