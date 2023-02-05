import prisma from "../../lib/prisma";
import { compareDates } from "../../lib/compareDates";

export default async function handler(req, res) {
  /*
    POST: a new poll to the db
    BODY: {
      title:          required | string
      options:        required | array    [ question ]
      colorScheme:    optional | string,  defaults to blue
      hideVotes:      optional | boolean, defaults to false
      startDate:      required | UTC date
      endDate:      required | UTC date
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
        startDate,
        endDate,
        background = "",
      } = req.body;

      const startDay = new Date(startDate);
      const endDay = new Date(endDate);

      if (startDay > new Date()) {
        throw new Error("Start date is invalid");
      }

      if (endDay < startDay) {
        throw new Error("end date is invalid");
      }

      // create poll
      const result = await prisma.poll.create({
        data: {
          title,
          colorScheme,
          hideVotes,
          startDate: startDay.toISOString().toString(),
          endDate: endDay.toISOString().toString(),
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
