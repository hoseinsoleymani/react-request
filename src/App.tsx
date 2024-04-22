import { useQuery } from './hook/useQuery';

interface Data {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

const App = () => {
  const { data, loading } = useQuery<Data[]>({
    queryKey: 'HOME-KEY',
    url: '/todos',
  });

  // Duplicate query with a same key
  useQuery({
    queryKey: 'HOME-KEY',
    url: '/todos',
  });
  useQuery({
    queryKey: 'HOME-KEY',
    url: '/todos',
  });

  // Refetch a query

  // useEffect(() => {
  //   refetch()
  // }, [])

  if (loading || !data) return <span>loading...</span>;

  return <h1>React Request</h1>;
};

export default App;
