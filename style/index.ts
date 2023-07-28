export const CommentsContainerStyles = `
    position: absolute;
    top: 50px;
    left: 50px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 99999;
`
export const commentAvatarStyles = `
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 50%;
`;

export const commentDivStyles = `
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
  background-color: rgba(217, 217, 217, .6);
  border-radius: 10px;
  opacity: 0;
  transform: translateX(-100%);
  transition: opacity 0.5s, transform 0.5s;
`;

export const commentStyles = `
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