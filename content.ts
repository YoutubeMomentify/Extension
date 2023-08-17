import { setFont } from "~utils/font";
import { config as plasmoConfig } from "~config";
import { getId } from "~utils/video";
//@ts-ignore
import type { IOptions } from "~types";
import { getOptions } from "~utils/extension";
export const config = plasmoConfig;
setFont()

async function init(){
    const options = await getOptions() ;
    console.log(options)
    if (options.ENABLED){
        window.addEventListener('yt-page-data-updated', getId);
    }
}

init() 
