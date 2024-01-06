import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// in this function the request argument seems to be required to fetch data
// despite not being used
export const GET = async ( request, { params } ) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts :(", { status: 500 });
  }
};
