# edcb-searchevent-line-notifier

EDCB の Web API を利用して、指定したキーワードを含む番組を LINE Notify を介して通知します。

```
$ git clone https://github.com/sobadon/edcb-searchevent-line-notifier.git
$ cd edcb-searchevent-line-notifier
$ cp config.example.json config.json
// config.json を編集
$ sudo docker-compose up -d
```

## 環境
- [EMWUI/EDCB_Material_WebUI](https://github.com/EMWUI/EDCB_Material_WebUI) が設置されアクセス可能である

## config.json
`config.example.json` を参照

- `network`: 検索対象の network
- `keywords`: 検索対象のキーワード
	- `andKey` を利用して検索します
- `lineNotifyToken`: LINE Notify の Token
- `edcbHost`: EDCB WebUI の URL
  - ex: `http://192.168.1.2:5510`


## 通知メッセージ
```
【<Keyword>】
<番組名([字]などを含む)>
YYYY/MM/DD HH:mm:ss
http://192.168.1.2:5510/EMWUI/epginfo.html?onid=<onid>&tsid=<tsid>&sid=<sid>&eid=<eid>
```
