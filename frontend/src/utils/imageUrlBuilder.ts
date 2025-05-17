export default function imageUrlBuilder(path: string): string {
  return `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/cab-booking%2F${path}?alt=media`;
}
