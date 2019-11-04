export default function parseNow(now) {
  const date = new Date(now)
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  }
}
