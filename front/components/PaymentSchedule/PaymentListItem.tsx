import { JSX } from 'react'
import { Payment } from '../../types/interfaces'
import { displayMoney } from '../../Utils'

const ScheduledPayment = (payment: Payment): JSX.Element => {
    return (
        <li className='payment'>
            <label htmlFor='scheduled-payment'>
                <b>Date:</b>
            </label>
            <span id='scheduled-payment'>
                {payment.day.toLocaleDateString('en-us', {
                    timeZone: 'America/New_York',
                })}
            </span>
            <br />
            <label htmlFor='scheduled-principle'>
                <b>Principle:</b>
            </label>
            <span id='scheduled-principle'>{displayMoney(payment.principle)}</span>
            <br />
            <label htmlFor='scheduled-extraPrinciple'>
                <b>Extra Principle:</b>
            </label>
            <span id='scheduled-extraPrinciple'>{displayMoney(payment.extraPrinciple)}</span>
            <br />
            <label htmlFor='scheduled-interest'>
                <b>Interest:</b>
            </label>
            <span id='scheduled-interest'>{displayMoney(payment.interest)}</span>
            <br />
            <label htmlFor='scheduled-balance'>
                <b>Balance:</b>
            </label>
            <span id='scheduled-balance'>{displayMoney(payment.balance)}</span>
            <br />
        </li>
    )
}

export default ScheduledPayment
