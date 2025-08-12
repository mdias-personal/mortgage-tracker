import { JSX } from 'react'
import { ExtraPayment } from '../../types/interfaces'
import { round } from '../../Utils'

const ExtraPaymentListItem = (props: {
    payment: ExtraPayment
    onDelete: () => void
    onEdit: () => void
}): JSX.Element => {
    const { payment, onDelete, onEdit } = props
    return (
        <li className='payment'>
            <>
                <p>
                    <b>Start Date:</b> {payment.start.toLocaleDateString()}
                </p>
                {payment.end && (
                    <p>
                        <b>End Date:</b> {payment.end.toLocaleDateString()}
                    </p>
                )}
                <p>
                    <b>Amount:</b> {round(payment.amount)}
                </p>
                <p>
                    <b>Frequency:</b> {payment.frequency}
                </p>
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
