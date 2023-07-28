import { setFont } from "~utils/font";
import { config as plasmoConfig } from "~config";
import { getId } from "~utils/video";
export const config = plasmoConfig;
setFont()
window.addEventListener('yt-page-data-updated', getId);