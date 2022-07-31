import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface CProps{
  accessToken: string;
  refreshToken: string;
}

export const setCookie = (token: CProps) => {

  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 180); // 3 Hours

  console.log(expires);

  const options: any = {
    path: '/',
    secure: true,
    expires,
    sameSite: "none"
  }

  console.log(cookies);

  return cookies.set("userACT", token.accessToken, options)
}

export const getCookie = () => {
  return cookies.get("userACT");
}