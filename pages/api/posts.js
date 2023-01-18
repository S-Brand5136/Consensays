export default function handler(req, res) {
  if (req.method === "POST") {
    // placeholder return value from inserting post into DB
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
          vote: 0,
        },
      ],
      colorScheme: "purple",
      settings: {
        hideVotes: false,
        anonymousVotes: false,
      },
      slug: "post-xyz",
    });
  }
}
