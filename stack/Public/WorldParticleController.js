// -----JS CODE-----
//@input float animationLength = 5
//@input int maxParticleSystems = 50
//@input float spawnInterval = 0.01
//@input SceneObject particle

// Store copy of original particle system
var copyableMeshVisual = script.particle.getFirstComponent("Component.MeshVisual");
var copyableMaterial = copyableMeshVisual.mainMaterial.clone();

// Intialize variables to store the particle systems in
var instances = []; // Each particle system
var startTimes = []; // When that particle system started
var matPasses = []; // The particle system's material

// Keep track of our particle systems
var lastSpawnTime = 0; // When we last started a particle system
var nextSpawnIdx = 0; // Index of the particle system we should modify next

// Generate all our particle systems
for (var i = 0; i < script.maxParticleSystems; i++) {
	var newObject = global.scene.createSceneObject("Particle_Trails");
	newObject.enabled = false;

	var mv = newObject.copyComponent(copyableMeshVisual);
	mv.clearMaterials();
	mv.addMaterial(copyableMaterial.clone());

	var material = mv.getMaterial(0).getPass(0);

	instances.push(newObject);
	startTimes.push(0.0);
	matPasses.push(material);
}

function updateWorldParticles(){
	var currentTime = getTime();
	var t = currentTime - lastSpawnTime;

	// Update all particle system's  time
	for (var i = 0; i < script.maxParticleSystems; ++i) {
		var timeOffset = startTimes[i];
		var obj = instances[i];
		var pass = matPasses[i];
		var shaderTime = currentTime - timeOffset;

		if (shaderTime > script.animationLength)
			obj.enabled = false;
		else
			pass.externalTime = new vec4(0.0,shaderTime,1.0,1.0);
	}

	// Restart particle system's position at current pos as needed
	if (t > script.spawnInterval) {
		var currentPos = script.particle.getTransform().getWorldPosition();
		var index = nextSpawnIdx % script.maxParticleSystems;
		var instance = instances[index];

		lastSpawnTime = currentTime;
		startTimes[index] = currentTime;

		instance.enabled = true;
		instance.getTransform().setWorldPosition(new vec3(currentPos.x,currentPos.y,currentPos.z));
		
		nextSpawnIdx++;
	}
}

function onUpdate(eventData) {
	updateWorldParticles();
}
var event = script.createEvent("UpdateEvent");
event.bind(onUpdate);
