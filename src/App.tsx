import { useEffect } from 'react'
import './App.css'
import { useQuery } from './hook/useQuery'

function App() {
  const { refetch } = useQuery({
    queryKey: "HOME-KEY",
    url: "/todos",
  })
  useQuery({
    queryKey: "HOME-KEY",
    url: "/todos",
  })
  useQuery({
    queryKey: "HOME-KEY",
    url: "/todos",
  })

  
  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      Hello
    </>
  )
}

export default App
