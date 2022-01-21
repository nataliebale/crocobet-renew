export const replaceImage = <T extends { image: string }>(
  type: string,
  provider: string,
  game: T
): T => {
  if (typeof game?.image === 'string') {
    const imageName = game.image.substring(game.image.lastIndexOf('/') + 1);
    game.image = `https://static.crocobet.com/cms/${type}/${provider}/${imageName}`;
  }

  return game;
};
