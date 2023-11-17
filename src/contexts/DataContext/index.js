import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { sortFromMostRecentToOldest } from "../../helpers/Date";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const response = await fetch("/events.json");
    return response.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      const response = await api.loadData();

      if (response.focus) {
        sortFromMostRecentToOldest(response.focus);
      }

      if (response.events) {
        sortFromMostRecentToOldest(response.events);
      }

      setData(response);
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
