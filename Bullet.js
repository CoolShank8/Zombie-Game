class Bullet
{

    static BulletCount = 0

    constructor(Position, Velocity)
    {
        this.LifeTime = Math.round(getFrameRate()) * 10

        this.Veloicty = Velocity

        this.Position = Position

        this.ref = "Bullet" + UserName + Bullet.BulletCount

        this.BulletCount = Bullet.BulletCount


        Bullet.BulletCount++

        ThingsToUpdate.push(this)

        this.UpdateNumber = ThingsToUpdate.length - 1

    }

    Update()
    {


        this.Position = Vector2.Add(this.Veloicty, this.Position)

        database.ref("Bullets/" + this.ref).update({
            Position: {
                 x: this.Position.x,
                 y: this.Position.y
             }
         })
    }




    Destory()
    {
        ThingsToUpdate.splice(this.UpdateNumber,1)
    }
}