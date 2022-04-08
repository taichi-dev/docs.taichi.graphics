interface NAV_IMG {
  night: string;
  light: string;
  hover?: string;
}
export const generateUrl = (img: NAV_IMG, theme?: string, index?: number, indexKey?: any) => {
    if (index === indexKey) {
        return img['hover'];
    } 
  return img[theme];
};
