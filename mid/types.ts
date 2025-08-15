export interface LoanDTO {
    name: string
    term: number
    rate: number
    principle: number
    balance?: number
    start: Date
    extraPayments: {
        amount: number
        start: Date
        end?: Date
        frequency: 'one-time' | 'monthly' | 'yearly'
    }[]
}
