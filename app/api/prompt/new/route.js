import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();

    try {
        // connectToDB is needed every connection bc it is a lambda function
        // meaning it will die when it does its job
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new Prompt.", { status: 500 });
    }
}

