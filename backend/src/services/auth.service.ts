import { User } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input";
import { comparePassword, hashPassword } from "../utils/hashPassword";
import { signJwt } from "../utils/jwt";

export class AuthService {
  async login(data: LoginInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    })

    if(!existingUser) throw new Error("User not registered")

    const compare = await comparePassword(data.password, existingUser.password)
    if(!compare) throw new Error("Invalid password")

    return this.generateTokens(existingUser)
  }

  async register(data: RegisterInput) {
    const existingUser = await prismaClient.user.findUnique({
      where: {
        email: data.email
      }
    })

    if(existingUser) throw new Error("Email already registered")

    const { email, password, name } = data

    if(!email || !password || !name) throw new Error ("Cannot submit empty values")

    const hash = await hashPassword(password)

    const newUser = await prismaClient.user.create({
      data: {
        email,
        name,
        password: hash
      }
    })

    return this.generateTokens(newUser)
  }

  generateTokens(user: User) {
    const token = signJwt({
      id: user.id,
      email: user.email
    }, "1d")

    const refreshToken = signJwt({
      id: user.id,
      email: user.email
    }, "1d")

    return {
      token,
      refreshToken,
      user
    }
  }
}
