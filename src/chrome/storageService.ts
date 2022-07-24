import { STORAGE_KEY } from './constants';

function read(origin: string): Promise<any> {
  console.log({ origin });
  return new Promise(resolve => {
    chrome.storage.local.get([`${STORAGE_KEY}-${origin}`], result => {
      resolve(result[`${STORAGE_KEY}-${origin}`]);
    });
  });
}

function write(value: string[], origin: string): Promise<void> {
  console.log({ value, origin });
  return new Promise((resolve) => {
    chrome.storage.local.set({ [`${STORAGE_KEY}-${origin}`]: value }, () => resolve());
  });
}


export { read, write };
