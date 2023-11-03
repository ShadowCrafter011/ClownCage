import { Plugin } from "./plugin";

export class ChangeSearchEnginePlugin extends Plugin {
    regexes: { [key: string]: RegExp };

    constructor() {
        super(1009); // Replace number with action ID. List of IDs found here: https://salbot.ch/admin/idlist

        this.regexes = {
            "google.com/search?q=": /q=([^&]*)&/,
            "search.yahoo.com/search?p=": /p=([^&]*)&/,
            "bing.com/search?q=": /q=([^&]*)&/,
            "duckduckgo.com": /q=([^&]*)&/,
            "search.brave.com/search?q=": /q=([^&]*)&/,
            "baidu.com": /wd=([^&]*)&/,
            "ecosia.org": /q=(.*)/,
            "swisscows.com": /query=([^&]*)&/
        }
    }

    register(data: any): boolean {
        for (let regex_data of Object.entries(this.regexes)) {
            if (!location.href.includes(regex_data[0])) continue;
            let res = location.href.match(regex_data[1]);
            if (res) {
                location.href = this.new_search_url(data.new_engine, res[1]);
            }
        }
        return true;
    }

    new_search_url(engine: string, query: string): string {
        const urls: {[key: string]: string} = {
            "Google": `https://google.com/search?q=${query}`,
            "Yahoo": `https://search.yahoo.com/search?p=${query}`,
            "Bing": `https://bing.com/search?q=${query}`,
            "DuckDuckGo": `https://duckduckgo.com/?q=${query}`,
            "Brave": `https://search.brave.com/search?q=${query}`,
            "Baidu": `https://www.baidu.com/s?wd=${query}`,
            "Ecosia": `https://ecosia.org/search?q=${query}`,
            "Swisscows": `https://swisscows.com/de/web?query=${query}`
        }
        return urls[engine];
    }
}