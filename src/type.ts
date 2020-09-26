export type searchApiResponse = {
	entry: {
		total: number;
		index: number;
		count: number;
		items?: {
			eventinfo: eventInfo[];
		};
	};
};

export type eventInfo = {
	ONID: number;
	TSID: number;
	SID: number;
	eventID: number;
	/** YYYY/MM/DD */
	startDate: string;
	/** HH:mm:ss */
	startTime: string;
	/** 0: 日曜, ... , 6: 土曜 */
	startDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	/** second */
	duration: number;
	event_name: string;
	event_text: string;
	/** 紐づけられているジャンル分存在する */
	contentInfo: contentInfo[];
	/** SID の数に応じて？増える */
	groupInfo: groupInfo[];
	freeCAFlag: 0 | 1;
};

type contentInfo = {
	nibble1: number;
	nibble2: number;
	/** ジャンル - サブジャンル */
	component_type_name: string;
};

type groupInfo = {
	ONID: number;
	TSID: number;
	SID: number;
	eventID: number;
};

export type Config = {
	network: 1 | 2 | 3;
	keywords: string[];
	lineNotifyToken: string;
	edcbHost: string;
};
