import "./App.css";
import { useNeoDataQuery } from "./hooks/useNeoNasaQuery";

function App() {
  const { data, isLoading, error } = useNeoDataQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // TODO: Use data.near_earth_objects
  console.log(data);

  return <div>Dashboard</div>;
}

export default App;
