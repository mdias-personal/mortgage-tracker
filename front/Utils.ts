import { LoanDTO } from '../mid/types'
import { Loan } from './types/Loan'

export function round(num: number): number {
    return Math.round(100 * num) / 100
}

export function convertToLoanDTO(loan: Loan): LoanDTO {
    return {
        name: loan.name,
        principle: loan.amount,
        term: loan.term,
        balance: 0,
        start: loan.firstPayment,
        rate: loan.rate * 100,
        extraPayments: loan.extraPayments,
    }
}

export function convertToLoan(dto: LoanDTO): Loan {
    return new Loan(
        dto.name,
        dto.rate,
        dto.term,
        dto.principle,
        new Date(dto.start),
        dto.extraPayments.map((e) => ({
            amount: e.amount,
            start: new Date(e.start),
            ...(e.end && { end: new Date(e.end) }),
            frequency: e.frequency,
        }))
    )
}

export function getFrequency(value: string): 'monthly' | 'yearly' | 'one-time' {
    if (value === 'yearly') {
        return 'yearly'
    } else if (value === 'one-time') {
        return 'one-time'
    } else {
        return 'monthly'
    }
}
