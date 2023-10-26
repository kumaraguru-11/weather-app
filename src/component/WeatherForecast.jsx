import React from "react";
import Accordion from "react-bootstrap/Accordion";

const Forecast = ({ forecast }) => {
  const ClaculateDay = (date) => {
    var myDate = new Date(date);
    var dayOfWeek = myDate.getDay();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[dayOfWeek];
  };

  const Seperatetime = (date) => {
    let index = date.indexOf(" ");
    let time = date.slice(index, date.length - 3);
    const formattedHour = time % 12 === 0 ? 12 : time % 12;
    const period = time < 12 ? "AM" : "PM";
    return formattedHour + period;
  };
  return (
    <div className="F_container">
      <span className="F_header">ForeCast Report</span>
      <div className="F_accrodion">
        {forecast.map((el) => (
          <Accordion key={el.date}>
            <Accordion.Item eventKey="0" className="A_container">
              <Accordion.Header>
                <div className="F_accordion_header">
                  <div>
                    <img
                      src={el.day.condition.icon}
                      alt={el.day.condition.text}
                      className="F_icon"
                    />
                    <span>{`(${el.day.condition.text})`}</span>
                  </div>
                  <div>
                    <span>Date:</span>
                    <span>{el.date}</span>
                    <div>{`(${ClaculateDay(el.date)})`}</div>
                  </div>

                  <div>
                    <span>Temp:</span>
                    <span>{`${el.day.mintemp_c} to ${el.day.maxtemp_c}`}</span>
                  </div>

                  <div>
                    <span>Max wind:</span>
                    <span>{`${el.day.maxwind_kph}KPH`}</span>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body className="accordian_body">
                <div className="accordian_innerbody">
                  {el.hour.map((el) => (
                    <div className="capsule_container" key={el.time}>
                      <div className="capsule">
                        <span>{`${Seperatetime(el.time)}`}</span>
                        <span>
                          <img
                            src={el.condition.icon}
                            alt={el.condition.text}
                            width={50}
                          />
                        </span>
                        <span>{el.temp_c}&deg;</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
