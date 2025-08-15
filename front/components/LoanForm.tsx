import { useState } from 'react'
import { Loan } from '../types/Loan'
import { LoanDTO } from '../../mid/types'
import './LoanForm.css'
import { ExtraPayment, Payment, PayoffInfo } from '../types/interfaces'
import LoanInfo from './LoanInfo/LoanInfo'
import ExtraPaymentForm from './ExtraPayments/ExtraPaymentForm'
import { convertToLoan, convertToLoanDTO } from '../Utils'
import ExtraPaymentSection from './ExtraPayments/ExtraPaymentSection'
import PaymentScheduleSection from './PaymentSchedule/PaymentScheduleSection'
import PayoffGraphSection from './PayoffGraph/PayoffGraphSection'
import PayoffInformationSection from './PayoffInformation/PayoffInformationSection'

const LoanForm: React.FC = () => {
    const [loan, setLoan] = useState<undefined | Loan>()
    const [payments, setPayments] = useState<Payment[]>([])
    const [extraPayments, setExtraPayments] = useState<ExtraPayment[]>([])
    const [payoffInfo, setPayoffInfo] = useState<undefined | PayoffInfo>()
    const [showExtraForm, setShowExtraForm] = useState(false)
    const [newExtraIndex, setNewExtraIndex] = useState<number | undefined>()

    const resetVals = (l: Loan): void => {
        setExtraPayments([...l.extraPayments])
        setPayments([...l.actualPayments])
        setPayoffInfo({
            ...l.getPayoffInfo(),
        })
    }
    return (
        <div id='main'>
            <div id='top'>
                <LoanInfo
                    loan={loan}
                    onLoad={(name) => {
                        fetch(`/load/${name}`)
                            .then((data) => data.json())
                            .then((json: LoanDTO) => {
                                const l = convertToLoan(json)
                                setLoan(l)
                                resetVals(l)
                            })
                    }}
                    onSubmit={(name, rate, length, amount, firstPayment) => {
                        const l = new Loan(name, rate, length, amount, new Date(firstPayment), extraPayments)
                        setLoan(l)
                        resetVals(l)
                        fetch('/save', {
                            method: 'POST',
                            body: JSON.stringify(convertToLoanDTO(l)),
                            headers: { 'Content-Type': 'application/json' },
                        })
                    }}
                />
                {loan && extraPayments && (
                    <ExtraPaymentSection
                        extraPayments={extraPayments}
                        onAdd={() => {
                            setNewExtraIndex(undefined)
                            setShowExtraForm(true)
                        }}
                        onEdit={(i: number) => {
                            setNewExtraIndex(i)
                            setShowExtraForm(true)
                        }}
                        onDelete={(i: number) => {
                            loan.deleteExtra(i)
                            resetVals(loan)
                        }}
                    />
                )}
                {payoffInfo && <PayoffInformationSection info={payoffInfo} />}
            </div>
            <div id='bottom'>
                {loan && payments.length > 0 && (
                    <>
                        <PaymentScheduleSection payments={payments} />
                        <PayoffGraphSection loan={loan} />
                    </>
                )}
            </div>
            {loan && showExtraForm && (
                <ExtraPaymentForm
                    onClose={() => setShowExtraForm(false)}
                    startYear={loan.start.getFullYear()}
                    length={loan.term}
                    payment={newExtraIndex ? extraPayments[newExtraIndex] : undefined}
                    onSubmit={(payment: ExtraPayment) => {
                        console.log(newExtraIndex)
                        if (newExtraIndex !== undefined) {
                            loan.editExtra(newExtraIndex, payment)
                        } else {
                            loan.addExtra(payment)
                        }
                        resetVals(loan)
                        setShowExtraForm(false)
                    }}
                />
            )}
        </div>
    )
}

export default LoanForm
