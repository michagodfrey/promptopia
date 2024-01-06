import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

// the request argument doesn't seem to be needed 
// but was included in the tutorial
export const GET = async (request) => {
    try {
      await connectToDB();
      const prompts = await Prompt.find({}).populate("creator");
      return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
      return new Response("Failed to fetch prompts :(", { status: 500 });
    }
}