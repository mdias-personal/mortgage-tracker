import { JSX } from 'react'
import { PayoffInfo } from '../../types/interfaces'
import './PayoffInformationSection.css'
import { displayMoney, round } from '../../Utils'

const PayoffInformationSection = (props: { info: PayoffInfo }): JSX.Element => {
    const { info } = props
    return (
        <div id='result'>
            <h2>Payoff Information</h2>
            <div id='plan'>
                <label htmlFor='monthly_payment'>
                    <b>Monthly Payment</b>
                </label>
                <span id='monthly_payment'>{displayMoney(info.monthlyPayment)}</span>
                <br />
                <label htmlFor='payoff_date'>
                    <b>Estimated Payoff Date</b>
                </label>
                <span id='payoff_date'>{info.estimatedPayoff.toLocaleDateString()}</span>
                <br />
                <label htmlFor='payoff_term'>
                    <b>Payoff Term</b>
                </label>
                <span id='payoff_term'>{round(info.term)} years</span>
                <br />
                <label htmlFor='payoff_payments'>
                    <b>Total Payments</b>
                </label>
                <span id='payoff_payments'>{info.totalPayments}</span>
                <br />
                <label htmlFor='payoff_interest'>
                    <b>Total Interest Paid</b>
                </label>
                <span id='payoff_interest'>{displayMoney(info.totalInterest)}</span>
            </div>
        </div>
    )
}

export default PayoffInformationSection
