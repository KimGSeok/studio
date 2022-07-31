import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CProps{
  accessToken: string;
  refreshToken: string;
}

export const setCookie = (token: CProps) => {

  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 180); // 3 Hours

  const options: any = {
    path: '/',
    secure: true,
    expires,
    sameSite: "none"
  }
  return cookies.set("userACT", token.accessToken, options)
}

export const getCookie = () => {
  return cookies.get("userACT");
}