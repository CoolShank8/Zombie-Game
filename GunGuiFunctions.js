
function DisplayGun(Form,GunName, Xpos)
{
  var Offset = Vector2.new(30,0)

  console.log(Xpos)


  var GunImagePart = Part.new({
    Position: Vector2.Add(Vector2.new(Xpos, 300), Offset),
    Texture: loadImage(GunName + ".png"),
    Size: Vector2.new(150,100)
  })


  GunImagesParts.push(GunImagePart)

  Form.CreateElement("Price: "+ Guns[GunName].Price,  Vector2.new(Xpos, 400))

  Form.CreateElement("ReloadTime: " + Guns[GunName].ReloadTime, Vector2.new(Xpos, 450))


  if (ThisPlayer.OwnedGuns[GunName] != undefined)
  {
    CreateEquipGunButton(Form, GunName)
  }

  else
  {
    var BuyButton = Form.CreateButton("Buy", Vector2.new(Xpos, 500), function(){
      if (Guns[GunName].Price <= ThisPlayer.Stats.Coins)
      {
  
      database.ref("PlayerStats/" + UserName).update({
        Coins: ThisPlayer.Stats.Coins - Guns[GunName].Price
      })
  
        database.ref("PlayerGuns/" + UserName).update({
            [GunName]: GunName
         })
  
        BuyButton.hide()
  
      CreateEquipGunButton(Form,GunName)
      }}
    )}


function CreateEquipGunButton(form, GunName)
{
  var EquipButton = form.CreateButton("Equip", Vector2.new(Xpos, 500), function()
         {
           ThisPlayer.Gun = GunName
           

          for (var buttonName in EquipButtonsArray)
          {
            var Button = EquipButtonsArray[buttonName]

            Button.html("Equip")
          }

           EquipButton.html("Equipped")
         })

         EquipButtonsArray[GunName + "EquipButton"] = EquipButton
      }
}