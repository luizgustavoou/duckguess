export interface IStorageService {
  getItem(key: string): any;

  setItem(key: string, value: any): void;

  removeItem(key: string): void;
}

export class LocalStorageService implements IStorageService {
  getItem(key: string) {
    return localStorage.getItem(key);
  }
  setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
