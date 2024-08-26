export interface Country {
  id: string
  name: string
  description: string
}
export interface MessageState {
  message: string
}
export interface CountryState {
  country: Country | null
}
