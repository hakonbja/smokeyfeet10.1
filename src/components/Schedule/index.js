import React from 'react';
import styles from './styles.module.scss';
import univ from '../../styles/universal.module.scss';
import eventsObj from './events';

const Schedule = () => {
  
  return (
    <div className={styles.scheduleWrapper}>
      <h1 className={univ.heading}>Schedule</h1>
      <div className={styles.schedule}>
        <HoursColumn />
        {eventsObj.map( (schedule, i) => {
          return <DayColumn schedule={schedule} key={i} />
        })}
      </div>
    </div>
  );
}

const HoursColumn = () => {
  const hours = (() => {
    let output = [];
    for (let i = 0; i < 16; i++) {
      let hour = parseInt(12) + parseInt(i);
      if (hour > 24) {
        hour = hour - 24;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      output.push(hour + ":00");
    }
    return output;
  })();  
  
  return (
    <div className={styles.colHours}>
      {hours.map( (hour, i) => <div className={`${styles.hour} hourRow`} key={i}><p>{hour}</p></div>)}
    </div>
  );
}

const DayColumn = (props) => {
  const schedule = props.schedule;
  return (
    <div className={styles.dayColumn}>
      <div className={styles.colHeader}>
        <h2>{schedule.day}</h2>
        <p>{schedule.date}</p>
      </div>
      <div className={styles.colEvents}>
        {schedule.events.map( (event, i) => {
          return <Event event={event} key={i} />
        })}
        <BackgroundLines />
      </div>
    </div>
  );
}

const Event = (props) => {
  const event = props.event;
  const hour = getHours(event.startHour, event.endHour);
  const height = getHeight(event.startHour, event.endHour);
  const topPos = getTopPos(event.startHour);
  const span = getSpan(event.startHour, event.endHour);
  const style = {
    height: height,
    top: topPos,
  }

  return (
    <div className={styles.event} style={style} >
      <h3>{event.title}</h3>
      <p>{hour}</p>
      {event.bands.map( (band, i) => <h4 key={i}>{band}</h4>)}
      {event.extras.map( (extra, i) => <h4 key={i}>{extra}</h4>)}
      <h4>{event.location}</h4>
    </div>
  )
}

const BackgroundLines = () => {
  const n = 16;
  
  return (
    <div className={styles.backgroundLines}>
      {[...Array(n)].map( (e, i) => <div className={styles.backgroundLine} key={i}></div>)}
    </div>
  )
}

const getHeight = (startHour, endHour) => {
  const rowHeight = 30;
  let length = endHour - startHour;
  length = length < 0 ? length + 24 : length;
  const height = length * rowHeight + "px";
  return height;
}

const getHours = (startHour, endHour) => {
  startHour = startHour < 10 ? "0" + startHour : startHour;
  endHour = endHour < 10 ? "0" + endHour : endHour;

  return startHour + ":00 - " + endHour + ":00";
}

const getTopPos = (startHour) => {
  const rowHeight = 30;
  let startHourNumber = startHour - 12;
  startHourNumber = startHourNumber < 0 ? startHourNumber + 24 : startHourNumber;
  const topPos = startHourNumber * rowHeight + "px";
  return topPos;
}

const getSpan = (startHour, endHour) => {

}

// const events = [
//   {
//     day: "Thursday",
//     date: "21st of May",
//     events: [
//       {
//         title: "Party",
//         startHour: 20,
//         endHour: 2,
//         bands: ["Hommage"],
//         extras: [],
//         location: "De Kompaszaal"
//       }
//     ]
//   },
//   {
//     day: "Friday",
//     date: "22nd of May",
//     events: [
//       {
//         title: "Party",
//         startHour: 21,
//         endHour: 3,
//         bands: ["Jonathan Stout & His Campus Five feat. Hilary Alexander"],
//         extras: ["Teachers' Intro", "Competition prelims"],
//         location: "Theater de Omval"
//       }
//     ]
//   },
//   {
//     day: "Saturday",
//     date: "23rd of May",
//     events: [
//       {
//         title: "Classes",
//         startHour: 12,
//         endHour: 18,
//         bands: [],
//         extras: ["Lindy Hop", "Solo Jazz"],
//         location: "Universum Science P."
//       },
//       {
//         title: "Party",
//         startHour: 21,
//         endHour: 4,
//         bands: ["Carolina Reapers", "Jonathan Stout & His Campus Five feat. Hilary Alexander"],
//         extras: ["Competition finals", "Jam session"],
//         location: "Theater de Omval"
//       }
//     ]
//   },
//   {
//     day: "Sunday",
//     date: "24th of May",
//     events: [
//       {
//         title: "Classes",
//         startHour: 12,
//         endHour: 18,
//         bands: [],
//         extras: ["Lindy Hop", "Solo Jazz"],
//         location: "Universum Science P."
//       },
//       {
//         title: "Party",
//         startHour: 21,
//         endHour: 4,
//         bands: ["Carolina Reapers"],
//         extras: ["Performances"],
//         location: "Theater de Omval"
//       }
//     ]
//   },
//   {
//     day: "Monday",
//     date: "25th of May",
//     events: [
//       {
//         title: "Party",
//         startHour: 21,
//         endHour: 4,
//         bands: ["Orange Moon"],
//         extras: [],
//         location: "De Kompaszaal"
//       }
//     ]
//   },
// ];

export default Schedule;