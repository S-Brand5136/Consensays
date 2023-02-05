import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    /*
    GET: send back the post that matches the ID
    QUERY: {
      id: required | string <poll id>
    }
    URL: posts/[id]
    */
    case "GET":
      try {
        const { id } = req.query;

        const result = await prisma.poll.findUnique({
          where: {
            id: Number(id),
          },
          include: {
            questions: true,
          },
        });

        if (!result) {
          throw new Error("Could not find that poll!");
        }

        return res.status(200).json({
          poll: result,
        });
      } catch (error) {
        return res.status(404).json({
          error,
        });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end("");
  }
}
