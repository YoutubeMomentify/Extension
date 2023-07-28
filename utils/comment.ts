import type { IComment } from "~types";

export function searchTimestamp(timestampToSearch: string, comments:IComment[]): IComment | null {
    function hasTimestamp(comment: string, timestampToSearch: string): boolean {
      const timestampRegex = new RegExp(`\\b${timestampToSearch}\\b`);
      return timestampRegex.test(comment);
    }
  
    function cleanComment(comment: string): string {
      comment = comment.replace(/<a\b[^>]*>(.*?)<\/a>/g, timestampToSearch);
      comment = comment.trim();
      return comment;
    }
  
    const cleanedComments = comments
      .filter(comment => hasTimestamp(comment.textDisplay, timestampToSearch))
      .map(comment => {
        return {textDisplay: cleanComment(comment.textDisplay), authorProfileImageUrl: comment.authorProfileImageUrl, textOriginal: comment.textOriginal}
      });
  
    return cleanedComments.length > 0 ? cleanedComments[0] : null;
  }