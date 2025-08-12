import { JSX } from 'react'
import { PayoffInfo } from '../../types/interfaces'

const PaymentInformationSection = (props: {
    info: PayoffInfo
}): JSX.Element => {
    const { info } = props
    return (
        <div id='result'>
            <h2>Payment Information</h2>
            <p>Monthly Payment</p>
            <p>{info.monthlyPayment}</p>
            <p>Estimated Payoff Date</p>
            <p>{info.estimatedPayoff.toLocaleDateString()}</p>
            <p>Payoff Term</p>
            <p>{info.term} years</p>
            <p>Total Payments</p>
            <p>{info.totalPayments}</p>
            <p>Total Interest Paid</p>
            <p>{info.totalInterest}</p>
        </div>
    )
}

export default PaymentInformationSection
