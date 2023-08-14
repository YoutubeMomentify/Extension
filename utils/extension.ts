//@ts-ignore
import { Storage } from "@plasmohq/storage"
export const getOptions = async () => {
    const storage = new Storage();
    const options = await storage.get("options") 
    return options ;
}