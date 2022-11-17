export interface TelegramInput {
  type: string,
  link: string,
  name?: string,
  country?: string
}

export const CrawlSource: TelegramInput[] = [
  {
    type: "channel",
    link: "https://t.me/GameFi_OfficialANN",
    country: "global",
    name: "GameFi.org Announcement Channel"
  },
  {
    type: "channel",
    link: "https://t.me/Kucoin_News",
    country: "global",
    name: "GameFi.org Announcement Channel"
  },
  {
    type: "channel",
    link: "https://t.me/Coin98Insights",
    country: "global",
    name: "Coin98 Insights"
  },
  {
    type: "group",
    link: "https://t.me/GameFi_Official",
    country: "global",
    name: "KuCoin News"
  },
  {
    type: "group",
    link: "  https://t.me/GameFiVN",
    country: "vietnam",
    name: "GameFi.org Việt Nam 🇻🇳"
  },
  {
    type: "group",
    link: "https://t.me/befitter_chat",
    country: "global",
    name: "beFITTER Official Group"
  },
]

