import { JSX } from 'react'
import { Payment } from '../../types/interfaces'
import { round } from '../../Utils'

const ScheduledPayment = (payment: Payment): JSX.Element => {
    return (
        <li className='payment'>
            <p>
                <b>Date:</b> {payment.day.toLocaleDateString()}
            </p>
            <p>
                <b>Principle:</b> {round(payment.principle)}
            </p>
            <p>
                <b>Extra Principle:</b> {round(payment.extraPrinciple)}
            </p>
            <p>
                <b>Interest:</b> {round(payment.interest)}
            </p>
            <p>
                <b>Balance:</b> {round(payment.balance)}
            </p>
        </li>
    )
}

export default ScheduledPayment
