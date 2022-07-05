import type { NextApiRequest, NextApiResponse } from "next";
import { search } from "../../../utils/search";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.q;
  if (typeof query === "string") {
    res.status(200).json(search(query));
  } else {
    return res.status(200).json([]);
  }
};

export default handler;
