// -----JS CODE-----
// @input SceneObject objectWithTweens

global.tweenManager.startTween( script.objectWithTweens, "box_move", moveComplete, moveStart, moveStop );

// Complete callback
function moveComplete() 
{
    global.tweenManager.startTween( script.objectWithTweens, "box_scale", scaleComplete );
}

// Start callback
function moveStart( value )
{  
    // Callbacks support an optional value parameter
    print( "Example Tween: Started at ( " + value.x + ", " + value.y + ", " + value.z + " )" ); 
}

// Stop callback
function moveStop( value)
{
    // Callbacks support an optional value parameter
    print( "Example Tween: Stopped at ( " + value.x + ", " + value.y + ", " + value.z + " )" );
}

function scaleComplete() 
{
    global.tweenManager.startTween( script.objectWithTweens, "box_rotate", rotateComplete );
}

function rotateComplete() 
{
    // Resets the object to the start values
    global.tweenManager.resetObject( script.objectWithTweens, "box_move" );
    global.tweenManager.resetObject( script.objectWithTweens, "box_scale" );
    global.tweenManager.resetObject( script.objectWithTweens, "box_rotate" );

    // Start the whole chain again
    global.tweenManager.startTween( script.objectWithTweens, "box_move", moveComplete, moveStart, moveStop );
}