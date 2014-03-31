// Type definitions for socket.io nodejs client
// Project: http://socket.io/
// Definitions by: Maido Kaara <https://github.com/v3rm0n>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare var io: {
    connect(url: string): Socket;
    connect(): Socket;
}
interface Socket {
	on(event: string, callback: (data: any) => void);
	emit(event: string, data: any);
	disconnect();
}