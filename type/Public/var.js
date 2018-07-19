// -----JS CODE-----
//@input SceneObject keyboard
//@input SceneObject bigContainer

global.lastEl = [];
global.meshVisu = null;

global.touchSystem.touchBlocking = true;

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{
	if (global.scene.isRecording()) {
		script.keyboard.enabled = false;
		script.bigContainer.enabled = false;
	}

});
