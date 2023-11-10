import { useEffect, useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

export const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [currentType, setCurrentType] = useState();
  const [typeList, setTypeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [visibleEvents, setVisibleEvents] = useState();

  useEffect(() => {
    if (!data) {
      // Not yet ready or in error
      return;
    }

    setTypeList(Array.from(new Set(data.events.map((event) => event.type))));

    let filtered = data.events;
    if (currentType) {
      // Some
      filtered = filtered.filter((event) => event.type === currentType);
    }

    setPageNumber(Math.ceil(filtered.length / PER_PAGE));

    setVisibleEvents(
      filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
    );
  }, [data, currentType, currentPage]);

  return (
    <>
      {error && <div>An error occured</div>}
      {!visibleEvents ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => {
              setCurrentPage(1);
              setCurrentType(value);
            }}
          />
          <div id="events" className="ListContainer">
            {visibleEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    data-testid="event-list-card"
                    data-eventid={event.id}
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              <a
                // eslint-disable-next-line react/no-array-index-key
                key={n}
                data-testid="event-list-pagination"
                href="#events"
                onClick={() => setCurrentPage(n + 1)}
              >
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
