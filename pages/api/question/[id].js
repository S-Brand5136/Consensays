import prisma from "../../../lib/prisma";
import { compareDates } from "../../../lib/compareDates";

export default async function handler(req, res) {
  switch (req.method) {
    /*
                        PUT: a new vote to a poll by ID
                        BODY: {
                          id: required | string <question id>
                        }
                        URL: posts/[id]
                      */
    case "PUT":
      try {
        const { id } = req.query;

        const question = await prisma.question.findUnique({
          where: {
            id: Number(id),
          },
          include: {
            poll: true,
          },
        });

        if (!question) {
          throw new Error("Could not cast vote!");
        }

        const hasPollEnded = compareDates(question.poll?.endDate);

        if (!hasPollEnded) {
          const updatedQuestion = await prisma.question.update({
            where: { id: question.id },
            data: { votes: { increment: 1 } },
          });

          return res.status(200).json({
            message: "Vote Cast!",
            updatedQuestion: {
              id: updatedQuestion.id,
              question: updatedQuestion.question,
              votes: updatedQuestion.votes,
            },
          });
        }

        return res.status(409).json({
          message: "This poll is closed for voting!",
        });
      } catch (error) {
        return res.status(500).json({
          error,
        });
      }
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end("");
  }
}
