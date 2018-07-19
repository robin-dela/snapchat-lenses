// TweenAlpha.js
// Version: 0.0.1
// Event: Any Event
// Description: Runs a tween on a Lens Studio object's alpha using TweenJS

//@input SceneObject sceneObject
//@input string tweenName
//@input bool playAutomatically = true
//@input int loopType = 0 {"widget":"combobox", "values":[{"label":"None", "value":0}, {"label":"Loop", "value":1}, {"label":"Ping Pong", "value":2}]}

//@ui {"widget":"separator"}
//@input float start = 0.0 {"widget":"slider", "min":0.0, "max":1.0, "step":0.01}
//@input float end = 1.0 {"widget":"slider", "min":0.0, "max":1.0, "step":0.01}
//@input bool recursive = false
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
        "a": script.start
    };

    var endValue = {
        "a": script.end
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
        "a": script.start
    };

    // Initialize transform to start value
    updateValue( startValue );
}

// Here's were the values returned by the tween are used
// to drive the transform of the SceneObject
function updateValue( value ) 
{
    updateComponentValue( script.sceneObject, "Component.MeshVisual", value );
    updateComponentValue( script.sceneObject, "Component.SpriteVisual", value );
}

function updateComponentValue( sceneObject, componentName, value ) 
{
    for( var i = 0; i < sceneObject.getComponentCount( componentName); i++ ) 
    {
        var visual = sceneObject.getComponentByIndex( componentName, i );
        var currColor = visual.getMaterial(0).getPass(0).baseColor;
        currColor.a = value.a;
        visual.getMaterial(0).getPass(0).baseColor = currColor;
    }

    if( script.recursive ) 
    {

        for( var i = 0; i < sceneObject.getChildrenCount(); i++ ) 
        {
            updateComponentValue( sceneObject.getChild(i), componentName, value );
        }
    }
}

