export interface Payment {
    balance: number
    day: Date
    principle: number
    interest: number
    extraPrinciple: number
}

export interface ExtraPayment {
    frequency: 'monthly' | 'yearly' | 'one-time'
    start: Date
    end?: Date
    amount: number
}

export interface PayoffInfo {
    monthlyPayment: number
    estimatedPayoff: Date
    term: number
    totalPayments: number
    totalInterest: number
}
