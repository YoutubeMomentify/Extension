export interface YouTubeDataAPIResponse {
  pageInfo: {
    totalResults: number;
  };
  items: {
    snippet: {
      topLevelComment: {
        snippet: {
          textDisplay: string;
        };
      };
    };
  }[];
  nextPageToken?: string;
}
export interface IPlayer extends HTMLElement {
  paused: boolean | null,
  ended: boolean | null,
  currentTime: number | null
}
export interface IYouTubeComment {
  snippet: {
    topLevelComment: {
      snippet: IComment
    }
  }
}

export interface IComment {
  textDisplay:string,
  authorProfileImageUrl: string;
  textOriginal?: string | null
}


export type checkStateType = () => void ;
export type observeType = () => void ;
export type mainType = (num:Number) => void 