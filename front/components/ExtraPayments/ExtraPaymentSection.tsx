import { JSX } from 'react'
import { ExtraPayment } from '../../types/interfaces'
import ExtraPaymentListItem from './ExtraPaymentListItem'

const ExtraPaymentSection = (props: {
    onAdd: () => void
    onDelete: (i: number) => void
    onEdit: (i: number) => void
    extraPayments: ExtraPayment[]
}): JSX.Element => {
    const { onAdd, onDelete, onEdit, extraPayments } = props

    return (
        <div id='extra'>
            <h2>Extra Payments</h2>
            <div className='scroll'>
                <ul>
                    {extraPayments.map((p, i) => (
                        <ExtraPaymentListItem key={`extra_payment_${i}`} payment={p} onDelete={() => onDelete(i)} onEdit={() => onEdit(i)} />
                    ))}
                </ul>
            </div>
            <button onClick={() => onAdd()}>add</button>
        </div>
    )
}

export default ExtraPaymentSection
