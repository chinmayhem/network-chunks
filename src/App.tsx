import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { useRawDumpQuery, loadOrigin } from './hooks/useRawDumpQuery';
import Header from './components/Header/Header';
import Chunks from './components/Chunks/Chunks';

function App() {
  const { data, refetch, isLoading } = useRawDumpQuery();
  const [origin, setOrigin] = useState<null | string>(null);

  const deleteData = useCallback(async () => {
    await new Promise(resolve => {
      loadOrigin().then(origin => {
        chrome.runtime.sendMessage(
          { type: 'CLEAR', payload: { origin } },
          resolve
        );
      });
    });
    refetch();
  }, [refetch]);

  const copyData = useCallback(() => {
    navigator.clipboard.writeText(data.join(','));
  }, [data]);

  useEffect(() => {
    loadOrigin().then((origin) => setOrigin(origin))
  }, []);

  return (
    <div className="App">
      <Header origin={origin} />
      <div className="container">
        <Chunks chunks={data} copyData={copyData} deleteData={deleteData} />
      </div>
    </div>
  );
}

export default App;
