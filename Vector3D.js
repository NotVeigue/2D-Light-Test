function Vector3D(X,Y,Z)
{
	this.x = X || 0;
	this.y = Y || 0;
	this.z = Z || 0;
	
	this.add = function(v)
	{
		return new Vector3D(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	this.adds = function(n)
	{
		return new Vector3D(this.x + n, this.y + n, this.z + n);
	}
	
	this.subtract = function(v)
	{
		return new Vector3D(this.x - v.x, this.y - v.y, this.z - v.z);
	}
	
	this.subtracts = function(n)
	{
		return new Vector3D(this.x - n, this.y - n, this.z - n);
	}
	
	this.multiply = function(n)
	{
		return new Vector3D(this.x*n,this.y*n,this.z*n);
	}
	
	this.divide = function(n)
	{
		if(n != 0)
			return new Vector3D(this.x/n,this.y/n,this.z/n);
			
		return new Vector3D(0,0,0);
	}
	
	this.dot = function(v)
	{
		return this.x*v.x + this.y*v.y + this.z*v.z;
	}
	
	this.cross = function(v)
	{
		return new Vector3D(this.y*v.z - this.z*v.y,this.z*v.x - this.x*v.z,this.x*v.y - this.y*v.x);
	}
	
	this.magnitude = function()
	{
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	}
	
	this.sqrmagnitude = function()
	{
		return this.x*this.x + this.y*this.y + this.z*this.z;
	}
	
	this.normalize = function()
	{
		var temp = new Vector3D(this.x,this.y,this.z);
		return temp.divide(this.magnitude());
	}
	
	this.copy = function()
	{
		return new Vector3D(this.x,this.y,this.z);
	}
	
	this.perp2d = function(ccw)
	{
		return ccw ? new Vector3D(this.y,-this.x,this.z) : new Vector3D(-this.y,this.x,this.z);
	}

	this.lerp = function(v, t)
	{
		return new Vector3D(this.x + (v.x - this.x) * t,
							this.y + (v.y - this.y) * t,
							this.z + (v.z - this.z) * t);
	}
}