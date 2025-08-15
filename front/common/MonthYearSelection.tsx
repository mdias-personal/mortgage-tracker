import { JSX, useState } from 'react'
import { reverseMonths, months } from '../types/consts'

const MonthYearSelection = (props: { onSelect: (date: Date) => void; startMonth?: number; startYear?: number; length: number }): JSX.Element => {
    const { onSelect, startMonth, startYear, length } = props
    const today = new Date()
    const [curMonth, setCurMonth] = useState(reverseMonths.get(startMonth ?? today.getMonth() + 1) ?? 'Jan')
    const [curYear, setCurYear] = useState(startYear ?? today.getFullYear())

    const years: string[] = []
    for (let i = curYear; i <= curYear + length; i++) {
        years.push(i + '')
    }
    return (
        <>
            <label htmlFor='month-input'>
                <b>Start Month</b>
            </label>
            <select
                id='month-input'
                value={curMonth}
                onChange={(e) => {
                    const month: string = months.get(e.target.value) ?? 'Fuk'
                    const date = `${month}/01/${curYear}`
                    console.log(date)
                    setCurMonth(e.target.value)
                    onSelect(new Date(date))
                }}
            >
                {months
                    .keys()
                    .toArray()
                    .map((m) => (
                        <option key={m}>{m}</option>
                    ))}
            </select>
            <br />
            <label htmlFor='year-input'>
                <b>Start Year</b>
            </label>
            <select
                id='year-input'
                value={curYear}
                onChange={(e) => {
                    const year: number = parseInt(e.target.value)
                    const month: string = months.get(curMonth) ?? 'Fuk'
                    const date = `${month}/01/${year}`
                    setCurYear(year)
                    onSelect(new Date(date))
                }}
            >
                {years.map((y) => (
                    <option key={y}>{y}</option>
                ))}
            </select>
            <br />
        </>
    )
}

export default MonthYearSelection
