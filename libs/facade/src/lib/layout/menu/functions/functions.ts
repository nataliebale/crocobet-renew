export function generateMenuItems(
  langKey: string,
  imgUrl: string,
  route: string,
  isNew = false
) {
  return { langKey, imgUrl, isNew, route };
}
