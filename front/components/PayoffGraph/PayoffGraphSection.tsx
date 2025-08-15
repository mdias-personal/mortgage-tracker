import { JSX, useState } from 'react'
import { AllowedValue, LineSeries, ResponsiveLine } from '@nivo/line'
import { Loan } from '../../types/Loan'
import { convertToLoanDTO } from '../../Utils'
import { Payment } from '../../types/interfaces'

const PayoffGraphSection = (props: { loan: Loan }): JSX.Element => {
    const { loan } = props
    const noExtraLoan = new Loan(loan.name, loan.rate, loan.term, loan.principle, loan.start)

    const [showNoExtra, setShowNoExtra] = useState(false)
    const d: LineSeries[] = [
        {
            id: !showNoExtra ? 'balance' : 'balance w/ extra',
            data: loan.actualPayments.map((p) => ({
                x: p.day,
                y: p.balance,
            })),
        },
        ...(!showNoExtra
            ? [
                  {
                      id: 'total principle',
                      data: getTotalByDay(loan.actualPayments, (p: Payment) => p.principle + p.extraPrinciple),
                  },
                  {
                      id: 'total interest',
                      data: getTotalByDay(loan.actualPayments, (p: Payment) => p.interest),
                  },
              ]
            : [
                  {
                      id: 'total principle',
                      data: getTotalByDay(noExtraLoan.actualPayments, (p: Payment) => p.principle + p.extraPrinciple),
                  },
                  {
                      id: 'total interest',
                      data: getTotalByDay(noExtraLoan.actualPayments, (p: Payment) => p.interest),
                  },
                  {
                      id: 'balance w/o extra',
                      data: noExtraLoan.actualPayments.map((p) => ({
                          x: p.day,
                          y: p.balance,
                      })),
                  },
              ]),
    ]
    return (
        <div id='graphs'>
            <h2>Payoff Graph</h2>
            <input type='checkbox' checked={showNoExtra} onChange={() => setShowNoExtra(!showNoExtra)} />
            <p>Show with no extra payments</p>
            <ResponsiveLine /* or Line for fixed dimensions */
                data={d}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false,
                }}
                yFormat={'>-$.2f'}
                axisLeft={{ legend: 'amount', legendOffset: -40 }}
                xScale={{
                    type: 'time',
                    min: 'auto',
                    max: 'auto',
                }}
                axisBottom={{
                    legend: 'payment date',
                    legendOffset: 36,
                    format: () => '',
                }}
                pointSize={10}
                enablePoints={false}
                enableCrosshair={false}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'seriesColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                colors={{ scheme: 'tableau10' }}
                theme={{
                    legends: {
                        text: {
                            fontSize: '24px',
                        },
                    },
                }}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        itemWidth: 500,
                        translateX: 450,
                        itemHeight: 100,
                        itemsSpacing: 20,
                        symbolShape: 'diamond',
                    },
                ]}
                markers={[
                    {
                        axis: 'x',
                        legend: 'today',
                        lineStyle: {
                            stroke: '#e7569aff',
                            strokeWidth: 2,
                        },
                        value: new Date().setDate(1),
                    },
                ]}
            />
        </div>
    )
}

export default PayoffGraphSection

function getTotalByDay(
    payments: Payment[],
    f: (p: Payment) => number
): {
    x: AllowedValue
    y: AllowedValue
}[] {
    const result: { x: AllowedValue; y: AllowedValue }[] = []
    let total = 0
    payments.forEach((p) => {
        total += f(p)
        result.push({
            x: p.day,
            y: total,
        })
    })
    return result
}
