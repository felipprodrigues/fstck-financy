import { ExpressContextFunctionArgument } from "@as-integrations/express5";
import { JwtPayload, verifyJwt } from "../../utils/jwt";

export type GraphqlContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export const buildAuthContext = async ({
  req,
  res
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization
  let user: string | undefined
  let token: string | undefined

  console.log("[authContext] authHeader:", authHeader)
  if(authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length)
    try {
      const payload = verifyJwt(token) as JwtPayload
      user = payload.id
      console.log("[authContext] user id from token:", user)
    } catch(error) {
      console.error("[authContext] Error verifying token:", error)
    }
  }

  return {
    user,
    token,
    res,
    req
  }
}
