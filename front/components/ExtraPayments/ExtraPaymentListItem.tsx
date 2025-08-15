import { JSX } from 'react'
import { ExtraPayment } from '../../types/interfaces'
import { displayMoney, round } from '../../Utils'

const ExtraPaymentListItem = (props: { payment: ExtraPayment; onDelete: () => void; onEdit: () => void }): JSX.Element => {
    const { payment, onDelete, onEdit } = props
    return (
        <li className='payment'>
            <>
                <label htmlFor='extra-startDate'>
                    <b>Start Date:</b>
                </label>
                <span id='extra-startDate'>
                    {payment.start.toLocaleDateString('en-us', {
                        timeZone: 'America/New_York',
                    })}
                </span>
                {payment.end && (
                    <>
                        <label htmlFor='extra-endDate'>
                            <b>End Date:</b>
                        </label>
                        <span id='extra-endDate'>{payment.end.toLocaleDateString()}</span>
                    </>
                )}
                <label htmlFor='extra-amount'>
                    <b>Amount:</b>
                </label>
                <span id='extra-amount'>{displayMoney(payment.amount)}</span>
                <br />
                <label htmlFor='extra-frequency'>
                    <b>Frequency:</b>
                </label>
                <span id='extra-frequency'>{payment.frequency}</span>
                <br />
            </>
            <button type='submit' onClick={() => onEdit()}>
                edit
            </button>
            <button type='submit' onClick={() => onDelete()}>
                delete
            </button>
        </li>
    )
}

export default ExtraPaymentListItem
