import bcrypt from 'bcrypt';

export const hash = async(password: string) =>{
  const salt = await bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);

  return { salt, hashPassword }
}

export const cryptCompareSync = async(password: string, salt: string) =>{

  const hashPassword = bcrypt.hashSync(password, salt);
  return { hashPassword };
}