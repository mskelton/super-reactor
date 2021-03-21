require("dotenv").config()
const { App } = require("@slack/bolt")
const { sample } = require("./utils")
const data = require("./data.json")

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
})

const pattern = new RegExp(`:(${data.triggers.join("|")}):`)

app.message(pattern, async ({ client, message }) => {
  const reaction = {
    channel: message.channel,
    timestamp: message.ts,
  }
  const promises = sample(data.reactions, 23)
    .map((match) => match.replace(/:/g, ""))
    .map((name) => client.reactions.add({ ...reaction, name }))

  await Promise.all(promises)
})

async function main() {
  await app.start(process.env.PORT || 3000)
  console.log("⚡️ Bolt app is running!")
}

main()
