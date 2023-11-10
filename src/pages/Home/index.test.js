import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { within } from "@testing-library/dom";
import { api, DataProvider } from "../../contexts/DataContext";
import mockedData from "../../contexts/DataContext/mocks/data.json";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);

      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await screen.findByText("En cours");
      await waitFor(async () => await screen.findByText("Message envoyé !"), {
        timeout: 5000,
      });
    });
  });
});

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockedData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await waitFor(async () =>
      expect(await screen.findAllByTestId("event-list-card")).toHaveLength(
        mockedData.events.length
      )
    );
  });
  it("a list a people is displayed", () => {
    render(<Home />);

    expect(screen.getAllByTestId("people-card")).toHaveLength(6);
  });

  it("a footer is displayed", () => {
    render(<Home />);

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("an event card, with the last event, is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(mockedData);

    render(
      <DataProvider>
        <Home />
      </DataProvider>
    );

    await within(await screen.findByTestId("last-event")).findByText(
      "#DigitonPARIS"
    );
  });

  describe("and we click on the last event", () => {
    it("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(mockedData);

      render(
        <DataProvider>
          <Home />
        </DataProvider>
      );

      await waitFor(async () => await screen.findByTestId("last-event"));
      fireEvent(
        await screen.findByTestId("last-event"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await waitFor(
        async () =>
          expect(await screen.findAllByTestId("modal")).toBeInTheDocument
      );
    });
  });
});
