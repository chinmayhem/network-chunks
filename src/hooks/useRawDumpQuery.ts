import { useQuery } from 'react-query';
import { read } from '../chrome/storageService';

const useRawDumpQuery = () => {
  const { host } = new URL(window.location.toString());
  return useQuery('rawDump', () => {
    const promise = read('');
    return promise;
  });
}
  

export { useRawDumpQuery };
