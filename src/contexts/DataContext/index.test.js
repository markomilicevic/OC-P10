import { render, screen } from "@testing-library/react";
import { DataProvider, api, useData } from "./index";
import mockedData from "./mocks/data.json";

describe("When a data context is created", () => {
  const oldLoadData = api.loadData;

  afterEach(() => {
    api.loadData = oldLoadData;
  });

  it("a call is executed on api.loadData", async () => {
    api.loadData = jest.fn().mockReturnValue({ result: "ok" });
    const Component = () => {
      const { data } = useData();
      return <div>{data?.result}</div>;
    };

    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    const dataDisplayed = await screen.findByText("ok");
    expect(dataDisplayed).toBeInTheDocument();
  });

  it("the focus elements are sorted", async () => {
    api.loadData = jest.fn().mockReturnValue(mockedData);
    const Component = () => {
      const { data } = useData();
      return (
        <div>
          {data?.focus?.map((item) => (
            <p key={item.title} data-testid="title">
              {item.title}
            </p>
          ))}
        </div>
      );
    };

    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    const titles = await screen.findAllByTestId("title");
    expect(titles[0].textContent).toBe("Sneakercraze market");
    expect(titles[1].textContent).toBe("World economic forum");
    expect(titles[2].textContent).toBe("Nordic design week");
  });

  it("the events elements are sorted", async () => {
    api.loadData = jest.fn().mockReturnValue(mockedData);
    const Component = () => {
      const { data } = useData();
      return (
        <div>
          {data?.events?.map((item) => (
            <p key={item.title} data-testid="title">
              {item.title}
            </p>
          ))}
        </div>
      );
    };

    render(
      <DataProvider>
        <Component />
      </DataProvider>
    );

    const titles = await screen.findAllByTestId("title");
    expect(titles[0].textContent).toBe("Conférence &co-responsable");
    expect(titles[1].textContent).toBe("User&product MixUsers");
    expect(titles[2].textContent).toBe("#DigitonPARIS");
  });

  describe("and the events call failed", () => {
    it("the error is dispatched", async () => {
      window.console.error = jest.fn();
      api.loadData = jest.fn().mockRejectedValue("error on calling events");
      const Component = () => {
        const { error } = useData();
        return <div>{error}</div>;
      };

      render(
        <DataProvider>
          <Component />
        </DataProvider>
      );

      const dataDisplayed = await screen.findByText("error on calling events");
      expect(dataDisplayed).toBeInTheDocument();
    });
  });

  it("api.loadData fetch the mock file", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
    });

    const data = await api.loadData();

    expect(global.fetch.mock.calls).toHaveLength(1);
    expect(global.fetch.mock.calls[0][0]).toBe("/events.json");
    expect(data.rates.CAD).toBe(1.42);
  });
});
