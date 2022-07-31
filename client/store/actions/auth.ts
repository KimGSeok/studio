import axios from 'axios';
import { LOGIN_USER } from '../types/auth';

interface FormProps{
  id: string;
  password: string;
}

/* 로그인 */
export const LoginAction = async( url:string, formData: FormProps ) => {

  // Fetching
  const { data } = await axios.post(`${url}`,{
    userId: formData.id,
    userPassword: formData.password
  })

  return{
    type: LOGIN_USER,
    payload: data
  }
}