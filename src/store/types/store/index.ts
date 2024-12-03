import * as modules from "../../exports.js";
import config from '../../../config.js'
import { StoreState } from "../../index.js";


type Modules = typeof modules;

export type KeyModules = keyof Modules

export type ModulesActions = {
    [key in KeyModules]: InstanceType<Modules[key]>
  }
  
export type ModulesState = {
  [key in KeyModules]: ReturnType<ModulesActions[key]['initState']>
}

export type Config = typeof config

export type StoreConfig = typeof config.store & { [key: string]: any}

export type APIServiceProps = {
  services: ServicesType,
  config: Config,
  defaultHeaders: Record<string, string>,
  request: ({}:RequestProps) => Promise<{
    data: {
      result: {
        price?: number,
        items? : {},
        count?: number,
        token?: string,
        user?: {},

      },
      error?: any
    },
    status: number,
    headers: {},
  }>,
  setHeader: (name: string, value: string | null) => void
}

export type RequestProps = {
  url: string,
  method?: string,
  headers?: {},
  body?: string,
}

export type ServicesType = {
  api: APIServiceProps,
  store: StoreState
}