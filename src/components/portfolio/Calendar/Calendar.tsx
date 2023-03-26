import { useEffect, useState } from 'react'
import s from './Calendar.module.css'
import cn from 'clsx'
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md'

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'] as const

const getDates = (year: number, month: number) => {
  const dt = new Date(year, month - 1, 1)
  const start = dt.getDay()
  const dates = []

  while (dt.getMonth() === month - 1) {
    const d = dt.getDate()
    dates.push(d)
    dt.setDate(d + 1)
  }

  return { dates, index: { start, end: dt.getDay() } }
}

const Calendar = () => {
  const dt = new Date()
  const [year, setYear] = useState<number>(dt.getFullYear())
  const [month, setMonth] = useState<number>(dt.getMonth() + 1)
  const [dates, setDates] = useState<{
    prev: number[]
    current: number[]
    next: number[]
  }>({ prev: [], current: [], next: [] })

  useEffect(() => {
    const { dates: prev } = getDates(year, month - 1)
    const {
      dates,
      index: { start, end },
    } = getDates(year, month)

    setDates((p) => {
      return {
        prev: prev.slice(start * -1),
        current: dates,
        next: Array.from({ length: 7 - end }, (_, i) => i + 1),
      }
    })
  }, [year, month])

  return (
    <div className={s.calendar_root}>
      <header className={s.calendar__header}>
        <button
          onClick={() => setMonth((month) => month - 1)}
          className={s.arrow}
        >
          <MdOutlineArrowLeft />
        </button>
        <label>
          <select
            name={'year'}
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value))
            }}
          >
            {Array.from({ length: 11 }).map((_, i) => (
              <option key={i} value={dt.getFullYear() - (10 - i)}>
                {dt.getFullYear() - (10 - i)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <select
            name={'month'}
            value={month}
            onChange={(e) => {
              setMonth(Number(e.target.value))
            }}
          >
            {Array.from({ length: dt.getDate() }).map((dt, i) => (
              <option value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <button
          onClick={() => setMonth((month) => month + 1)}
          className={s.arrow}
        >
          <MdOutlineArrowRight />
        </button>
      </header>
      <button>전체보기</button>
      <main className={s.calendar__main}>
        <ul className={s.dates}>
          {WEEKS.map((week) => (
            <li className={s.week}>{week}</li>
          ))}
          {dates.prev?.map((date, i) => {
            return (
              <li
                className={cn(s.date, {
                  [s.dim]: true,
                })}
              >
                {date}
              </li>
            )
          })}
          {dates.current.map((date, i) => {
            return (
              <li
                className={cn(s.date, {
                  [s.current]:
                    month === dt.getMonth() + 1 && dt.getDate() === date,
                })}
              >
                {date}
              </li>
            )
          })}
          {dates.next.map((date, i) => {
            return (
              <li
                className={cn(s.date, {
                  [s.dim]: true,
                })}
              >
                {date}
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default Calendar
