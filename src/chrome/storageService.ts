import { STORAGE_KEY } from './constants';

function read(host: string): Promise<any> {
  console.log({ host });
  return new Promise(resolve => {
    chrome.storage.local.get([`${STORAGE_KEY}-${host}`], result => {
      resolve(result[`${STORAGE_KEY}-${host}`]);
    });
  });
}

function write(value: string[], host: string): Promise<void> {
  console.log({ value, host });
  return new Promise((resolve) => {
    chrome.storage.local.set({ [`${STORAGE_KEY}-${host}`]: value }, () => resolve());
  });
}


export { read, write };
