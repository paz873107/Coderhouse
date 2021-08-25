import 'regenerator-runtime/runtime';
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.resolve(__dirname, '../file/messageslog.txt');

export default class Message {
	constructor() {
		this.messages = [];
	}

	async getMessages() {
		try {
			const txtFile = JSON.parse(await fs.readFile(filePath, 'utf-8'));
			this.messages = txtFile;
			return this.messages;
		} catch (error) {
			console.log(error);
		}
	}

	async newMessage(email, date, time, message) {
		try {
			this.messages.push({
				email,
				date,
				time,
				message,
			});
			await fs.writeFile(filePath, JSON.stringify(this.messages, null, 2));
			return this.messages;
		} catch (error) {
			console.log(error)
		}
	}
}