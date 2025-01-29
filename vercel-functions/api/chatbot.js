export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // Store API key in environment variables

  const { message } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: message }],
        }),
      }
    );

    const data = await response.json();
    return res.status(200).json({ response: data.choices[0].message.content });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch response from OpenRouter" });
  }
}
