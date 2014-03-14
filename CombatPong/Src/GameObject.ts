module CombatPong {
	export class GameObject {
		interactiveGraphic: InteractiveGraphic;
		graphic: Kinetic.Group;
		stageData: StageData;
		constructor(stageData: StageData) {
			this.stageData = stageData;
		}
		generateGraphic() { } //override this
		sendCollisionMessage(receiver:GameObject, response:SAT.Response) { }
		checkForCollision() : boolean {

			return false;
		}
		//onWallCollision(wall: Wall, response: SAT.Response);
		//onBallCollision(ball: Ball, response: SAT.Response);
	}
}