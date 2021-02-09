import { axios } from "../../core/axios"
import { LoginFormProps, RegisterFormProps } from "../../pages/Signin/components/types"
import { UserState } from "../../store/ducks/user/contracts/state"
import { UsersState } from "../../store/ducks/users/contracts/state"

interface ResponseApi<T> {
  status: string,
  data: T
}

export const AuthApi = {
  async signIn(loginData: LoginFormProps): Promise<ResponseApi<UsersState>> {
    
    const { data } = await axios.post<ResponseApi<UsersState>>("/auth/login", loginData)
    return data
  },
  async getMe(): Promise<ResponseApi<UserState["data"]>> {
    const { data } = await axios.get<ResponseApi<UserState["data"]>>("/users/me")
    return data
  },
  async signUp(RegisterData: RegisterFormProps): Promise<ResponseApi<UserState>> {
    const { data } = await axios.post<ResponseApi<UserState>>("/auth/register", RegisterData)
    
    return data 
  }
}

//@ts-ignore
window.AuthApi = AuthApi