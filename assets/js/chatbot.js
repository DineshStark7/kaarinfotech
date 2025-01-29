const OPENROUTER_API_KEY =
  "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"; // 🔥 Replace with your key

// Toggle Chatbot Visibility
function toggleChat() {
  const chatbot = document.getElementById("chatbot-modal");
  chatbot.style.display = chatbot.style.display === "flex" ? "none" : "flex";
}

// Function to Auto-Scroll Chat to Bottom
function scrollToBottom() {
  const chatBody = document.getElementById("chatbot-body");
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Function to Send Message
async function sendMessage() {
  const userInput = document.getElementById("user-message");
  const chatBody = document.getElementById("chatbot-body");

  if (userInput.value.trim() === "") return; // Prevent empty messages

  // Display User Message
  let userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userInputValue = userInput.value;
  userMessage.textContent = userInputValue;
  userInput.value = "";
  chatBody.appendChild(userMessage);

  // Auto-scroll after user message
  scrollToBottom();

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "your-website.com", // 🔥 Replace with your actual website
          "X-Title": "Your Chatbot",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: userInputValue }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `HTTP Error! Status: ${response.status} - ${await response.text()}`
      );
    }

    const data = await response.json();
    let botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.textContent = data.choices[0].message.content;
    chatBody.appendChild(botMessage);

    // Auto-scroll after bot message
    scrollToBottom();
  } catch (error) {
    console.error("API Call Error:", error);
    alert(`Error: ${error.message}`);
  }

  // **Fix 3: Clear input field after sending message**
  userInput.value = "";
}

// **Fix 1: Send Message on "Enter" Key Press**
document
  .getElementById("user-message")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default form submission
      sendMessage();
    }
  });
