import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({message: "Home API" });
};

export default handler;

//API CODE IS NOT BUNDLED IN FRONT END CODE