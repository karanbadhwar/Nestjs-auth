import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface IToken {
  id: string;
  email: string;
  username: string;
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    console.log("encoded Token");
    const encodedToken = request.cookies.get("token")?.value || "";
    console.log("decoded Token");

    const decodedToken: any = jwt.verify(
      encodedToken,
      process.env.TOKEN_SECRET!
    );
    console.log(decodedToken);

    console.log(" Token");
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
