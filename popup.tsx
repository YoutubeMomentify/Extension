import { useEffect, useState } from "react"
// @ts-ignore
import { Storage } from "@plasmohq/storage"
import "./assets/main.css"
import type { IOptions } from "~types";


function IndexPopup() {
  async function storeOptions(options:IOptions){
    const storage = new Storage();
    await storage.set("options", options)
  }
  const [enabled, setEnabled] = useState<boolean>(true); 
  const [oneCommentIsEnabled, setOneCommentIsEnabled] = useState<boolean>(true);
  const [isExtensionEnabled, setIsExtensionEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    setExtensionOptions();
  }, []) 
  useEffect(() => {
    const options:IOptions = {
      ENABLED: enabled,
      SHOW_ONE_COMMENT: oneCommentIsEnabled,
      THEME: theme
    }
    storeOptions(options)
  }, [enabled, oneCommentIsEnabled, isExtensionEnabled, theme])

  const handleCheckboxClick = () => {
    setEnabled(!enabled) 
  }

  const handleOneCommentToggle = () => {
    setOneCommentIsEnabled(!oneCommentIsEnabled);
  }

  const setExtensionOptions = async () => {
    const storage = new Storage()
    const options = await storage.get("options");
    setEnabled(options.ENABLED)
    setTheme(options.THEME)
    setOneCommentIsEnabled(options.SHOW_ONE_COMMENT)
  }

  return (
    <div className="w-72 p-6 bg-gray-800">
      <label
        className="relative inline-flex items-center mb-4 cursor-pointer"
        onClick={handleCheckboxClick} // Attach the click handler
      >
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={enabled}
        />
        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
        <span className="ml-3 text-sm font-medium text-gray-300">
          {enabled ? "Enabled" : "Disabled"}{" "}
          {/* Display text based on checkbox state */}
        </span>
      </label>
      <div className="w-full h-[44px] bg-[#6e646499] gap-3 rounded-md flex justify-start items-center px-3">
        <img
          src="https://images.pexels.com/photos/3211476/pexels-photo-3211476.jpeg?auto=compress&cs=tinysrgb&w=1600"
          className="w-[32px] h-[32px] rounded-full border-2"
        />
        <h5 className="text-white text-xs font-semibold overflow-y-hidden leading-[143.738%] tracking-[0.12px] whitespace-nowrap overflow-hidden truncate">
          Hello World
        </h5>
      </div>
      <div className="mt-2">
        <h2 className="text-white font-semibold">Theme:</h2>
        <div className="flex justify-start gap-2">
          <div className="w-[34px] h-[34px] bg-[#6e646499] rounded-full cursor-pointer border-2 mt-3" onClick={() => setTheme("dark")}></div>
          <div className="w-[34px] h-[34px] bg-white text-[#6e646499] rounded-full cursor-pointer border-2 border-[#6e646499] mt-3" onClick={() => setTheme("light")} ></div>
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
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-300">
            {oneCommentIsEnabled ? "Enabled" : "Disabled"}{" "}
          </span>
        </label>
      </div>
    </div>
  )
}

export default IndexPopup
