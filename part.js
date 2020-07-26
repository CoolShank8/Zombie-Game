


class Part
{

    static PartArray = []

    static DefaultProperties = {
        
    }

    constructor(PropertyTable)
    {

        if (PropertyTable != undefined)
        {
            for (var Property in Part.DefaultProperties)
            {
                if (PropertyTable[Property] == undefined)
                {
                    var PropertyValue = Part.DefaultProperties[Property]

                    if (typeof(PropertyValue) === "object")
                    {
                        //this[Property] = PropertyValue
                        this[Property] =  JSON.parse(JSON.stringify(PropertyValue)) // we want a copy of the object since if we didnt do that if we changed this object's propety it would change the defauly properties property to
                        //console.log(Part.DefaultProperties[Property].x + "   " + this[Property].x)
                    }

                    else
                    {
                        this[Property] = PropertyValue
                    }
                }
                else
                {
                    this[Property] = PropertyTable[Property]
                }
            }
        }

        else // if property table is undefined
        {
            for (var Property in Part.DefaultProperties)
            {
                if (typeof(PropertyValue) === "object")
                {
                    //this[Property] = PropertyValue
                    this[Property] =  JSON.parse(JSON.stringify(PropertyValue)) // we want a copy of the object since if we didnt do that if we changed th
                }

                else
                {
                    this[Property] = PropertyValue
                }
            }
        }
 - 1

        this.Mass = (this.Size.x * this.Size.y) * this.Density

        Part.PartArray.push(this)
        ThingsToUpdate.push(this)

        this.UpdateNumber = ThingsToUpdate.length - 1
        this.PartArrayUpdateNumber = Part.PartArray.length - 1

        this.Colliding = false
    }

    Update()
    {

        this.Position = Vector2.Add(this.Position, this.Velocity)

        for (var i = 0; i < Part.PartArray.length; i++)
        {

            var part = Part.PartArray[i]

            if (part == this)
            {
                continue
            }

            if (Collide(this, part) == true)
            {
                this.Color = "golden"
                this.Colliding = true
            }


            else
            {
                this.Colliding = false
            }
        }

        push()

        translate(this.Position.x, this.Position.y)
        rectMode(CENTER)
        angleMode(DEGREES)
        imageMode(CENTER)
        
        rotate(this.Angle);
        fill(this.Color)
        tint(255,this.TextureVisibility * 255)

        if (this.Texture != undefined)
        {
            image(this.Texture, 0, 0, this.Size.x, this.Size.y)
        }

        else{
            if (this.Shape == "Rect")
            {
                rect(0, 0, this.Size.x , this.Size.y)
            }

            else if(this.Shape == "Circle")
            {
                ellipse(0,0,this.Size.x, this.Size.y)
            }
        }

        pop()
    }

   static new(PropertyTable)
    {
        return new Part(PropertyTable)
    }

    Destroy()
    {
        ThingsToUpdate.splice(this.UpdateNumber, 1)
        Part.PartArray.splice(this.PartArrayUpdateNumber, 1)
    }
}