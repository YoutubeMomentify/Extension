import axios, { type AxiosResponse } from "axios"

import type {
  IComment,
  IYouTubeComment,
  YouTubeDataAPIResponse
} from "~types"
import { checkVideoState, observeVideoState } from "~utils/video"

let matchingComments: IComment[] = []

export async function getAllComments(
  id: string,
  first: boolean,
  pageToken = "",
): Promise<void> {
  const maxResults = 100
  if (first) {
    matchingComments = []
  }
  let apiUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=${maxResults}&videoId=${id}&key=${process.env.PLASMO_PUBLIC_API_KEY}`
  if (pageToken !== "") {
    apiUrl += `&pageToken=${pageToken}`
  }
  try {
    const response: AxiosResponse<YouTubeDataAPIResponse> = await axios.get(
      apiUrl
    )
    const timestampRegex = /\b\d{1,2}:\d{2}\b/
    response.data.items.map((item: IYouTubeComment) => {
      const comment = item.snippet.topLevelComment.snippet.textDisplay
      const commentProfileImage =
        item.snippet.topLevelComment.snippet.authorProfileImageUrl
      const commentOriginal = item.snippet.topLevelComment.snippet.textOriginal
      if (timestampRegex.test(comment)) {
        matchingComments.push({
          textDisplay: comment,
          authorProfileImageUrl: commentProfileImage,
          textOriginal: commentOriginal
        })
      }
    })

    if (response.data.nextPageToken) {
      await getAllComments(
        id,
        false,
        response.data.nextPageToken,
      )
    } else {
      checkVideoState(matchingComments)
      observeVideoState(matchingComments)
    }
  } catch (error) {
    console.error("Error retrieving comments:", error)
  }
}

