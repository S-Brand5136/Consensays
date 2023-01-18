// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  switch (req.method) {
    /*
      GET: send back the post that matches the ID
      URL: posts/[id]
    */
    case "GET":
      res.status(200).json({
        name: "Post Title",
        options: [
          {
            id: 0,
            question: "",
            votes: 0,
          },
          {
            id: 1,
            question: "",
            votes: 0,
          },
        ],
        colorScheme: "purple",
        settings: {
          hideVotes: false,
          anonymousVotes: false,
        },
      });
    /*
      POST: a new vote to a poll by ID
      URL: posts/[id]
    */
    case "POST":
      res.status(200).json({
        name: "Post Title",
        options: [
          {
            id: 0,
            question: "",
            votes: 0,
          },
          {
            id: 1,
            question: "",
            votes: 0,
          },
        ],
        colorScheme: "purple",
        settings: {
          hideVotes: false,
          anonymousVotes: false,
        },
      });
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end("");
  }
}
