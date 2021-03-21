require("dotenv").config()
const { App } = require("@slack/bolt")

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
})

const reactTo = ["thumbsup", "thumbsdown"]
const pattern = new RegExp(`:(${reactTo.join("|")}):`, "g")

app.message(pattern, async ({ client, context, message }) => {
  const reaction = {
    channel: message.channel,
    timestamp: message.ts,
  }

  const promises = [...new Set(context.matches)]
    .map((match) => match.replace(/:/g, ""))
    .map((name) => client.reactions.add({ ...reaction, name }))

  await Promise.all(promises)
})

async function main() {
  await app.start(process.env.PORT || 3000)
  console.log("⚡️ Bolt app is running!")
}

main()
