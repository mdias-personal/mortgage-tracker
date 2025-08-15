import { JSX, useState } from 'react'
import { ExtraPayment } from '../../types/interfaces'
import './ExtraPayment.css'
import { months, reverseMonths } from '../../types/consts'
import { getFrequency } from '../../Utils'
import MonthYearSelection from '../../common/MonthYearSelection'

const ExtraPaymentForm = (props: {
    payment: ExtraPayment | undefined
    startYear: number
    length: number
    onSubmit: (newExtra: ExtraPayment) => void
    onClose: () => void
}): JSX.Element => {
    const { payment, length, onSubmit, onClose } = props
    const [newExtra, setNewExtra] = useState<ExtraPayment>(
        payment ?? {
            amount: 500,
            frequency: 'monthly',
            start: new Date('01/01/2025'),
        }
    )

    return (
        <div className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={() => onClose()}>
                    &times;
                </span>
                <h2>{payment ? 'Edit' : 'Add'} Extra Payment</h2>
                <label htmlFor='input-extraAmount'>
                    <b>Amount</b>
                </label>
                <input
                    id='input-extraAmount'
                    defaultValue={newExtra.amount}
                    type='text'
                    onBlur={(e) =>
                        setNewExtra({
                            ...newExtra,
                            amount: parseInt(e.target.value),
                        })
                    }
                />
                <br />
                <label htmlFor='input-frequency'>
                    <b>Frequency</b>
                </label>
                <select
                    id='input-frequency'
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
                <br />
                <MonthYearSelection
                    startMonth={newExtra?.start.getMonth()}
                    startYear={newExtra?.start.getFullYear()}
                    length={length}
                    onSelect={(date) => setNewExtra({ ...newExtra, start: date })}
                />
                <button onClick={() => onSubmit(newExtra)}>save</button>
            </div>
        </div>
    )
}
export default ExtraPaymentForm
