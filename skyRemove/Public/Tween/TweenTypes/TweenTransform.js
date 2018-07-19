// TweenTransform.js
// Version: 0.0.1
// Event: Any Event
// Description: Runs a tween on a Lens Studio transform using TweenJS

//@input SceneObject sceneObject
//@input string tweenName
//@input bool playAutomatically = true
//@input int loopType = 0 {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Loop", "value":1}, {"label":"Ping Pong", "value":2}]}

//@ui {"widget":"separator"}
//@input int type = 0 {"widget":"combobox", "values":[{"label":"Move", "value":0}, {"label":"Scale", "value":1}, {"label":"Rotate", "value":2}]}
//@input vec3 start
//@input vec3 end
//@input float time = 1.0
//@input float delay = 0.0
//@input bool isLocal = true

//@ui {"widget":"separator"}
//@input string easingFunction = "Quadratic" {"widget":"combobox", "values":[{"label":"Linear", "value":"Linear"}, {"label":"Quadratic", "value":"Quadratic"}, {"label":"Cubic", "value":"Cubic"}, {"label":"Quartic", "value":"Quartic"}, {"label":"Quintic", "value":"Quintic"}, {"label":"Sinusoidal", "value":"Sinusoidal"}, {"label":"Exponential", "value":"Exponential"}, {"label":"Circular", "value":"Circular"}, {"label":"Elastic", "value":"Elastic"}, {"label":"Back", "value":"Back"}, {"label":"Bounce", "value":"Bounce"}]}
//@input string easingType = "Out" {"widget":"combobox", "values":[{"label":"In", "value":"In"}, {"label":"Out", "value":"Out"}, {"label":"In / Out", "value":"InOut"}]}

// If no scene object is specified, use object the script is attached to
if( !script.sceneObject ) 
{
    script.sceneObject = script.getSceneObject();
}

// Setup the external API
script.api.tweenName = script.tweenName;
script.api.startTween = startTween;
script.api.resetObject = resetObject;
script.api.tween = null;

// Play it automatically if specified
if( script.playAutomatically ) 
{
    // Start the tween
    startTween();
}

// Create the tween with passed in parameters
function startTween()
{
    var startValue = {
        "x": script.start.x,
        "y": script.start.y,
        "z": script.start.z
    };

    var endValue = {
        "x": script.end.x,
        "y": script.end.y,
        "z": script.end.z
    };

    // Reset object to start
    resetObject();

    // Create the tween
    var tween = new TWEEN.Tween( startValue )
        .to( endValue, script.time * 1000.0 )
        .delay( script.delay * 1000.0 )
        .easing( global.tweenManager.getTweenEasingType( script.easingFunction, script.easingType ) )
        .onUpdate( updateValue );

    // Configure the type of looping based on the inputted parameters
    global.tweenManager.setTweenLoopType( tween, script.loopType );

    // Save reference to tween
    script.api.tween = tween;

    // Start the tween
    script.api.tween.start();
}

// Resets the object to its start
function resetObject()
{
    var startValue = {
        "x": script.start.x,
        "y": script.start.y,
        "z": script.start.z
    };
    
    // Initialize transform to start value
    updateValue( startValue );
}

// Here's were the values returned by the tween are used
// to drive the transform of the SceneObject
function updateValue( value ) 
{
    var DEG_TO_RAD = 0.0174533;
    var transform = script.sceneObject.getTransform();

    switch( script.type ) 
    {
        case 0: // Move
            if( script.isLocal ) 
            {
                transform.setLocalPosition( new vec3(value.x, value.y, value.z ) );
            }
            else 
            {
                transform.setWorldPosition( new vec3(value.x, value.y, value.z ) );
            }
            break;
        case 1: // Scale
            if( script.isLocal ) 
            {
                transform.setLocalScale( new vec3(value.x, value.y, value.z ) );
            }
            else 
            {
                transform.setWorldScale( new vec3(value.x, value.y, value.z ) );
            }
            break;
        case 2: // Rotation
            if( script.isLocal ) 
            {
                transform.setLocalRotation( quat.quatFromEuler( value.x * DEG_TO_RAD, value.y * DEG_TO_RAD, value.z * DEG_TO_RAD ) );
            }
            else 
            {
                transform.setWorldRotation( quat.quatFromEuler( value.x * DEG_TO_RAD, value.y * DEG_TO_RAD, value.z * DEG_TO_RAD) );
            }
            break;
    }
}