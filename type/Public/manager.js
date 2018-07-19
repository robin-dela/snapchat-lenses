//@input Asset.Material spriteMaterial
//@input SceneObject cursor
//@input SceneObject keyboard
//@input SceneObject container
//@input SceneObject bigContainer

// @input Component.Camera camera

var eventCF = script.createEvent("CameraFrontEvent");
eventCF.bind(function (eventData)
{	
	 script.keyboard.enabled = false;
    removeAllRenderLayers();
    return;
});

var eventCB = script.createEvent("CameraBackEvent");
eventCB.bind(function (eventData)
{
    script.keyboard.enabled = true;
    addAllRenderLayers();
});

function removeAllRenderLayers( )
{
    var t = script.container.getRenderLayer();
    var ta = script.keyboard.getRenderLayer();
    script.camera.removeRenderLayer(t);
    script.camera.removeRenderLayer(ta);
}

function addAllRenderLayers()
{

    var t = script.container.getRenderLayer();
    var ta = script.keyboard.getRenderLayer();
    script.camera.addRenderLayer(t);
    script.camera.addRenderLayer(ta);
}

var pos = script.cursor.getTransform().getWorldPosition();
var rot = script.cursor.getTransform().getWorldRotation();

var event = script.createEvent("UpdateEvent");
event.bind(function (eventData)
{
    pos = script.cursor.getTransform().getWorldPosition();
	rot = script.cursor.getTransform().getWorldRotation();
})

var event2 = script.createEvent("TouchEndEvent");
event2.bind(function (eventData)
{
	if (global.myValue && global.startTouched) {

		if (global.myValue == 'DONE' ) {
			script.keyboard.enabled = false;
			script.bigContainer.enabled = false;
			// var ta = script.keyboardVisu.getRenderLayer();
			// script.camera2.removeRenderLayer(ta);
			return;
		}

		if (global.myValue == 'DEL' && global.lastEl.length !== 0) {
			global.lastEl[global.lastEl.length-1].destroy();
			global.lastEl.splice(-1,1);
			//return;
		} else {
			var iMat = script.spriteMaterial.clone();

		// Create a new SceneObject
		var newObj = global.scene.createSceneObject("copy");
		var newSprite = newObj.createComponent("Component.SpriteVisual");

		// var newTouch = newObj.createComponent("Component.TouchComponent");
		// newTouch.enabled = true;

		// newTouch.setCamera(script.camera);
		// newTouch.addMeshVisual(global.meshVisu);

		// var newManipulate = newObj.createComponent("Component.ManipulateComponent");
		// newManipulate.clampWorldPosition();

		// newManipulate.enableManipulateType(ManipulateType.Drag, true);

		// var a = newManipulate.isManipulateTypeEnabled(ManipulateType.Drag);
		// print("ok"+a);


		// var newSpriteV = newObj.createComponent("Component.SpriteAligner");
		// newSpriteV.size = new vec2(20.0,20.0);

		newSprite.fillMode = 2;
		
		// print(newSprite.getMeshSize());

		var sourceTr = newObj.getTransform();

		sourceTr.setWorldPosition(pos);
		sourceTr.setWorldRotation(rot);
		sourceTr.setWorldScale(new vec3(16.0 * 0.8,16.0 * 0.8, 1));
		
		newSprite.addMaterial(iMat);
		newSprite.mainPass.baseTex = global.myTexture;

		// newObj.copyWholeHierarchy(script.container);

	global.lastEl.push(newObj);
		
		}

	    

	}

	//global.lastEl.push(newObj);
	global.startTouched = false;

	// newObj.copyWholeHierarchy(script.container);
})

// if (global.myValue && global.startTouched) {

// 	if (global.myValue == 'DONE') {
// 		script.keyboard.enabled = false;
// 		return;
// 	}

// 	//var pos = script.cursor.getTransform().getWorldPosition();
// 	//var rot = script.cursor.getTransform().getWorldRotation();

// 	var iMat = script.spriteMaterial.clone();

// 	// Create a new SceneObject
// 	var newObj = global.scene.createSceneObject("copy");
// 	var newSprite = newObj.createComponent("Component.SpriteVisual");

// 	var sourceTr = newObj.getTransform();
// 	sourceTr.setWorldPosition(pos);
// 	sourceTr.setWorldRotation(rot);
	
// 	newSprite.addMaterial(iMat);
// 	newSprite.mainPass.baseTex = global.myTexture;

// 	newObj.copyWholeHierarchy(script.container);
// }

// global.startTouched = false;