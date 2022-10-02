import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log("session in test", session)
  if (!session) {
    res.status(401).json({ error: "Unauthorized User" });
  } else {
    res.status(200).json({ message: "Success", session });
  }
};

export default handler;
