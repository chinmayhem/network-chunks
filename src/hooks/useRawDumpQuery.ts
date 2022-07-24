import { useQuery } from 'react-query';
import { read } from '../chrome/storageService';

export function loadOrigin(): Promise<string>{
  return new Promise(res => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var tab = tabs[0];
      var url = tab.url;
      const { origin } = new URL(url || '');
      res(origin || 'ORIGIN_NOT_FOUND');
    });
  })
}

const useRawDumpQuery = () => {
  return useQuery('rawDump', () => {
    const promise = loadOrigin().then(origin => read(origin) );
    return promise;
  });
}


export { useRawDumpQuery };
