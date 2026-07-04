import { useState } from "react";
import { ListUrls } from "./list-url";
import { UrlShortened } from "./url-shortened";

export function Url() {
    const [reload, setReload] = useState(0)

function handleUrlCreated() {
    setReload((prev) => prev + 1)
  }


    return(
        <div className="flex gap-8">
            <UrlShortened onSuccess={handleUrlCreated}/>
            <ListUrls reload={reload}/>
        </div>
    )
}