import { JSX, useState } from 'react'
import { ExtraPayment } from '../../types/interfaces'
import './ExtraPayment.css'
import { months, reverseMonths } from '../../types/consts'
import { getFrequency } from '../../Utils'

const ExtraPaymentForm = (props: {
    payment: ExtraPayment | undefined
    startYear: number
    length: number
    onSubmit: (newExtra: ExtraPayment) => void
    onClose: () => void
}): JSX.Element => {
    const { payment, startYear, length, onSubmit, onClose } = props
    const [newExtra, setNewExtra] = useState<ExtraPayment>(
        payment ?? {
            amount: 500,
            frequency: 'monthly',
            start: new Date('01/01/2025'),
        }
    )

    const [curMonth, setCurMonth] = useState(
        payment ? (reverseMonths.get(payment.start.getMonth()) ?? 'Jan') : 'Jan'
    )
    const [curYear, setCurYear] = useState(
        payment ? payment.start.getFullYear() : '2025'
    )

    const years: string[] = []
    for (let i = startYear; i <= startYear + length; i++) {
        years.push(i + '')
    }

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={() => onClose()}>
                    &times;
                </span>
                <p>
                    <b>Amount:</b>
                </p>
                <input
                    value={newExtra.amount}
                    type='text'
                    onChange={(e) =>
                        setNewExtra({
                            ...newExtra,
                            amount: parseInt(e.target.value),
                        })
                    }
                />
                <p>
                    <b>Frequency:</b>
                </p>
                <select
                    value={newExtra.frequency}
                    onChange={(e) =>
                        setNewExtra({
                            ...newExtra,
                            frequency: getFrequency(e.target.value),
                        })
                    }
                >
                    <option>monthly</option>
                    <option>yearly</option>
                    <option>one-time</option>
                </select>
                <p>
                    <b>Start Month:</b>
                </p>
                <select
                    value={curMonth}
                    onChange={(e) => {
                        const month: string =
                            months.get(e.target.value) ?? 'Fuk'
                        const date = `${month}/01/${curYear}`
                        console.log(date)
                        setCurMonth(e.target.value)
                        setNewExtra({
                            ...newExtra,
                            start: new Date(date),
                        })
                    }}
                >
                    {months
                        .keys()
                        .toArray()
                        .map((m) => (
                            <option key={m}>{m}</option>
                        ))}
                </select>
                <p>
                    <b>Start Year:</b>
                </p>
                <select
                    value={curYear}
                    onChange={(e) => {
                        const year: string = e.target.value
                        const month: string = months.get(curMonth) ?? 'Fuk'
                        const date = `${month}/01/${year}`
                        setCurYear(year)
                        setNewExtra({
                            ...newExtra,
                            start: new Date(date),
                        })
                    }}
                >
                    {years.map((y) => (
                        <option key={y}>{y}</option>
                    ))}
                </select>
                <button onClick={() => onSubmit(newExtra)}>save</button>
            </div>
        </div>
    )
}
export default ExtraPaymentForm
