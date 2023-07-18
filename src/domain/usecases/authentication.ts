export interface AuthenticationModel {
  email: string
  password: string
}

export interface Authentication {
  auth: (atuthentication: AuthenticationModel) => Promise<string>
}
