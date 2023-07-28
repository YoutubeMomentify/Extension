import type { checkStateType, IComment, IPlayer, mainType } from "~types"
import { searchTimestamp } from "./comment"
import { getAllComments} from "~service/comments"
import { commentAvatarStyles, commentDivStyles, CommentsContainerStyles, commentStyles } from "~style";

let isPaused = false
const player: HTMLDivElement | null = document.getElementById("movie_player") as HTMLDivElement;
const commentsContainer: HTMLDivElement = document.createElement("div")
commentsContainer.style.cssText = CommentsContainerStyles

if (player) {
  player.appendChild(commentsContainer);
}

let videoInterval: NodeJS.Timer | "started" = "started"

function main(currentTime: number, comments: IComment[]) {
  const timeStamps = document.getElementsByClassName("ytp-time-current")
  if (timeStamps) {
    const timeInSeconds = Math.floor(currentTime)
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = timeInSeconds % 60
    const currentTimeFormatted = `${minutes}:${String(seconds).padStart(
      2,
      "0"
    )}`

    const commentWithoutTimestamp = searchTimestamp(currentTimeFormatted, comments)
    if (commentWithoutTimestamp) {
      const commentDiv = document.createElement("div")
      const commentAvatar = document.createElement("img")
      const comment = document.createElement("h2")
      commentAvatar.style.cssText = commentAvatarStyles
      commentDiv.style.cssText = commentDivStyles
      comment.style.cssText = commentStyles
      commentAvatar.src = commentWithoutTimestamp.authorProfileImageUrl
      comment.innerHTML = commentWithoutTimestamp.textOriginal
      commentDiv.appendChild(commentAvatar)
      commentDiv.appendChild(comment)
      commentsContainer.appendChild(commentDiv)
      setTimeout(() => {
        commentDiv.style.opacity = "1"
        commentDiv.style.transform = "translateX(0)"
      }, 10)
      setTimeout(() => {
        if (!isPaused) {
          commentDiv.style.opacity = "0"
          setTimeout(() => {
            commentsContainer.removeChild(commentDiv)
          }, 1000)
        }
      }, 2000)
    }
  }
}

export function checkVideoState(comments: IComment[]): MutationCallback {
    return function (mutations: MutationRecord[], observer: MutationObserver) {
      const videoPlayer: IPlayer = document.querySelector(".html5-main-video");
      if (videoPlayer) {
        if (!videoPlayer.paused && !videoPlayer.ended) {
          if (videoInterval === "started") {
            if (isPaused) {
              isPaused = false;
              while (commentsContainer.firstChild) {
                commentsContainer.removeChild(commentsContainer.firstChild);
              }
            }
            videoInterval = null;
            videoInterval = setInterval(function () {
              main(videoPlayer.currentTime, comments);
            }, 1000);
          }
        } else {
          isPaused = true;
          clearInterval(videoInterval);
          videoInterval = "started";
        }
      }
    };
  }

export function observeVideoState(comments: IComment[]) {
  const videoPlayer = document.querySelector(".html5-main-video")
  if (videoPlayer) {
    const observer = new MutationObserver(checkVideoState(comments))
    observer.observe(videoPlayer, { attributes: true })
  }
}

export function getId() {
    while (commentsContainer.firstChild) {
      commentsContainer.removeChild(commentsContainer.firstChild);
    }
    const url = window.location.href;
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const urlID = urlParams.get('v');
    if (urlID && urlID.length > 0) {
      getAllComments(urlID);
    }
}
