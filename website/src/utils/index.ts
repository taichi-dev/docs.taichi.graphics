interface NAV_IMG {
  night: string;
  light: string;
}
export const generateUrl = (img: NAV_IMG, theme?: string) => {
  return img[theme];
};
