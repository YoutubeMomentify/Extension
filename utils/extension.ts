//@ts-ignore
import { Storage } from "@plasmohq/storage"
import type { IOptions } from "~types";
export const getOptions = async () => {
    const storage = new Storage();
    const options = await storage.get("options") as IOptions; 
    return options as IOptions ;
}