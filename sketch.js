var database

var ThisPlayer

var ThingsToUpdate = []

var Players

var UserName = null

var GameState = "Form"

var CurrentWave

var CurrentLeader = null

var AllZombies = {}

var ZombieModels = {}

var ZombieNames = {}

var Bullets = []

var EquipButtonsArray = {}

var GunImagesParts = []

var BulletService

var Reloading = false

var ZombieSpeedCurrently = 2 // increasing difficlulty
var ZombiesToSpawn = 1

var StoryForm = new Form()

var Story = [
  "WE NEED YOUR HELP!",
  "What happened you ask, zombies have flooded our village! "
]

var CurrentStoryNumber = 0

var DefaultGuns = {
  Markov: {
    ReloadTime: 5
  }
}

var Guns = {
  Piston: {
    Price: 200,
    ReloadTime: 4
  },
  Ak47: {
    Price: 1000,
    ReloadTime: 2
  }
}


window.onbeforeunload = function() 
{
  ThisPlayer.ClearInfo()
};

function setup() {
  
  RecursiveStoryNext()
  
  database = firebase.database()

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


  database.ref("Zombies").on("value", (data) => {

    if (data != undefined && data != null)
    {
      AllZombies = data.val()
    }

    else{
      AllZombies = {}
    }
  })

  database.ref("ZombieNames").on("value", (data) => {


  if (data.val() != undefined && data.val() != null)
  {
      var Keys = Object.keys(data.val())

      for (var i = 0; i < Keys.length; i ++)
      {
        if (ZombieModels[Keys[i]] == undefined)
        {
          NewZombieName = Keys[i]

          var NewZombieModel = Part.new({
            Position: Vector2.new(AllZombies[NewZombieName].Position.x, AllZombies[NewZombieName].Position.y),
            Shape: "Circle",
            Color: "green"
          })

          ZombieModels[NewZombieName] = NewZombieModel
        }

      }

      
      for (var zombieName in ZombieModels)
      {
        console.log(AllZombies)

        if (AllZombies[zombieName] == undefined)
        {
          console.log("desotryed zombie part")
          ZombieModels[zombieName].Color = "Black" // we dont need future players to see dead zombies which appeared before they played
          delete ZombieModels[zombieName] 

          console.log(ZombieModels[zombieName])
        }
      }
    }

    

  else // if the data is null it means all the zombies were destoryed
  {
    for (var zombieName in ZombieModels)
    {
        console.log("desotryed zombie part")
        ZombieModels[zombieName].Color = "Black"
        delete ZombieModels[zombieName] 
    
    }

    ZombieModels = {}
  }


  })

  StartForm()
}

// frameCount

// getFrameRate()

// frames in second


function draw() {

  background(100,100,100);  

  if (GameState != "GameOver")
  {

      if (GameState == "Lobby")
      {
        push()
        textSize(50)
        text("Coins: "+ ThisPlayer.Stats.Coins, 200,200)
        text("Current equipped gun is " + ThisPlayer.Gun, 200,600)
        pop()
      }


      if (GameState == "Play")
      {

        if (frameCount%1800 == 0)
        {
          ZombiesToSpawn++
        }

        if (frameCount%150 == 0)
        {
          ZombieSpeedCurrently = ZombieSpeedCurrently + 0.05
        }

        console.log(ThisPlayer.Gun)


        if (Guns[ThisPlayer.Gun] != undefined)
        {
          if (frameCount%(Math.round(getFrameRate()) * Guns[ThisPlayer.Gun].ReloadTime) == 0)
          {
            Reloading = false
          }
        }

        else
        {
          if (frameCount%(Math.round(getFrameRate()) * DefaultGuns[ThisPlayer.Gun].ReloadTime) == 0)
          {
            Reloading = false
          }
        }


          for (var zomb in ZombieModels)
          {
            ZombieModels[zomb].Position = Vector2.new(AllZombies[zomb].Position.x,AllZombies[zomb].Position.y )
          }

          if (frameCount%240 == 0)
          {
            for (var x = 1; x <= ZombiesToSpawn; x++)
            {
              new Zombie()
            }
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

      if (GameState == "Play" && ThisPlayer.Stats != null)
      {
        push()
        textSize(50)
        fill("white")
        text("Coins: " + ThisPlayer.Stats.Coins,200, 600)
        text("All time kills: "+ ThisPlayer.Stats.Kills, 200,400)
        text("Round kills: "+ ThisPlayer.RoundStats.Kills, 200,200)
        
        pop()
      }

  } 


  else
  {
    textSize(100)
    text("GAME OVER!!!", 200,200)
  }

}

function keyPressed()
{

  if (keyCode == 32 && Reloading == false)
  {
    Reloading = true

    var Unit  = Vector2.Sub(Vector2.new(mouseX, mouseY), ThisPlayer.Position).Unit()

    BulletService.AddBullet(ThisPlayer.Position,  Vector2.new(Unit.x * 5, Unit.y * 5))

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



function Collide(Circle1, Circle2, Circle1Size, Circle2Size)
{
    var DistanceX = Circle1.Position.x - Circle2.Position.x
    var DistanceY = Circle1.Position.y - Circle2.Position.y

    var RaduisSum = Circle1Size + Circle2Size

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

async function StartLobby()
{

  ThisPlayer = new MyPlayer(UserName)

  var PlayerGuns = await database.ref("PlayerGuns/" + UserName).once("value")

  StoryForm.Destroy()

  if (PlayerGuns.exists())
  {
    ThisPlayer.OwnedGuns = PlayerGuns.val()
  }

  database.ref("PlayerGuns/" + UserName).on("value", function(data)
  {
    console.log(data.val())
    if (data.val() != null && data.val() != undefined)
    {
      ThisPlayer.OwnedGuns = data.val()
    }
  })

  ThisPlayer.Gun = "Markov"

  database.ref("PlayerStats/" + UserName).on("value", function(data)
  {
    var Stats = data.val()

    if (Stats == null || Stats == undefined)
    {
      Stats = {
        Kills: 0,
        Wins: 0,
        Coins: 0
      }
    }

    database.ref("PlayerStats").update({
      [UserName]: Stats
    })

    ThisPlayer.Stats = Stats
  })

  GameState = "Lobby"

}

function StartGame()
{

  LoadMap()

  BulletService = new BulletStorage()
  Players = new PlayerService()

  for (var i in GunImagesParts)
  {
    GunImagesParts[i].Position = Vector2.new(2929,12312312)
    //GunImagesParts[i].Destroy()
    //delete GunImagesParts[i] 
  }

  GameState = "Play"

  database.ref("CurrentPlayers").update({
    [UserName] : {
      Position: {x: ThisPlayer.Position.x, y: ThisPlayer.Position.y}
    }
  })

  database.ref("CurrentPlayerNames").update({
    [UserName]: UserName
  })


}

function CalculatePath(Part1, Part2)
{
  var Distance = Vector2.Sub(Part1.Position, Part2.Position).Magnitude()

  var Direction = Vector2.Sub(Part1.Position, Part2.Position).Unit()
  
}


function RecursiveStoryNext()
{
  var StoryText = StoryForm.CreateElement(Story[CurrentStoryNumber], Vector2.new(100,300), "h2")

  var NextButton = StoryForm.CreateButton("Next", Vector2.new(100,350), function()
  {
    NextButton.remove()
    StoryText.remove()

    if (CurrentStoryNumber < Story.length - 1)
    {
      CurrentStoryNumber++
      RecursiveStoryNext()
    }

    else
    {
      StoryForm.Hide()
    }

  })
}