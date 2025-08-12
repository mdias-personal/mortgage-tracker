import { JSX } from 'react'
import PaymentListItem from './PaymentListItem'
import { Payment } from '../../types/interfaces'

const PaymentScheduleSection = (props: {
    payments: Payment[]
}): JSX.Element => {
    const { payments } = props
    return (
        <div id='payments'>
            <h2>Payment Schedule</h2>
            <div className='scroll'>
                <ul>
                    {payments.map((p, i) => (
                        <PaymentListItem
                            key={`scheduled_payment_${i}`}
                            {...p}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PaymentScheduleSection
