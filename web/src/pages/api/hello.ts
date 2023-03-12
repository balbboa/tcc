import type { NextApiResponse } from "next";

export default function index(res: NextApiResponse) {
  res.status(404).json({
    message: "API desativada",
  });
}
