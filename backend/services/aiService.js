const { OpenRouter } = require("@openrouter/sdk");

function openRouterServerURL() {
  const u = (process.env.OPENROUTER_URL || "").trim();
  if (!u) return undefined;
  return u.replace(/\/chat\/completions\/?$/i, "").replace(/\/$/, "");
}

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
  httpReferer: process.env.SITE_URL,
  appTitle: process.env.SITE_NAME,
  ...(openRouterServerURL() ? { serverURL: openRouterServerURL() } : {}),
});

const callAI = async (messages) => {
  try {
    const completion = await openRouter.chat.send({
      chatRequest: {   // ✅ FIX HERE
        model: "openai/gpt-4o-mini", // also fix model
        messages: messages,
      },
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("AI ERROR:", err);
    throw new Error("AI request failed");
  }
};

module.exports = { callAI };