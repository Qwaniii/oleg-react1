import { Config, RequestProps, ServicesType } from "../store/types/store";


class APIService {


  services: ServicesType
  config: Config
  defaultHeaders: Record<string, string>

  constructor(services: ServicesType, config: Config = {}) {



    this.services = services;
    this.config = config;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  /**
   * HTTP запрос
   */


  async request({ url, method = 'GET', headers = {}, body }: RequestProps): Promise<{
    data: {
      result: {
        price: number,
        items? : {},
        count?: number,
        token?: string,
        user?: {},
        error?: any
      }
    },
    status: number,
    headers: {}
  }> {
    if (!url.match(/^(http|\/\/)/)) url = this.config.baseUrl + url;
    const res = await fetch(url, {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      body
    });
    return { data: await res.json(), status: res.status, headers: res.headers };
  }

  /**
   * Установка или сброс заголовка
   */
  setHeader(name: string, value: string | null = null) {
    if (value) {
      this.defaultHeaders[name] = value;
    } else if (this.defaultHeaders[name]) {
      delete this.defaultHeaders[name];
    }
  }
}

export default APIService;
