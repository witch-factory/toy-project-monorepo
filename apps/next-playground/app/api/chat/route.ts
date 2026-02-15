import {
  convertToModelMessages,
  stepCountIs,
  streamText,
  tool,
  UIMessage,
} from "ai";
import z from "zod";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = await convertToModelMessages(messages);

  const result = streamText({
    model: "openai/gpt-4o-mini",
    messages: modelMessages,
    stopWhen: stepCountIs(5),
    tools: {
      weather: tool({
        description: "Get the weather in a location (celcius)",
        inputSchema: z.object({
          location: z.string().describe("The location to get the weather for"),
        }),
        execute: async ({ location }) => {
          // Dummy implementation - replace with real API call
          const temparature = 25; // Dummy temperature
          return `The weather in ${location} is ${temparature}°C.`;
        },
      }),
      convertFahrenheitToCelsius: tool({
        description: "Convert a temperature from Fahrenheit to Celsius",
        inputSchema: z.object({
          temperature: z.number().describe("The temperature in Fahrenheit"),
        }),
        execute: async ({ temperature }) => {
          const celsius = Math.round((temperature - 32) * (5 / 9));
          return {
            celsius,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
