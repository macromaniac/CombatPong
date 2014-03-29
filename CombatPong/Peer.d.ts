
declare class Peer {
	constructor(id?: string, options?: Object);

	id: string;
	connections: Object;
	disconnected: boolean;
	destroyed: boolean;

	connect(id: string, options?: Object);
	call(id: string, stream: any); //MediaStream not found :<
	on(event: string, callback: any);
	disconnect();
	destroy();
}

declare class DataConnection {

	bufferSize: number; //listed twice for some reason
	dataChannel: Object;
	label: string;
	metadata: any;
	open: boolean;
	peerConnection: Object;
	peer: string;
	reliable: boolean;
	serialization: string;
	type: string;

	send(data: any);
	close();
	on(event: string, callback: any);
}


declare class util {
	browser: string;
	supports: Object;
	audioVideo: boolean;
	data: boolean;
	binary: boolean;
	reliable: boolean;
}