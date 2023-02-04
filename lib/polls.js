import axios from "axios";

export async function getPollById(id) {
  try {
    // GET poll and destructure from axios data
    const {
      data: { poll },
    } = await axios.get("http://localhost:3000/api/polls/" + id);

    return {
      props: {
        poll,
      },
    };
  } catch (error) {
    return {
      props: {
        error,
      },
    };
  }
}
