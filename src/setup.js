function CreateModelChoices() {
	let choices = Object.values(Models)
	// Sort alphabetical
	choices.sort(function (a, b) {
		let x = a.label.toLowerCase()
		let y = b.label.toLowerCase()
		if (x < y) {
			return -1
		}
		if (x > y) {
			return 1
		}
		return 0
	})

	return choices
}

export const Models = {
	250: {
		id: 250,
		label: 'Video Devices PIX 250i',
		type: 'video',
		ports: ['TC', 'SYNC', 'LINE', 'AES', 'SDI', 'HDMI'],
	},
	260: {
		id: 260,
		label: 'Video Devices PIX 260i',
		type: 'video',
		ports: ['TC', 'SYNC', 'LINE', 'AES', 'DANTE', 'SDI', 'HDMI'],
	},
	270: {
		id: 270,
		label: 'Video Devices PIX 270i',
		type: 'video',
		ports: ['TC', 'SYNC', 'LINE', 'AES', 'DANTE', 'MADI', 'SDI', 'HDMI'],
	},
	970: {
		id: 970,
		label: 'Sound Devices 970',
		type: 'audio',
		ports: ['TC', 'SYNC', 'LINE', 'AES', 'DANTE', 'MADI'],
	},
}

export const Choices = {
	Action: [
		{ id: 'Accept', label: 'Accept' },
		{ id: 'Reject', label: 'Reject' },
	],
	DriveMode: [
		{ id: 'Off', label: 'Off' },
		{ id: 'Record', label: 'Record' },
		{ id: 'Ethernet File Transfer', label: 'Ethernet File Transfer' },
		{ id: 'Switch to Network upon Full', label: 'Switch to Network upon Full' },
	],
	KeyCode: [
		{ id: '0x01000080', label: 'Play', icon: '&#9205;' },
		{ id: '0x01000081', label: 'Stop', icon: '&#9209;' },
		{ id: '0x01000082', label: 'RW', icon: '&#9194;' },
		{ id: '0x01000083', label: 'FF', icon: '&#9193;' },
		{ id: '0x01000084', label: 'Record', icon: '&#9210;' },
		{ id: '0x0100004e', label: 'Audio' },
		{ id: '0x0100004f', label: 'LCD' },
		{ id: '0x01000050', label: 'Files' },
		{ id: '0x01000051', label: 'Menu' },
		{ id: '0x01000004', label: 'Enter' },
	],
	KeyEventType: [
		{ id: 'KeyPressAndRelease', label: 'Press &amp; Release' },
		{ id: 'KeyPress', label: 'Press' },
		{ id: 'KeyRelease', label: 'Release' },
	],
	Models: CreateModelChoices(),
	PlaybackSpeed: [
		{ id: 'PlayX2', label: 'x2' },
		{ id: 'PlayX16', label: 'x16' },
	],
}

export const Fields = {
	Action: {
		type: 'dropdown',
		label: 'Action',
		id: 'action',
		choices: Choices.Action,
		default: 'Accept',
	},
	ButtonText: {
		type: 'textinput',
		label: 'Button Text to Push',
		tooltip: 'Enter text exactly as it appears on the LCD',
		id: 'buttonText',
		regex: '/^[a-zA-Z0-9_-s]*$/',
		default: 'OK',
	},
	DriveLabel: {
		type: 'textinput',
		label: 'Label',
		id: 'label',
		regex: '/^[a-zA-Z0-9_-]*$/',
		default: 'PIX',
	},
	DriveMode: {
		type: 'dropdown',
		label: 'Mode',
		id: 'mode',
		choices: Choices.DriveMode,
		default: 'Record',
	},
	KeyCode: {
		type: 'dropdown',
		label: 'Key',
		id: 'keyCode',
		choices: Choices.KeyCode,
		default: '0x01000051',
	},
	KeyEventType: {
		type: 'dropdown',
		label: 'Event Type',
		id: 'keyEventType',
		choices: Choices.KeyEventType,
		default: 'KeyPressAndRelease',
	},
	PlaybackSpeed: {
		type: 'dropdown',
		label: 'Speed',
		id: 'playbackSpeed',
		choices: Choices.PlaybackSpeed,
		default: 'PlayX2',
	},
	Time: {
		type: 'textinput',
		label: 'Time',
		tooltip: '0 disables automatic dismissal',
		id: 'time',
		regex: '/^([0]?[0-9]|[1-5][0-9]|60)$/',
		default: '2',
	},
	SettingSetting: {
		type: 'textinput',
		label: 'Setting',
		id: 'setting',
		tooltip: 'Must be exactly as it appears in API documentation',
		regex: '/^[a-zA-Z0-9_-]*$/',
		default: '',
	},
	SettingValue: {
		type: 'textinput',
		label: 'Value',
		id: 'value',
		tooltip: 'Must be exactly as it appears in API documentation',
		useVariables: true,
		default: '',
	},
}
