export interface IStorageService {
  getItem(key: string): any;

  setItem(key: string, value: any): void;
}

export class LocalStorageService implements IStorageService {
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
}
