import Settings from "@/model/Settings.model";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import connectDb from "@/lib/db";


export async function POST(req:NextRequest){
    try {
        const {message, ownerId} = await req.json()
            if(!message || !ownerId){
                return NextResponse.json(
                    {message:"message and owner id are required"},
                    {status:400}
                )
            }

            await connectDb();

            const setting = await Settings.findOne({ownerId})
            if(!setting){
                return NextResponse.json(
                    {message:"chatbot is not configured yet"},
                    {status:400}
                )
            }
            const KNOWLEDGE = `
            business name- ${setting.businessName || "not provided"}
            support email- ${setting.supportEmail || "not provided"}
            knowledge- ${setting.knowledge || "not provided"}
            `
            const prompt = `
You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarise or interpret the information if needed.
DO NOT invent new policies, prices or promises.

If the customer's question is completely unrelated to the information,
or cannot be reasonably answered from it, reply exactly with:
"Please contact support."

------------------
BUSINESS INFORMATION
------------------
${KNOWLEDGE}

------------------
CUSTOMER QUESTION
------------------
${message}

------------------
ANSWER
------------------
            `;


        const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        const res = NextResponse.json(response.text)

        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.headers.set("Access-Control-Allow-Headers", "Content-Type");

        return res;
    } catch (error) {

        const res = NextResponse.json(
            { message: `chat error ${error}` },
            { status: 500 }
        )

        res.headers.set("Access-Control-Allow-Origin", "*");
        res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.headers.set("Access-Control-Allow-Headers", "Content-Type");

        return res;
    }
}

export const OPTIONS = async () => {
    return NextResponse.json(null, {
        status:201,
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    })
}
