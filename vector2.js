class Vector2{
    

    constructor(x,y, ReadOnly)
    {


        this.x = x
        this.y = y

        this.Magnitude = sqrt(pow(this.x, 2) + pow(this.y, 2))

        this.Unit = {
            x: this.x/this.Magnitude,
            y: this.y/this.Magnitude
        }

        if (ReadOnly == undefined)
        {
            this.ReadOnly = true
        }

        else{
            this.ReadOnly = ReadOnly
        }

        if (this.ReadOnly === false)
        {
            ThingsToUpdate.push(this)
            console.log("PUSHED INTO ARRAY!")
        }
    }

   Update() // used if vector is not read only
    {
        this.Magnitude = sqrt(pow(this.x, 2) + pow(this.y, 2))

        this.Unit = {
            x: this.x/this.Magnitude,
            y: this.y/this.Magnitude
        }
    } 

    Destory()
    {
        
    }


    static Add(Vec1, Vec2)
    {
        return new Vector2(Vec1.x + Vec2.x, Vec1.y + Vec2.y)
    }

    static Sub(Vec1, Vec2)
    {
        return new Vector2(Vec1.x - Vec2.x, Vec1.y - Vec2.y)
    }

    static new(x,y)
    {
        return new Vector2(x,y)
    }

}