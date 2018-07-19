// -----JS CODE-----
//@input SceneObject objectToBeSpawned
//@input SceneObject positionTarget
//@input Component.Gyroscope gyro

// // Store objectToBeSpawned's transform as "sourceTr" 
// var sourceTr = script.objectToBeSpawned.getTransform();

// // Store objectToBeSpawned's original position and rotation
// var oldPos = sourceTr.getWorldPosition();
// var oldRot = sourceTr.getWorldRotation();

// // Set objectToBeSpawned's position and rotation to match positionTarget
// var targetTr = script.positionTarget.getTransform();
// sourceTr.setWorldPosition(targetTr.getWorldPosition());
// sourceTr.setWorldRotation(targetTr.getWorldRotation());

// // Create a new SceneObject
// var newObj = global.scene.createSceneObject("copy");

// // Copy objectToBeSpawned into newObj
// newObj.copyWholeHierarchy(script.objectToBeSpawned);

// // Restore objectToBeSpawned's original position and rotation
// sourceTr.setWorldPosition(oldPos);
// sourceTr.setWorldRotation(oldRot);


// var event = script.createEvent("UpdateEvent");
// var event = script.createEvent("TapEvent");
// event.bind(function (eventData)
// {

// global.touchSystem.touchBlocking = true;

// Store objectToBeSpawned's transform as "sourceTr" 
var sourceTr = script.objectToBeSpawned.getTransform();

// Store objectToBeSpawned's original position and rotation
var oldPos = sourceTr.getWorldPosition();
var oldRot = sourceTr.getWorldRotation();

var gyroRot = script.gyro.getTransform();

// Set objectToBeSpawned's position and rotation to match positionTarget
var targetTr = script.positionTarget.getTransform();
sourceTr.setWorldPosition(targetTr.getWorldPosition());
sourceTr.setWorldRotation(gyroRot.getWorldRotation());

// Create a new SceneObject
var newObj = global.scene.createSceneObject("copy");

// Copy objectToBeSpawned into newObj
newObj.copyWholeHierarchy(script.objectToBeSpawned);

// Restore objectToBeSpawned's original position and rotation
sourceTr.setWorldPosition(oldPos);
sourceTr.setWorldRotation(oldRot);

// });