import bcrypt from "bcryptjs"

export const hashPassword = async(plainPwd: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10)

  return bcrypt.hash(plainPwd, salt)
}

export const comparePassword = async(plainPwd: string, hash) => {
  return bcrypt.compare(plainPwd, hash)
}
