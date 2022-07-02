const ellipseMiddleText = (text: string, maxLength: number) =>
  text.length > maxLength
    ? `${text.slice(0, maxLength / 2)}...${text.slice(-maxLength / 2)}`
    : text;

export default ellipseMiddleText;
