export function generateTournamentItems(
  dayKey: string,
  time: string,
  buyIn: string,
  prize: string
) {
  return { dayKey, time, buyIn, prize };
}

export function generateWeeklyRatingItems(
  position: string,
  user: string,
  prize: number | string
) {
  return { position, user, prize };
}
