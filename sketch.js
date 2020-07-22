var database

var ThisPlayer

var ThingsToUpdate = []

var Players

var UserName = null

var GameState = "Form"

var CurrentWave

var CurrentLeader = null

var AllZombies = {}

var ZombieNames = {}

var Bullets = []


window.onbeforeunload = function() 
{
  ThisPlayer.ClearInfo()
};

function setup() {
  
  
  database = firebase.database()

  Players = new PlayerService()

  createCanvas(displayWidth,700)

  Part.DefaultProperties = {
    Position: Vector2.new(displayWidth/2, 200),
    Size:  Vector2.new(50,50),
    Texture: undefined,
    TextureVisibility: 1,
    Color: "grey",
    Angle: 0,
    Anchored: true,
    Shape: "Rect",
    Velocity: Vector2.new(0,0),
    Density: 3
}

    database.ref("Leader").on("value", (data) => {
      CurrentLeader = data.val()
    })

  database.ref("CurrentWave").on("value", function(data)
  {

    if (data.val() != undefined || data.val() != null)
    {
      CurrentWave = data.val()
    }

    else
    {
      database.ref("/").update({
        CurrentWave: 1
      })
    }
  })

  database.ref("Zombies").on("value", (data) => {
    if (data != undefined && data != null)
    {
      AllZombies = data.val()
    }
  })

  database.ref("ZombieNames").on("value", (data) => {
    ZombieNames = data.val()
  })

  StartForm()
}

function draw() {
  background(255,255,255);  


  if (GameState == "Play")
  {

      if (ThisPlayer.Stats != null)
      {
        push()
        textSize(50)
        text("All time kills: "+ ThisPlayer.Stats.Kills, 200,400)
        text("Round kills: "+ ThisPlayer.RoundStats.Kills, 200,200)
        pop()
      }


      for (var i in Bullets)
      {
        var bullet = Bullets[i]

        for (var x in AllZombies)
        {
          var zom = AllZombies[x]

          if (Collide(zom, bullet, 25))
          {

            console.log(AllZombies)

            database.ref("Zombies").update({
              [x]: null
            })

            database.ref("ZombieNames").update({
              [x]: null
            })

            console.log(x)

            console.log("ZOMBIE DESTROETYED!")

            database.ref("PlayerStats/" + UserName).update({
              Kills: ThisPlayer.Stats.Kills + 1
            })

            ThisPlayer.RoundStats.Kills++
          
          }
        }
      }

      for (var zomb in AllZombies)
      {
        circle(AllZombies[zomb].Position.x, AllZombies[zomb].Position.y)
      }

      if (frameCount%240 == 0)
      {
        new Zombie()
      }

      if (keyIsDown(40))
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(0,5))
      }

      if (keyIsDown(38))
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(0,-5))
      }

      if (keyIsDown(37)) // left arrow
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(-5,0))

      }

      if (keyIsDown(39)) // right arrow
      {
        ThisPlayer.Position = Vector2.Add(ThisPlayer.Position, Vector2.new(5,0))
        
      }

  }


  Update()

}

function keyPressed()
{

  if (keyCode == 32)
  {
    var bullet = new Part({
      Position: ThisPlayer.Position,
      Shape: "Circle",
      Size: Vector2.new(25,25),
      Color: "red"
    })

    var Unit  = Vector2.Sub(Vector2.new(mouseX, mouseY), ThisPlayer.Position).Unit()

    bullet.Velocity = Vector2.new(Unit.x * 5, Unit.y * 5)

    Bullets.push(bullet)
  }
}

function Update()
{
  for (var i = 0; i < ThingsToUpdate.length; i++)
  {
    ThingsToUpdate[i].Update()
  }
}

function UpdateValueInDatabase(NodeName, NewValue)
{
  database.ref('/').update({
    [NodeName]: NewValue
  });
}



function Collide(Circle1, Circle2, CircleSizes)
{
    var DistanceX = Circle1.Position.x - Circle2.Position.x
    var DistanceY = Circle1.Position.y - Circle2.Position.y

    var RaduisSum = CircleSizes * 2

    if (DistanceX * DistanceX + DistanceY * DistanceY < RaduisSum * RaduisSum)
    {
        return true
    }

    else{
        return false
    }
}

async function GetHighestDatabasePlayerIndex()
{
  var HighestIndex_Ref = await database.ref('CurrentHighestPlayerIndex').once("value")

  console.log(JSON.stringify(HighestIndex_Ref.val()))

  if (HighestIndex_Ref.exists())
  {
    return HighestIndex_Ref.val()
  }
}


function StartGame()
{
  ThisPlayer = new MyPlayer(UserName)

  GameState = "Play"

  database.ref("CurrentPlayers").update({
    [UserName] : {
      Position: {x: ThisPlayer.Position.x, y: ThisPlayer.Position.y}
    }
  })

  database.ref("CurrentPlayerNames").update({
    [UserName]: UserName
  })

  database.ref("/").update({
    Leader: UserName
  })

  database.ref("PlayerStats/" + UserName).on("value", function(data)
  {
    var Stats = data.val()

    if (Stats == null || Stats == undefined)
    {
      Stats = {
        Kills: 0,
        Wins: 0
      }
    }

    database.ref("PlayerStats").update({
      [UserName]: Stats
    })

    ThisPlayer.Stats = Stats
  })


}

function CalculatePath(Part1, Part2)
{
  var Distance = Vector2.Sub(Part1.Position, Part2.Position).Magnitude()

  var Direction = Vector2.Sub(Part1.Position, Part2.Position).Unit()

  
}

