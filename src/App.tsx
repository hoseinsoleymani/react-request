import './App.css'
import { useQuery } from './hook/useQuery'

function App() {
  const { data, error, loading } = useQuery({
    queryKey: "HOME-KEY",
    url: "/todos",
  })

  console.log(data, error, loading)

  return (
    <>
      Hello
    </>
  )
}

export default App
