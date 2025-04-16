import { InstanceBase, Regex, runEntrypoint } from '@companion-module/base'
import { updateActions } from './actions.js'
import { updatePresets } from './presets.js'
import Rest from './vendor/companion/Rest.js'
import { Choices, Models } from './setup.js'

/**
 * Companion instance class for the Sound/Video Devices PIXNET compatible devices.
 *
 * @extends InstanceBase
 * @since 1.0.0
 * @author Keith Rocheck <keith.rocheck@gmail.com>
 */
class SounddevicesPixnetInstance extends InstanceBase {
	/**
	 * Create an instance of a PIXNET module.
	 *
	 * @param {Object} internal - Companion internals
	 * @since 1.0.0
	 */
	constructor(internal) {
		super(internal)

		this.updateActions = updateActions.bind(this)
		this.updatePresets = updatePresets.bind(this)

		this.currentModel = {}
		this.CHOICES_DRIVELIST = []
	}

	/**
	 * Process an updated configuration array
	 *
	 * @param {Object} config - the new configuration
	 * @public
	 * @since 1.0.0
	 */
	async configUpdated(config) {
		this.config = config

		this.processConfig()
	}

	/**
	 * Clean up the instance before it is destroyed.
	 *
	 * @public
	 * @since 1.0.0
	 */
	async destroy() {
		this.log('debug', 'destroy', this.id)
	}

	/**
	 * Creates the configuration fields for web config.
	 *
	 * @returns {Array} the config fields
	 * @public
	 * @since 1.0.0
	 */
	getConfigFields() {
		return [
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				tooltip: 'The IP of the device',
				width: 6,
				regex: Regex.IP,
			},
			{
				type: 'dropdown',
				id: 'model',
				label: 'Model',
				tooltip: 'The make/model of the device',
				choices: Choices.Models,
				default: 270,
			},
		]
	}

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 *
	 * @param {Object} config - the configuration
	 * @access public
	 * @since 1.0.0
	 */
	async init(config) {
		this.config = config

		this.processConfig()
	}

	/**
	 * INTERNAL: process the configuration data and setup the module.
	 * Abstracted due to different call points needed within the class.
	 *
	 * @private
	 * @since 1.0.0
	 */
	processConfig() {
		this.updateStatus('ok')

		if (Models[this.config.model] !== undefined) {
			this.currentModel = Models[this.config.model]
		} else {
			this.currentModel = Models[270]
			this.log('error', 'No model selected.  Setting as PIX 270i temporarily.')
		}

		this.CHOICES_DRIVELIST = [
			{ id: '1', label: 'D1' },
			{ id: '2', label: 'D2' },
		]

		if (this.currentModel.id > 250) {
			this.CHOICES_DRIVELIST.push({ id: '3', label: 'D3' })
			this.CHOICES_DRIVELIST.push({ id: '4', label: 'D4' })
		}

		this.updateActions()
		this.updatePresets()
	}

	/**
	 * Send a command to the device.
	 *
	 * @param {string} cmd - the command
	 * @public
	 * @since 1.0.0
	 */
	sendCommand(cmd) {
		if (cmd !== undefined && this.config.host !== undefined) {
			cmd = encodeURI('http://' + this.config.host + '/sounddevices/' + cmd)
			this.log('debug', `HTTP POST: ${cmd}`)

			Rest.Post(cmd, {}, (err, result) => {
				if (err !== null) {
					this.updateStatus('unknown_error', `HTTP POST Request failed (${result.error.code})`)
				} else {
					this.updateStatus('ok')
				}
			})
		} else {
			this.log('error', 'Empty command')
		}
	}

	/**
	 * Update a setting on the device.
	 *
	 * @param {string} setting - the setting
	 * @param {string} value - the value
	 * @public
	 * @since 1.0.0
	 */
	sendSetting(setting, value = '') {
		this.log('info', `Setting: ${setting} = ${value}`)
		if (setting !== undefined && this.config.host !== undefined) {
			let cmd = encodeURI('http://' + this.config.host + '/sounddevices/setsetting/' + setting + '=' + value)
			this.log('debug', `HTTP POST: ${cmd}`)

			Rest.Post(cmd, {}, (err, result) => {
				if (err !== null) {
					this.updateStatus('unknown_error', `HTTP POST Request failed (${result.error.code})`)
					this.log('error', `HTTP POST Request failed (${result.error.code})`)
				} else {
					this.updateStatus('ok')
				}
			})
		} else {
			this.log('error', 'Empty command')
		}
	}
}

runEntrypoint(SounddevicesPixnetInstance, [])
