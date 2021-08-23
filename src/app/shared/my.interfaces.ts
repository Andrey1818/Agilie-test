export interface User {
  email: string
  password: string
  returnSecureToken?: boolean
  expiresIn?: boolean
}

export interface Search {
  "query": string
}

export type information = {
  country: {
    en: string
    de: string
  }
  city?: string
  administrative: string
  district?: string
  objectID: string
  population?: number
  postcode: string[]
  _geoloc: {
    lat: number
    lng: number
  }
  admin_level : number
}

export interface Locate {
  hits?: Array<information>
}
