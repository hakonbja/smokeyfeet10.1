import React from 'react';
import styles from './styles.module.scss';
import univ from '../../styles/universal.module.scss';
import scheduleData from './scheduleData';
import { ReactComponent as MusicNotes } from '../../assets/img/music-notes.svg';
import { ReactComponent as Star } from '../../assets/img/star.svg';
import { ReactComponent as LocationPin } from '../../assets/img/location-pin.svg';

const Schedule = () => {
  
  return (
    <div className={styles.scheduleWrapper}>
      <h1 className={univ.heading}>Schedule</h1>
      <div className={styles.schedule}>
        <HoursColumn />
        {scheduleData.map( (schedule, i) => {
          return <DayColumn schedule={schedule} key={i} />
        })}
      </div>
    </div>
  );
}

const HoursColumn = () => {
  const hours = (() => {
    let output = [];
    for (let i = 0; i < 17; i++) {
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
  const rowHeight = 35;
  document.documentElement.style.setProperty('--rowHeight', rowHeight + 'px');

  const event = props.event;
  const hour = getHours(event.startHour, event.endHour);
  const height = getHeight(event.startHour, event.endHour, rowHeight);
  const topPos = getTopPos(event.startHour, rowHeight);
  const style = {
    height: height,
    top: topPos,
  }

  return (
    <div className={styles.event} style={style} >
      <h3>{event.title}</h3>
      <p>{hour}</p>
      {event.bands.map( (band, i) => <div className={styles.infoWrapper} key={i}><MusicNotes/><h4>{band}</h4></div>)}
      {event.extras.map( (extra, i) => <div className={styles.infoWrapper} key={i}><Star/><h4>{extra}</h4></div>)}
      <div className={styles.infoWrapper}><LocationPin/><h4>{event.location}</h4></div>
    </div>
  )
}

const BackgroundLines = () => {
  const n = 17;
  
  return (
    <div className={styles.backgroundLines}>
      {[...Array(n)].map( (e, i) => <div className={styles.backgroundLine} key={i}></div>)}
    </div>
  )
}

const getHeight = (startHour, endHour, rowHeight) => {
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

const getTopPos = (startHour, rowHeight) => {
  let startHourNumber = startHour - 12;
  startHourNumber = startHourNumber < 0 ? startHourNumber + 24 : startHourNumber;
  const topPos = startHourNumber * rowHeight + "px";
  return topPos;
}

export default Schedule;