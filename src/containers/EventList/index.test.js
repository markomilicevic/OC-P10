import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { api, DataProvider } from "../../contexts/DataContext";
import mockedData from "../../contexts/DataContext/mocks/data.json";
import EventList, { PER_PAGE } from "./index";

describe("When EventList is created", () => {
  let dataWithRepeatedEvents = { ...mockedData };
  const expectedNumberOfPages = 3;
  const numberOfEvents = PER_PAGE * expectedNumberOfPages - 1; // 26

  beforeEach(() => {
    dataWithRepeatedEvents.events = Array(numberOfEvents)
      .fill()
      .map(() => ({
        ...mockedData.events[0],
        id: `${Math.random()}`,
      }));
  });

  it("a list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(dataWithRepeatedEvents);

    render(
      <DataProvider>
        <EventList />
      </DataProvider>
    );

    await waitFor(async () =>
      expect(
        (
          await screen.findAllByTestId("event-list-card")
        )[0]
      ).toBeInTheDocument()
    );
  });

  it("a paginated list of event card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(dataWithRepeatedEvents);

    render(
      <DataProvider>
        <EventList />
      </DataProvider>
    );

    await waitFor(async () =>
      expect(await screen.findAllByTestId("event-list-card")).toHaveLength(
        PER_PAGE
      )
    );
    await waitFor(async () =>
      expect(
        await screen.findAllByTestId("event-list-pagination")
      ).toHaveLength(expectedNumberOfPages)
    );
  });

  describe("and an error occured", () => {
    it("an error message is displayed", async () => {
      api.loadData = jest
        .fn()
        .mockRejectedValue(new Error("Something goes wrong"));

      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );

      await waitFor(async () =>
        expect(await screen.findByText("An error occured")).toBeInTheDocument()
      );
    });
  });

  describe("and we select a category", () => {
    it("an filtered list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(mockedData);

      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );

      await waitFor(
        async () => await screen.findAllByTestId("event-list-card")
      );
      const eventIdsBefore = (await screen.findAllByTestId("event-list-card"))
        .map((card) => card.dataset.eventid)
        .join("-");

      fireEvent(
        await screen.findByTestId("collapse-button-testid"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      fireEvent(
        (await screen.findAllByTestId("select-choice"))[1],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await waitFor(async () => {
        const eventIdsAfter = (await screen.findAllByTestId("event-list-card"))
          .map((card) => card.dataset.eventid)
          .join("-");
        expect(eventIdsAfter).not.toBe(eventIdsBefore);
      });
    });
  });

  describe("and we click on a page", () => {
    it("a paginated list is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(dataWithRepeatedEvents);

      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );

      await waitFor(
        async () => await screen.findAllByTestId("event-list-pagination")
      );
      const eventIdsBefore = (await screen.findAllByTestId("event-list-card"))
        .map((card) => card.dataset.eventid)
        .join("-");

      fireEvent(
        (await screen.findAllByTestId("event-list-pagination"))[1],
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );

      await waitFor(async () => {
        const eventIdsAfter = (await screen.findAllByTestId("event-list-card"))
          .map((card) => card.dataset.eventid)
          .join("-");
        expect(eventIdsAfter).not.toBe(eventIdsBefore);
      });
    });
  });

  describe("and we click on an event", () => {
    it("the event detail is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(mockedData);

      render(
        <DataProvider>
          <EventList />
        </DataProvider>
      );

      await waitFor(
        async () => await screen.findAllByTestId("event-list-card")
      );
      fireEvent(
        (await screen.findAllByTestId("event-list-card"))[0],
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
