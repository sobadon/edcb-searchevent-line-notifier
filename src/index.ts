import fetch from 'node-fetch';
import parser from 'fast-xml-parser';
import { searchApiResponse, eventInfo } from './type';
import config from './config';
import FormData from 'form-data';

const lineNotifyCharacterLimit = 1000;
const lineNotifyApiEndpoint = 'https://notify-api.line.me/api/notify';

const fetchXml = async (keyword: string) => {
	const url = `${config.edcbHost}/api/SearchEvent?andKey=${encodeURI(
		keyword
	)}&network=${config.network.toString()}`;
	return await fetch(url).then((res) => {
		if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
		return res.text();
	});
};

const parseEventMsg = (eventInfo: eventInfo) => {
	// とりあえず有料放送は除外
	if (eventInfo.freeCAFlag === 1) return;

	let msg = eventInfo.event_name;
	msg += `\n${eventInfo.startDate} ${eventInfo.startTime}`;
	msg += `\n${config.edcbHost}/EMWUI/epginfo.html?onid=${eventInfo.ONID}&tsid=${eventInfo.TSID}&sid=${eventInfo.SID}&eid=${eventInfo.eventID}`;
	return msg;
};

const post = (msg: string) => {
	const form = new FormData();
	form.append('message', msg);
	fetch(lineNotifyApiEndpoint, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${config.lineNotifyToken}`,
		},
		body: form,
	}).catch((err) => {
		console.error(err);
	});
};

const main = async () => {
	for (const keyword of config.keywords) {
		const xml = await fetchXml(keyword);
		const jsonObj: searchApiResponse = parser.parse(xml);
		if (!jsonObj.entry.items) return;
		if (!jsonObj.entry.items.eventinfo) return;
		jsonObj.entry.items.eventinfo.sort((a, b) =>
			`${a.startDate + a.startTime}` > `${b.startDate + b.startTime}` ? 1 : -1
		);
		let postMsg = `【${keyword}】\n`;
		for (const eventInfo of jsonObj.entry.items.eventinfo) {
			const msg = parseEventMsg(eventInfo);
			if (!msg) continue;
			if (postMsg.length + msg.length >= lineNotifyCharacterLimit) {
				// とりあえず順次送信させる
				post(postMsg);
				postMsg = `${msg}\n\n`;
			} else {
				postMsg += `${parseEventMsg(eventInfo)}\n\n`;
			}
		}
	}
};

main();
