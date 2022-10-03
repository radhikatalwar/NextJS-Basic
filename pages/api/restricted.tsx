import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in." });
    return;
  }

  return res.json({
    message: "Success",
  });
}
