// TweenManager.js
// Version: 0.0.1
// Event: Lens Initialized
// Description: Calls TweenJS' update and adds some global helper functions
//
// ----- USAGE -----
// To start a tween by name on a given object. Optional callback script
//  global.tweenManager.startTween( tweenObject, tweenName, callback )
//
// To stop a tween by name on a given object
//  global.tweenManager.stopTween( tweenObject, tweenName )
//
// Resets the tween, call before starting the tween again
//  global.tweenManager.resetTween( tweenObject, tweenName )
// -----------------

// On update, update the Tween engine
function onUpdateEvent() 
{
    TWEEN.update();
}

// Bind an update event
var updateEvent = script.createEvent("UpdateEvent");
updateEvent.bind(onUpdateEvent);

// Global function to start a tween on a specific object
function startTween( tweenObject, tweenName, completeCallback, startCallback, stopCallback ) 
{
    var tweenScriptComponent = findTween( tweenObject, tweenName );
    if( tweenScriptComponent ) 
    {
        print( "Tween Manager: Starting " + tweenScriptComponent.api.tweenName );

        // Remove tween if it already exists
        if( tweenScriptComponent.api.tween ) 
        {
            TWEEN.remove( tweenScriptComponent.api.tween );
        }

        // Start the tween
        tweenScriptComponent.api.startTween();

        // Add the callbacks
        if( completeCallback ) 
        {
            tweenScriptComponent.api.tween.onComplete( completeCallback );    
        }

        if( startCallback ) 
        {
            tweenScriptComponent.api.tween.onStart( startCallback );    
        }

        if( stopCallback ) 
        {
            tweenScriptComponent.api.tween.onStop( stopCallback );    
        }
    }
}

// Global function to stop a tween on a specific object
function stopTween( tweenObject, tweenName ) 
{
    var tweenScriptComponent = findTween( tweenObject, tweenName );
    if( tweenScriptComponent ) 
    {
        print( "Tween Manager: Stopping " + tweenScriptComponent.api.tweenName );
        if( tweenScriptComponent.api.tween ) 
        {
            tweenScriptComponent.api.tween.stop();
        }
        else
        {
            print( "Tween Manager: Warning, trying to stop a tween that hasn't been started" ); 
        }
    }
}

// Global function to reset and object to its starting values
function resetObject( tweenObject, tweenName )
{
    var tweenScriptComponent = findTween( tweenObject, tweenName );
    if( tweenScriptComponent ) 
    {
        print( "Tween Manager: Resetting Object " + tweenScriptComponent.api.tweenName );
        tweenScriptComponent.api.resetObject();
    }    
}

// Create the easing type string that will be used by the tween
function getTweenEasingType( easingFunction, easingType )
{
    if( easingFunction == "Linear" ) 
    {
        return TWEEN.Easing.Linear.None;
    }

    return TWEEN.Easing[easingFunction][easingType];
}

// Configures the loop type for the tween
function setTweenLoopType( tween, loopType ) 
{
    switch( loopType ) 
    {
        case 0: // None
            break;
        case 1: // Loop
            tween.repeat(Infinity);
            break;
        case 2: // Ping Pong
            tween.yoyo(true);
            tween.repeat(Infinity);
            break;
    }
}

// Finds tween on an object by name
function findTween( tweenObject, tweenName )
{
    for( var i = 0; i < tweenObject.getComponentCount( "Component.ScriptComponent"); i++ )
    {
        var scriptComponent = tweenObject.getComponentByIndex( "Component.ScriptComponent", i );
        var api = scriptComponent.api;

        if( scriptComponent.api ) 
        {
            if( scriptComponent.api.tweenName ) 
            {
                if( tweenName == scriptComponent.api.tweenName ) 
                {
                    return scriptComponent;
                }
            }
        }
        else
        {
            print( "Tween Manager: Tween type hasn't initialized. Needs to initialize prior to scripting playback. Likely an order of operations issue. Try initializing tween type in the Initialized event and scripting it in the Turn On event." )
        }
    }

    print( "Tween Manager: Tween not found, " + tweenName );
}

// Register global helper functions
global.tweenManager = {};
global.tweenManager.getTweenEasingType = getTweenEasingType;
global.tweenManager.setTweenLoopType = setTweenLoopType;
global.tweenManager.startTween = startTween;
global.tweenManager.stopTween = stopTween;
global.tweenManager.resetObject = resetObject;