import { JSX, useState, useEffect } from 'react'
import { Loan } from '../../types/Loan'
import { json } from 'stream/consumers'

const LoanInfo = (props: {
    loan: Loan | undefined
    onLoad: (name: string) => void
    onSubmit: (
        name: string,
        rate: number,
        length: number,
        amount: number,
        firstPayment: Date
    ) => void
}): JSX.Element => {
    const { loan, onSubmit, onLoad } = props

    const [name, setName] = useState(loan?.name)
    const [amount, setAmount] = useState(loan?.amount)
    const [length, setLength] = useState(loan?.term)
    const [rate, setRate] = useState(loan?.rate)
    const [firstPayment, setFirstPayment] = useState(
        loan ? loan.firstPayment.toISOString().slice(0, 10) : undefined
    )

    const [loanNames, setLoanNames] = useState<string[]>([])
    const [loanToLoad, setLoanToLoad] = useState('')

    useEffect(() => {
        fetch('/loans')
            .then((data) => data.json())
            .then((json: string[]) => {
                setLoanNames(json)
                setLoanToLoad(json.length ? json[0] : '')
            })
    }, [setLoanNames, setLoanToLoad])
    return (
        <div id='entry'>
            <h2>Loan Information</h2>
            <p>Loan Name</p>
            <input
                type='text'
                value={name}
                defaultValue={loan?.name}
                onChange={(e) => setName(e.target.value)}
            />
            <p>Loan Amount</p>
            <input
                type='text'
                value={amount}
                defaultValue={loan?.amount}
                onBlur={(e) => setAmount(parseInt(e.target.value))}
            />
            <p>Loan Length</p>
            <input
                type='text'
                value={length}
                defaultValue={loan?.term}
                onBlur={(e) => setLength(parseInt(e.target.value))}
            />
            <p>First Payment Date</p>
            <input
                type='date'
                value={firstPayment}
                defaultValue={
                    loan
                        ? loan.firstPayment.toISOString().slice(0, 10)
                        : '08/01/2025'
                }
                onChange={(e) => {
                    console.log(e.target.value)
                    setFirstPayment(
                        new Date(e.target.value).toISOString().slice(0, 10)
                    )
                }}
            />
            <p>Interest Rate</p>
            <input
                type='text'
                value={rate}
                defaultValue={loan?.rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
            />
            <br />
            {name && rate && length && amount && firstPayment && (
                <button
                    type='submit'
                    onClick={() => {
                        onSubmit(
                            name,
                            rate,
                            length,
                            amount,
                            new Date(firstPayment)
                        )
                    }}
                >
                    save
                </button>
            )}
            {loanNames.length > 0 && (
                <>
                    <select onChange={(e) => setLoanToLoad(e.target.value)}>
                        {loanNames.map((name) => (
                            <option key={name}>{name}</option>
                        ))}
                    </select>
                    <button type='button' onClick={() => onLoad(loanToLoad)}>
                        load
                    </button>
                </>
            )}
        </div>
    )
}

export default LoanInfo
