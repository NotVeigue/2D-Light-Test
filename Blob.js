
// Blobs are simple little creatures that sit around in the drakness and run from light sources.
function Blob(rects, width, height)
{
	var _this = this;

	_this.position = new Vector3D();
	_this.velocity = new Vector3D();
	var hit = false;


	// Find a place on the stage for this blob that is not inside any rectangle
	do
	{
		_this.position.x = Math.random() * width;
		_this.position.y = Math.random() * height;
	}
	while(checkRectIntersection(_this.position));

	function checkInLight(pos, lightBuffer, bufferWidth)
	{
		var index = (Math.floor(pos.y) * bufferWidth + Math.floor(pos.x)) * 4;
		var color = lightBuffer[index + 3];
		return color !== 0;
	};

	function fleeLight(lightDir, playerPos, lightBuffer, bufferWidth)
	{
		if(!checkInLight(_this.position, lightBuffer, bufferWidth))
			return null;

		var player2blob = _this.position.subtract(playerPos);
		var blobDotLD = player2blob.dot(lightDir);
		var blobProjLD = playerPos.add(lightDir.multiply(blobDotLD));
		
		return _this.position.subtract(blobProjLD).normalize();
	};

	function checkRectIntersection(pos)
	{
		for(var i = 0; i < rects.length; ++i)
		{
			var r = rects[i];
			if(pos.x < r.x || pos.x > r.x + r.w || pos.y < r.y || pos.y > r.y + r.h)
				continue;

			return true;
		}

		return false;
	};

	function checkOutOfBounds(pos)
	{
		return pos.x < 0 || pos.x > width || pos.y < 0 || pos.y > height;
	};

	var speed = 150;
	var noiseStrength = 10;
	_this.update = function(dt, lightDir, playerPos, lightBuffer, bufferWidth)
	{
		if(!hit)
		{
			var dir = fleeLight(lightDir, playerPos, lightBuffer, bufferWidth);
			if(dir !== null)
			{
				hit = true;
				_this.velocity = dir.add(_this.position.subtract(playerPos).normalize().multiply(0.2)).normalize().multiply(speed);
			}
		}

		if(!hit)
			return;

		// Let's use a bit of noise to influence the direction of the blob, so that it appears to wander a bit instead of just
		// moving straight.
		var spos = _this.position.multiply(0.01);
		var inf = new Vector3D(SimplexNoise(spos.x, spos.y) * noiseStrength, SimplexNoise(spos.y, spos.x) * noiseStrength);

		_this.velocity = _this.velocity.add(inf).normalize().multiply(speed);
		_this.position = this.position.add(_this.velocity.multiply(dt));

		if(checkRectIntersection(_this.position) || checkOutOfBounds(_this.position))
		{
			hit = false;
			var newPos = new Vector3D();
			do
			{
				newPos.x = Math.random() * width;
				newPos.y = Math.random() * height;
			}
			while(checkRectIntersection(newPos) || checkInLight(newPos, lightBuffer, bufferWidth))

			_this.position = newPos;
		}
	};

	_this.draw = function(ctx)
	{
		ctx.fillStyle = '#000000';
		ctx.beginPath();
		ctx.arc(_this.position.x, _this.position.y, 5, 0, Math.PI * 2);
		ctx.fill();
	};
}