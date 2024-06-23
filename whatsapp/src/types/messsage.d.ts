export type Root = {
  id: string
  timestamp: string
  type: string
  subscriptionId: string
  channel: string
  direction: string
  message: Message
}

export type Message = {
  id: string
  from: string
  to: string
  direction: string
  channel: string
  visitor: Visitor
  contents: Content[]
}

export type Visitor = {
  name: string
  firstName: string
  lastName: string
}

export type Content = {
  type: string
  text: string
}
