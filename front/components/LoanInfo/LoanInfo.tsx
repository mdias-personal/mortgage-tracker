import { JSX, useState, useEffect } from 'react'
import { Loan } from '../../types/Loan'
import { json } from 'stream/consumers'
import MonthYearSelection from '../../common/MonthYearSelection'

const LoanInfo = (props: {
    loan: Loan | undefined
    onLoad: (name: string) => void
    onSubmit: (name: string, rate: number, length: number, amount: number, start: Date) => void
}): JSX.Element => {
    const { loan, onSubmit, onLoad } = props

    const [name, setName] = useState(loan?.name)
    const [amount, setAmount] = useState(loan?.principle)
    const [length, setLength] = useState(loan?.term)
    const [rate, setRate] = useState(loan?.rate)
    const [start, setStart] = useState(loan ? loan.start.toISOString().slice(0, 10) : undefined)

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
            <label htmlFor='name-input'>
                <b>Loan Name</b>
            </label>
            <input id='name-input' type='text' defaultValue={loan?.name} onChange={(e) => setName(e.target.value)} />
            <br />
            <label htmlFor='principle-input'>
                <b>Loan Amount</b>
            </label>
            <input id='principle-input' type='text' defaultValue={loan?.principle} onBlur={(e) => setAmount(parseInt(e.target.value))} />
            <br />
            <label htmlFor='term-input'>
                <b>Loan Length</b>
            </label>
            <input id='term-input' type='text' defaultValue={loan?.term} onBlur={(e) => setLength(parseInt(e.target.value))} />
            <br />
            <MonthYearSelection
                length={length || 30}
                onSelect={(date) => setStart(date.toLocaleDateString().slice(0, 10))}
                startMonth={start ? new Date(start).getMonth() : undefined}
                startYear={start ? new Date(start).getFullYear() : undefined}
            />
            <label htmlFor='rate-input'>
                <b>Interest Rate</b>
            </label>
            <input id='rate-input' type='text' defaultValue={loan && loan.rate} onBlur={(e) => setRate(parseFloat(e.target.value))} />
            <br />
            {name && rate && length && amount && start && (
                <button
                    type='submit'
                    onClick={() => {
                        onSubmit(name, rate, length, amount, new Date(start))
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
