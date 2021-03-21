require("dotenv").config()
const { App } = require("@slack/bolt")

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
})

const reactTo = ["thumbsup", "thumbsdown"]
const pattern = new RegExp(`:(${reactTo.join("|")}):`)

app.message(pattern, async ({ client, message }) => {
  console.log(message)

  await client.reactions.add({
    channel: message.channel,
    name: "thumbsup",
    timestamp: message.ts,
  })
})

async function main() {
  await app.start(process.env.PORT || 3000)
  console.log("⚡️ Bolt app is running!")
}

main()
