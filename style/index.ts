import { Storage } from "@plasmohq/storage";
import type { IOptions } from "~types";
export const CommentsContainerStyles = `
  position: absolute;
  top: 50px;
  left: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 99999;
`
const commentAvatarStyles = `
  width: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  border: solid 2px white;
`;

const commentDivStyles = `
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding: 2px 10px;
  align-items: center;
  color: white;
  min-width: 170px;
  max-width: 320px;
  min-height: 44px;
  max-height: 88px;
  flex-shrink: 0;
  background-color: #6e646499;
  border-radius: 10px;
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.5s;
`;

const commentStyles = `
  color: #FFF;
  font-variant-numeric: stacked-fractions;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  overflow-y: hidden;
  font-weight: 600;
  line-height: 143.738%;
  letter-spacing: 0.12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;


const commentStylesLight = `
  color: #303030;
  font-variant-numeric: stacked-fractions;
  font-family: Poppins;
  font-size: 12px;
  font-style: normal;
  overflow-y: hidden;
  font-weight: 600;
  line-height: 143.738%;
  letter-spacing: 0.12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const commentDivStylesLight = `
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  padding: 2px 10px;
  align-items: center;
  color: white;
  min-width: 170px;
  max-width: 320px;
  min-height: 44px;
  max-height: 88px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 10px;
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.5s;
`;

const commentAvatarStylesLight = `
  width: 32px;
  flex-shrink: 0;
  border-radius: 50%;
  border: solid 2px #1e293b;
`;


export const getStyles = async () => {
  const storage = new Storage();
  const options = await storage.get("options") as IOptions;
  const THEME = options.THEME
  if(THEME === "dark"){
    return {
      comment: commentDivStyles,
      commentText: commentStyles,
      avatar: commentAvatarStyles
    }
  } else {
    return {
      comment: commentDivStylesLight,
      commentText: commentStylesLight,
      avatar: commentAvatarStylesLight
    }
  }
}