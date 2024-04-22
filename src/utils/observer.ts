import { AxiosResponse } from "axios";

interface Cache {
    [key: string]: Promise<AxiosResponse>
}

export interface Subject {
    attach(observer: Observer): void;

    notify(key: string, value: Promise<AxiosResponse>): void;

    update(key: string, value: Promise<AxiosResponse>): void;
}

export class QueryCache implements Subject {
    private cache: Cache  = {};
    private observers: Observer[] = [];
  
    notify(key: string, value: Promise<AxiosResponse>) {
      for (const observer of this.observers) {
        observer.update(key, value);
      }
    }
  
    update(key: string, value: Promise<AxiosResponse>) {
      this.cache[key] = value;
      this.notify(key, value);
    }
  
    attach(observer: Observer) {
      this.observers.push(observer);
      return () => {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
          this.observers.splice(index, 1);
        }
      };
    }
  
    has(key: string) {
      return key in this.cache;
    }
  
    get(key: string) {
      return this.cache[key];
    }
  }


export interface Observer {
    update(key: string, value: Promise<AxiosResponse>): void;
}