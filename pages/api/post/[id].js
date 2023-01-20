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
          where: { id: id },
          include: {
            questions: true,
          },
        });

        if (!result) {
          throw new Error("Could not find that poll!");
        }

        res.status(200).json({
          result,
        });
      } catch (error) {
        return res.status(404).json({
          error,
        });
      }

    /*
      POST: a new vote to a poll by ID
      BODY: {
        questionID: required | string <question id>
      }
      URL: posts/[id]
    */
    case "PUT":
      try {
        const { questionID } = req.body;

        const updatedQuestion = await prisma.question.update({
          where: { id: questionID },
          data: { votes: { increment: 1 } },
        });

        if (!updatedQuestion) {
          throw new Error("Could not update vote!");
        }

        res.status(200).json({
          message: "Update complete!",
          updatedQuestion,
        });
      } catch (error) {
        res.status(500).json({
          error,
        });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end("");
  }
}
