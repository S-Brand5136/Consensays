import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  /*
    POST: a new poll to the db
    BODY: {
      title:          required | string
      options:        required | array    [ question ]
      colorScheme:    optional | string,  defaults to blue
      hideVotes:      optional | boolean, defaults to false
      anonymousVotes: optional | boolean, defaults to false
      backgroundURL:  optional | string,  defaults to empty
    }
    URL: posts/[id]
  */
  if (req.method === "POST") {
    try {
      const {
        title,
        options,
        colorScheme = "blue",
        hideVotes = false,
        anonymousVotes = false,
        background = "",
      } = req.body;

      // create poll
      const result = await prisma.poll.create({
        data: {
          title,
          colorScheme,
          hideVotes,
          anonymousVotes,
          backgroundURL: background,
        },
      });

      if (!result) {
        throw new Error("Could not create poll");
      }

      // create questions for poll
      const questions = await Promise.all(
        options.map((option) => {
          return prisma.question.create({
            data: {
              question: option.question,
              votes: 0,
              pollId: result.id,
            },
          });
        })
      );

      // placeholder return value from inserting post into DB
      res.status(200).json({
        poll: result,
        questions,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
}
