import React, { useState, useMemo, useEffect } from 'react';

import { format, addDays, isBefore, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import {
  setHours,
  setMinutes,
  setSeconds,
  isEqual,
  setMilliseconds,
} from 'date-fns/esm';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import api from '../../services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
  const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [date, setDate] = useState(new Date());
  const [schedules, setSchedules] = useState([]);

  const dateFormated = useMemo(
    () => format(date, "d ' de ' MMMM", { locale: pt }),
    [date]
  );

  function incrementDate(dias) {
    setDate(addDays(date, dias));
  }

  useEffect(() => {
    async function carregar() {
      const response = await api.get('/schedules', {
        params: { date },
      });

      const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

      const data = range.map(hour => {
        const checkDate = setMilliseconds(
          setSeconds(setMinutes(setHours(date, hour), 0), 0),
          0
        );
        const compareDate = utcToZonedTime(checkDate, timeZone);

        return {
          time: `${hour}:00h`,
          past: isBefore(compareDate, new Date()),
          appointment: response.data.find(a => {
            console.tron.log(parseISO(a.date), compareDate);
            return isEqual(parseISO(a.date), compareDate);
          }),
        };
      });
      setSchedules(data);
    }
    carregar();
  }, [date, range]);

  return (
    <Container>
      <header>
        <button type='button' onClick={() => incrementDate(-1)}>
          <MdKeyboardArrowLeft color='#FFF' size={36} />
        </button>
        <strong>{dateFormated}</strong>
        <button type='button' onClick={() => incrementDate(1)}>
          <MdKeyboardArrowRight color='#FFF' size={36} />
        </button>
      </header>

      <ul>
        {schedules.map(schedule => (
          <Time
            key={schedule.time}
            past={schedule.past}
            available={!schedule.appointment}
          >
            <strong>{schedule.time}</strong>
            <span>
              {schedule.appointment
                ? schedule.appointment.user.name
                : 'Em Aberto'}
            </span>
          </Time>
        ))}
      </ul>
    </Container>
  );
}
