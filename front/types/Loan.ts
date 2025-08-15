import { LoanDTO } from '../../mid/types'
import { Payment, ExtraPayment, PayoffInfo } from './interfaces'

export class Loan implements LoanDTO {
    name: string
    rate: number
    term: number
    start: Date
    principle: number
    monthlyPayment: number
    extraPayments: ExtraPayment[]
    actualPayments: Payment[]

    constructor(name: string, rate: number, term: number, principle: number, start: Date, extraPayments?: ExtraPayment[]) {
        this.name = name
        this.principle = principle
        this.start = start
        this.rate = rate
        this.term = term
        this.extraPayments = extraPayments ?? []
        this.monthlyPayment = this.calculatePayment()
        this.actualPayments = this.calculatePayments()
        console.log(this)
    }

    calculatePayment(): number {
        const totalPayments = this.term * 12
        const monthlyInterest = this.rate / 100 / 12
        const result = (this.principle * (monthlyInterest * (1 + monthlyInterest) ** totalPayments)) / ((1 + monthlyInterest) ** totalPayments - 1)
        return Math.round(100 * result) / 100
    }

    calculatePayments(): Payment[] {
        let additionalPrinciple = this.getAdditionalPrinciple(this.start)
        let money = this.calculatePrinciple(this.principle, additionalPrinciple)

        const payments: Payment[] = [
            {
                balance: this.principle - (money.principle + money.extraPrinciple),
                day: this.start,
                ...money,
            },
        ]

        let index = 0
        while (payments[index].balance > 0) {
            const prev = payments[index]
            index++
            const date = new Date(new Date(prev.day).setMonth(prev.day.getMonth() + 1))

            additionalPrinciple = this.getAdditionalPrinciple(date)
            money = this.calculatePrinciple(prev.balance, additionalPrinciple)

            if (index === 359) {
                money.extraPrinciple = prev.balance - money.principle
            }

            payments.push({
                balance: prev.balance - (money.principle + money.extraPrinciple),
                day: date,
                ...money,
            })
        }

        return payments
    }

    calculatePrinciple(
        balance: number,
        additionalPrinciple: number
    ): {
        principle: number
        extraPrinciple: number
        interest: number
    } {
        const interest = balance * (this.rate / 100 / 12)
        let principle = this.monthlyPayment - interest
        let extraPrinciple = additionalPrinciple

        if (principle + extraPrinciple > balance) {
            if (principle > balance) {
                principle = balance
                extraPrinciple = 0
            } else {
                extraPrinciple = balance - principle
            }
        }
        return {
            interest: interest,
            extraPrinciple: extraPrinciple,
            principle: principle,
        }
    }

    getAdditionalPrinciple(day: Date): number {
        let extra = 0
        const [month, year] = [day.getMonth(), day.getFullYear()]

        this.extraPayments.forEach((p) => {
            if (p.end && p.end < day) {
                extra += 0
            } else if (p.frequency === 'monthly') {
                extra += p.amount
            } else if (p.frequency === 'yearly' && p.start.getMonth() === month) {
                extra += p.amount
            } else if (p.frequency === 'one-time' && p.start.getMonth() === month && p.start.getFullYear() === year) {
                extra += p.amount
            } else {
                extra += 0
            }
        })

        return extra
    }

    addExtra(payment: ExtraPayment): void {
        this.extraPayments.push(payment)
        this.sortExtraPayments()
        this.actualPayments = this.calculatePayments()
    }
    deleteExtra(i: number): void {
        this.extraPayments = this.extraPayments.filter((_p, index) => index !== i)
        this.sortExtraPayments()
        this.actualPayments = this.calculatePayments()
    }
    editExtra(i: number, payment: ExtraPayment): void {
        this.extraPayments[i] = payment
        this.sortExtraPayments()
        this.actualPayments = this.calculatePayments()
    }

    sortExtraPayments(): void {
        this.extraPayments.sort((a, b) => (a.start <= b.start ? -1 : 1))
    }

    getPayoffInfo(): PayoffInfo {
        return {
            monthlyPayment: this.monthlyPayment,
            estimatedPayoff: this.actualPayments[this.actualPayments.length - 1].day,
            term: this.actualPayments.length / 12,
            totalPayments: this.actualPayments.length,
            totalInterest: this.actualPayments
                .map((p) => p.interest)
                .reduce((a, b) => {
                    return (a += b)
                }),
        }
    }
}
