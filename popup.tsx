import { useEffect, useState } from "react"
// @ts-ignore
import { Storage } from "@plasmohq/storage"
import "./assets/main.css"
import type { IOptions, ITheme } from "~types";


function IndexPopup() {
  async function storeOptions(){
    const options:IOptions = {
      ENABLED: enabled,
      SHOW_ONE_COMMENT: oneCommentIsEnabled,
      THEME: theme
    }
    const storage = new Storage();
    await storage.set("options", options)
  }
  const [enabled, setEnabled] = useState<boolean>(); 
  const [oneCommentIsEnabled, setOneCommentIsEnabled] = useState<boolean>();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setExtensionOptions();
  }, []) 

  const handleEnabledChange = () => {
    setEnabled(!enabled) 
    storeOptions()
  }
  const handleOneCommentToggle = () => {
    setOneCommentIsEnabled(!oneCommentIsEnabled);
    storeOptions()
  }
  const handleThemeChange = (theme: "light" | "dark") => {
    setTheme(theme)
    storeOptions()
  }

  const getCommentTheme = ():ITheme => {
    if(theme === "dark") {
      return {
        bg:"[#6e646499]",
        textColor: "white",
        borderColor: "white",
      }
    } else {
      return {
        bg:"white",
        textColor: "[#303030]",
        borderColor:"slate-800",
      }
    }
  }

  const setExtensionOptions = async () => {
    const storage = new Storage()
    const options = await storage.get("options") as IOptions;
    setEnabled(options.ENABLED)
    setTheme(options.THEME)
    setOneCommentIsEnabled(options.SHOW_ONE_COMMENT)
  }

  return (
    <div className="w-72 p-6 bg-gray-800">
      <p className="text-white font-semibold my-3">
        Enable or Disable Extension: 
      </p>
      <label
        className="relative inline-flex items-center mb-4 cursor-pointer"
        onClick={handleEnabledChange}
      >


        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={enabled}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
      </label>
      <div className={`w-full h-[44px] bg-${getCommentTheme().bg} gap-3 rounded-md flex justify-start items-center px-3 transition-all ease-in duration-300`}>
        <img
          src="https://images.pexels.com/photos/3211476/pexels-photo-3211476.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className={`w-[32px] h-[32px] rounded-full border-2 border-${getCommentTheme().borderColor}`}
        />
        <h5 className={`text-${getCommentTheme().textColor} text-xs font-semibold overflow-y-hidden leading-[143.738%] tracking-[0.12px] whitespace-nowrap overflow-hidden truncate`}>
          Hello World
        </h5>
      </div>
      <div className="mt-2">
        <h2 className="text-white font-semibold">Theme:</h2>
        <div className="flex justify-start gap-2">
          <div className="w-[34px] h-[34px] bg-[#6e646499] rounded-full cursor-pointer border-2 mt-3" onClick={() => handleThemeChange("dark")}></div>
          <div className="w-[34px] h-[34px] bg-white text-[#6e646499] rounded-full cursor-pointer border-2 border-[#6e646499] mt-3" onClick={() => handleThemeChange("light")} ></div>
        </div>
      </div>
      <div className="mt-2">
        <h2 className="text-white font-semibold">
          Show only one comment per moment:
        </h2>
        <label
          className="relative inline-flex items-center mt-4 cursor-pointer"
          onClick={handleOneCommentToggle}
          
        >
          <input
            type="checkbox"
            className="sr-only peer"
            defaultChecked={oneCommentIsEnabled}
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
        </label>
      </div>
    </div>
  )
}

export default IndexPopup
