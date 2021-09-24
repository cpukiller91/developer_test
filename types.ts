export type Activity = {
  activity: string,
  type: string | null, // поправил tipe на type
  participants: number,
  price: number,
  link: string,
  key: string,
  accessibility: number
}