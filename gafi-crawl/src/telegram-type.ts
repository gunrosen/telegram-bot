export interface TelegramType {
  type: string,
  link: string,
  name?: string,
  country?: string
}

export interface ChannelPost {
  id: number,
  message: string,
  viewCount: number,
  forwardCount: number,
  replyCount?: number,
  reactionCount?: number,
  reactionDetails?: Reaction[],
  date: number
}

export interface Reaction {
  emoticon: string,
  count : number
}

export const CrawlSource: TelegramType[] = [
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
    name: "Kucoin_News"
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

