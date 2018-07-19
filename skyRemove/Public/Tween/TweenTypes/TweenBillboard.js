// TweenBillboard.js
// Version: 0.0.1
// Event: Any Event
// Description: Runs a tween on a Lens Studio Billboard using TweenJS

//@input SceneObject sceneObject
//@input string tweenName
//@input bool playAutomatically = true
//@input int loopType = 0 {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Loop", "value":1}, {"label":"Ping Pong", "value":2}]}

//@ui {"widget":"separator"}
//@input int type = 0 {"widget":"combobox", "values":[{"label":"Binding Point", "value":0}, {"label":"Size", "value":1}, {"label":"Rotation", "value":2}]}
//@input vec2 start
//@input vec2 end
//@ui {"widget":"label", "label":"(Use X for Rot)"}
//@input float time = 1.0
//@input float delay = 0.0

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
        "y": script.start.y
    };

    var endValue = {
        "x": script.end.x,
        "y": script.end.y
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
    };
    
    // Initialize to start value
    updateValue( startValue );
}

// Here's were the values returned by the tween are used
// to drive the Component.SpriteAligner of the SceneObject
function updateValue( value ) 
{
    var DEG_TO_RAD = 0.0174533;
    
    var transform = script.sceneObject.getTransform();
    var componentCount = script.sceneObject.getComponentCount( "Component.SpriteAligner" );

    if( componentCount > 0 ) 
    {
        var spriteAligner = script.sceneObject.getFirstComponent("Component.SpriteAligner");

        switch( script.type ) 
        {
            case 0: // Binding Point
                spriteAligner.bindingPoint = new vec2( value.x, value.y );
                break;
            case 1: // Size
                spriteAligner.size = new vec2( value.x, value.y );
                break;
            case 2: // Rotation
                transform.setLocalRotation( quat.quatFromEuler( 0.0, 0.0, value.x * DEG_TO_RAD ) );
                break;
        }
    }

}