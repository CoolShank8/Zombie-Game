class BulletStorage
{
    constructor()
    {
        this.BulletArray = {}
        this.MyBulletArray = {}

        database.ref("Bullets").on("value", (data) =>
        {
            if (data != null && data != undefined)
            {
                this.BulletArray = data.val()
            }
        })

        ThingsToUpdate.push(this)
    }

    Update()
    {
        for (var bulletName in this.BulletArray)
        {
            push()
            fill("blue")
            circle(this.BulletArray[bulletName].Position.x, this.BulletArray[bulletName].Position.y, 25, 25)
            push()
        }

        for (var i in this.MyBulletArray)
        {
          var bullet = this.MyBulletArray[i]

          for (var x in AllZombies)
          {
            var zom = AllZombies[x]

            if (Collide(zom, bullet, 50, 25))
            {

              zom.Destoryed = true

              console.log(AllZombies)

              database.ref("Zombies").update({
                [x]: null
              })

              database.ref("ZombieNames").update({
                [x]: null
              })


              database.ref("PlayerStats/" + UserName).update({
                Kills: ThisPlayer.Stats.Kills + 1,
                Coins: ThisPlayer.Stats.Coins + 10
              })

              ThisPlayer.RoundStats.Kills++

            }
            
          }

        }

    }

    AddBullet(Position, Velocity)
    {
        this.MyBulletArray[Bullet.BulletCount] = new Bullet(Position,Velocity)
    }

    RemoveBullet(BulletRefCount)
    {
        delete this.MyBulletArray[BulletRefCount]
    }
}