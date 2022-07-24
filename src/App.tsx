import React, { useCallback } from 'react';
import './App.css';
import { useRawDumpQuery } from './hooks/useRawDumpQuery';

function App() {
  const { data, refetch, isLoading } = useRawDumpQuery();

  const deleteData = useCallback(async () => {
    await new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "CLEAR" }, resolve);
    })
    refetch();
  }, [refetch]);

  const copyData = useCallback( () => {
    navigator.clipboard.writeText(data.join(','))
  }, [data]);

  return (
    <div className="App">
      <div style={{display: 'flex'}}>
        <button onClick={data ? copyData : undefined}>COPY</button>
        <button style={{marginLeft: 'auto'}} onClick={deleteData}>DELETE</button>
      </div>
      {data ? <pre style={{fontSize: '16px'}}>
        {JSON.stringify(data, null, 2)}
      </pre> : null}
    </div>
  );
}

export default App;
