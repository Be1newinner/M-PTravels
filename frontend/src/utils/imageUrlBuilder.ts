export default function imageUrlBuilder(path: string): string {
  const fullURL = `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/cab-booking%2F${path}?alt=media`;
  // console.log({ fullURL });
  return fullURL;
}
