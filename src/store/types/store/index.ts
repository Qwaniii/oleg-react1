import * as modules from "../../exports.js";
import config from '../../../config.js'


type Modules = typeof modules;

type KeyModules = keyof Modules

export type ModulesActions = {
    [key in KeyModules]: InstanceType<Modules[key]>
  }
  
export type ModulesState = {
  [key in KeyModules]: ReturnType<ModulesActions['initState']>
}

export type Config = typeof config

export type StoreConfig = typeof config.store & { [key: string]: any}

export type Services = typeof 