export type ImageItem = {
  _id: string
  title: string
  imageUrl: string
  order: number
}

export type ImageReorderPayload = {
  id: string
  order: number
}

export type ImageUpdatePayload = {
  title?: string
  image?: File
}
