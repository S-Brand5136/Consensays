import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    /*
        GET: Search polls by title
        URL: polls/search/[serachTerm]
    */
    case "GET":
      try {
        const searchTerm = req.query.q;

        const result = await prisma.poll.findMany({
          where: {
            title: {
              startsWith: searchTerm,
            },
          },
          select: {
            title: true,
            startDate: true,
            endDate: true,
            id: true,
          },
        });

        return res.status(200).json({
          polls: result,
        });
      } catch (error) {
        return res.status(404).json({
          error,
        });
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end("");
  }
}
