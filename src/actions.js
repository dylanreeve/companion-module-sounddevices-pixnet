import { Fields } from './setup.js'

/**
 * Setup the actions.
 *
 * @public
 * @since 1.0.0
 */
export function updateActions() {
	this.setActionDefinitions({
		play: {
			name: 'Play',
			options: [],
			callback: () => {
				this.sendCommand('settransport/play')
			},
		},
		stop: {
			name: 'Stop',
			options: [],
			callback: () => {
				this.sendCommand('settransport/stop')
			},
		},
		rec: {
			name: 'Record',
			options: [],
			callback: () => {
				this.sendCommand('settransport/rec')
			},
		},
		fastForward: {
			name: 'Fast Forward',
			description: "This command will have no effect when the transport state is 'Stop' or 'Record'.",
			options: [Fields.PlaybackSpeed],
			callback: ({ options }) => {
				this.sendCommand(`invoke/RemoteApi/fastForwardPlay(PlaybackSpeed)/1/10,${options.playbackSpeed}`)
			},
		},
		fastReverse: {
			name: 'Fast Reverse',
			description: "This command will have no effect when the transport state is 'Stop' or 'Record'.",
			options: [Fields.PlaybackSpeed],
			callback: ({ options }) => {
				this.sendCommand(`invoke/RemoteApi/fastReversePlay(PlaybackSpeed)/1/10,${options.playbackSpeed}`)
			},
		},
		falseTake: {
			name: 'False Take',
			description: "This command will trigger an OK/Cancel dialog.  Use a 'Close Message Box' action to complete.",
			options: [],
			callback: () => {
				this.sendCommand('invoke/RemoteApi/falseTake()')
			},
		},
		jamReceivedTC: {
			name: 'Jam Received TC',
			options: [],
			callback: () => {
				this.sendCommand('invoke/RemoteApi/jamReceivedTc()')
			},
		},
		jamTimeOfDay: {
			name: 'Jam Time-of-Day',
			options: [],
			callback: () => {
				this.sendCommand('invoke/RemoteApi/jamTimeOfDay()')
			},
		},
		keyPress: {
			name: 'Key Press',
			options: [Fields.KeyCode, Fields.KeyEventType],
			callback: ({ options }) => {
				this.sendCommand(
					`invoke/RemoteApi/simulateKey(int,KeyEventType)/2/5,${options.keyCode}/10,${options.keyEventType}`,
				)
			},
		},
		closeMessageBox: {
			name: 'Close Message Box',
			options: [Fields.ButtonText],
			callback: ({ options }) => {
				this.sendCommand(`invoke/RemoteApi/closeMessageBox(QString)/1/10,${options.buttonText}`)
			},
		},
		setDialogDismiss: {
			name: 'Set Dialog Dismiss',
			options: [Fields.Time, Fields.Action],
			callback: ({ options }) => {
				this.sendCommand(`invoke/RemoteApi/setAutoDismiss(int,DialogControl)/2/5,${options.time}/10,${options.action}`)
			},
		},
		formatAllDrives: {
			name: 'Format All Drives',
			options: [Fields.DriveLabel],
			callback: ({ options }) => {
				this.sendCommand(`invoke/RemoteApi/formatAllDrives(QString,QString)/2/10,${options.label}/10,EXFAT`)
			},
		},
		createSoundReport: {
			name: 'Create Sound Report',
			options: [],
			callback: () => {
				this.sendCommand('invoke/RemoteApi/createSoundReportCurrentReel()')
			},
		},
		setDriveMode: {
			name: 'Set Drive Mode',
			options: [
				{
					type: 'dropdown',
					label: 'Drive',
					id: 'id',
					choices: this.CHOICES_DRIVELIST,
					default: '1',
				},
				Fields.DriveMode,
			],
			callback: ({ options }) => {
				this.sendCommand(`setsetting/RecordToDrive${options.id}=${options.mode}`)
			},
		},
		updateSetting: {
			name: 'Update Setting',
			options: [Fields.SettingSetting, Fields.SettingValue],
			callback: async ({ options }) => {
				// Parse the value field to resolve variables
				const parsed = await this.parseVariablesInString(options.value)
				const resolvedValue = parsed

				// Pass the resolved value to sendSetting
				this.sendSetting(options.setting, resolvedValue)
			},
		},
	})
}
