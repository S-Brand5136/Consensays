import prisma from "../../../lib/prisma";

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

        const updatedQuestion = await prisma.question.update({
          where: { id: Number(id) },
          data: { votes: { increment: 1 } },
        });

        if (!updatedQuestion) {
          throw new Error("Could not update vote!");
        }

        return res.status(200).json({
          message: "Update complete!",
          updatedQuestion,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error,
        });
      }
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end("");
  }
}
