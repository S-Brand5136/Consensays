import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    /*
        GET: All polls that have been m ade
        URL: polls/
        */
    case "GET":
      try {
        const result = await prisma.poll.findMany({
          include: { questions: true },
        });

        if (!result) {
          throw new Error(
            "We are having difficulties completing that request!"
          );
        }

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
