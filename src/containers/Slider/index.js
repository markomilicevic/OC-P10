import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const SLIDE_DISPLAY_DURATION_MS = 5000;

const Slider = () => {
  const { data } = useData();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data?.focus?.length > 0) {
      setTimeout(() => {
        setCurrentIndex(
          currentIndex < data.focus.length - 1 ? currentIndex + 1 : 0
        );
      }, SLIDE_DISPLAY_DURATION_MS);
    }
  }, [data, currentIndex]);

  return (
    <div className="SlideCardList">
      {data?.focus?.map((event, idx) => (
        <div
          key={`${event.title}`}
          className={`SlideCard SlideCard--${
            currentIndex === idx ? "display" : "hide"
          }`}
          data-testid="slide-card"
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {data?.focus?.map((event, radioIdx) => (
            <input
              key={`${event.title}`}
              type="radio"
              name="radio-button"
              checked={currentIndex === radioIdx}
              onChange={() => {}}
              data-testid="slide-pagination"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
