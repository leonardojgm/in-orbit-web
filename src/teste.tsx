//JSX - JavaScript XML -> HTML
import { useEffect, useState } from 'react'
import { Dialog } from './components/ui/dialog'
import { CreateGoal } from './components/create-goal'
import { Summary } from './components/summary'
import { EmptyGoals } from './components/empty-goals'

type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: Record<
    string,
    {
      id: string
      title: string
      completedAt: string
    }[]
  >
}

export function App() {
  // const [count, setCount] = useState(5)

  // function increment() {
  //   setCount(count + 1)
  // }
  const [summary, setSummary] = useState<SummaryResponse | null>(null)

  useEffect(() => {
    fetch('http://localhost:3333/summary')
      .then(response => {
        return response.json()
      })
      .then(data => {
        setSummary(data.summary)
      })
  }, [])

  return (
    <Dialog>
      {/* <button type="button" onClick={increment}>
        Incrementar
      </button>
      <h1 className="text-4xl">{count}</h1> 
      <pre>{JSON.stringify(summary, null, 2)}</pre>*/}
      {summary?.total && summary.total > 0 ? <Summary /> : <EmptyGoals />}
      {/* <EmptyGoals/> */}
      {/* <Summary/> */}
      <CreateGoal />
    </Dialog>
  )
}
