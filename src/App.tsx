import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useAppSelector, increment, useAppDispatch } from "./counterReducer";
import { Button, Space } from "antd";
import { useGetPeopleByNumberQuery } from "./service";

function App() {
  const countFromReducer = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetPeopleByNumberQuery("2");

  return (
    <>
      <div>
        {isLoading ? (
          <>
            {error ? (
              <pre>{JSON.stringify(error)}</pre>
            ) : (
              <pre>{JSON.stringify(data)}</pre>
            )}
          </>
        ) : (
          "Loading..."
        )}
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => dispatch(increment())}>
          count is {countFromReducer}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
