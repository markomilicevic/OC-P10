import { render, screen } from "@testing-library/react";
import Slider from "./index";
import { api, DataProvider } from "../../contexts/DataContext";
import mockedData from "../../contexts/DataContext/mocks/data.json";

describe("When slider is created", () => {
  beforeEach(() => {
    window.console.error = jest.fn();
    api.loadData = jest.fn().mockReturnValue(mockedData);

    render(
      <DataProvider>
        <Slider />
      </DataProvider>
    );
  });

  it("a list card is displayed", async () => {
    const cards = await screen.findAllByTestId("slide-card");
    expect(cards[0].querySelector("h3").textContent).toBe("Nordic design week");
    expect(cards[1].querySelector("h3").textContent).toBe(
      "World economic forum"
    );
    expect(cards[2].querySelector("h3").textContent).toBe(
      "Sneakercraze market"
    );
  });

  it("a pagination is displayed", async () => {
    const paginations = await screen.findAllByTestId("slide-pagination");
    expect(paginations.length).toBe(3);
  });
});
