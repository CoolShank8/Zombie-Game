var database

var Players = {}

var ThisPlayer

var ThingsToUpdate = []

var PlayerModel

function setup() {
  database = firebase.database()

  createCanvas(displayWidth,400)

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


  PlayerModel = Part.new({
    Position: Vector2.new(displayWidth/2, 200),
    Shape: "Circle"
  })

  ThisPlayer = new MyPlayer(Math.round(random(100,200)))


  console.log(ThisPlayer.Index)

  ThisPlayer.UpdateInfoOnDatabaseUpdate()

}

function draw() {
  background(255,255,255);  

  //console.log(MyPlayerDetails)

  if (keyIsDown(40))
  {
    PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(0,5))
    
    ThisPlayer.UpdateInfo()
  }

  if (keyIsDown(38))
  {
    PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(0,-5))

    ThisPlayer.UpdateInfo()
  }

  if (keyIsDown(37)) // left arrow
  {
    PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(-5,0))

    ThisPlayer.UpdateInfo()
  }

  if (keyIsDown(39)) // right arrow
  {
    PlayerModel.Position = Vector2.Add(PlayerModel.Position, Vector2.new(5,0))
    
    ThisPlayer.UpdateInfo()
  }


  Update()

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



function Collide(Circle1, Circle2)
{
    var DistanceX = Circle1.Position.x - Circle2.Position.x
    var DistanceY = Circle1.Position.y - Circle2.Position.y

    var RaduisSum = Circle1.Size.x/2 + Circle2.Size.x/2

    if (DistanceX * DistanceX + DistanceY * DistanceY < RaduisSum * RaduisSum)
    {
        return true
    }

    else{
        return false
    }
}