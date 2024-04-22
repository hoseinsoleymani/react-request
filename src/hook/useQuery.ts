import { useEffect, useMemo, useState } from "react";
import { client } from "../lib";
import {AxiosRequestConfig} from "axios"
import { Observable, Observer } from "../utils/observer";

interface UseQueryOptions {
  url: string;
  queryKey: string;
  requestOptions?: AxiosRequestConfig
}

const queriesCache = {}

export function useQuery(options: UseQueryOptions) {
  const {queryKey, url, requestOptions} = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const Subject = useMemo(() => {
    return new Observable()
  }, [])

  
  useEffect(() => {

    const observer: Observer = {
      update() {
        setData(null)   
      }
    }

    Subject.attach(observer)

    if(queryKey in queriesCache) {
      queriesCache[queryKey].then((res) => {
        setData(res.data)
      })
    } else {
      setLoading(true)

      queriesCache[queryKey] = client.get(url, {...requestOptions}).then((res) => {
        setLoading(false)
        setData(res.data)
      }).catch((err) => {
        setLoading(false)
        setError(err)
      })
    }

    return () => {
      Subject.detach(observer)  
    }
    
  }, [queryKey, requestOptions, url])

  function refetch() {
    if(queryKey in queriesCache) {
      client.get(url, {...requestOptions}).then((res) => {
        setLoading(false)
        setData(res.data)
        Subject.notify()
      }).catch((err) => {
        setLoading(false)
        setError(err)
      })
    }
  }


  return {
    data,
    loading,
    error,
    refetch
  }
}