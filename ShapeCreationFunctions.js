function MakeVerticalRow(StartingX,BlocksInRow, FixedY, BlockWidth, BlockHeight, Color)
{
  if (BlockWidth === undefined)
    BlockWidth = 30

  if (BlockHeight === undefined)
    BlockHeight = 40


  if (Color == undefined)
  {
      Color = "grey"
  }

  for (var i = 0; i < BlocksInRow; i++)
  {

    Part.new({
        Position: Vector2.new(StartingX + i * BlockWidth, FixedY),
        Size: Vector2.new(BlockWidth, BlockHeight),
        Color: Color
    })

  }
}










// pryamind functions
function MakeRow(StartingX,BlocksInRow, FixedY, BlockWidth, BlockHeight, Color)
{
  if (BlockWidth === undefined)
    BlockWidth = 30

  if (BlockHeight === undefined)
    BlockHeight = 40


  if (Color == undefined)
  {
      Color = "grey"
  }

  for (var i = 0; i < BlocksInRow; i++)
  {

    Part.new({
        Position: Vector2.new(StartingX + i * BlockWidth, FixedY),
        Size: Vector2.new(BlockWidth, BlockHeight),
        Color: Color
    })

  }
}

function MakePyramid(StartingX, StartingY, AmountOfBlocksStarting,BlocksToSubtractEachRow,AmountOfRows,BlockWidth, BlockHeight)
{
  var BlocksToMake = AmountOfBlocksStarting

  if (AmountOfRows === undefined)
  {
    var RowCounter = 0

    for (var i = AmountOfBlocksStarting; i > 0; i = i - BlocksToSubtractEachRow)
    {
      RowCounter = RowCounter + 1
      AmountOfRows = RowCounter
    }
    console.log(RowCounter) 
  }

  if (BlockWidth === undefined)
    BlockWidth = 30

  if (BlockHeight === undefined)
    BlockHeight = 40

  for (var i = 0; i < AmountOfRows; i ++)
  {
    MakeRow(StartingX + ((BlocksToSubtractEachRow/2) * i * BlockWidth), BlocksToMake, StartingY - (i * BlockHeight), BlockWidth, BlockHeight)
    BlocksToMake = BlocksToMake - BlocksToSubtractEachRow
  }
}


function MakePlinkoRow(middlex ,BlocksInRow, FixedY,Gap, BlockRaduis)
{

  if (BlockRaduis === undefined)
    BlockRaduis = 10


  var BlocksRemaining = BlocksInRow

  var StartingX = middlex - ((BlockRaduis * 2 * BlocksInRow) + (Gap * (BlocksInRow - 1)))
 
  Part.new({
    Position: Vector2.new(middlex, FixedY),
    Shape: "Circle",
    Color: "Black",
    Size: Vector2.new(60,60)
  })

  BlocksRemaining = BlocksRemaining - 1
  

  for (var i = 1; i <= (BlocksRemaining/2); i ++)
  {

    Part.new({
      Position: Vector2.new(middlex - (Gap * i), FixedY),
      Shape: "Circle",
      Color: "Black",
      Size: Vector2.new(60,60)
    })
  
  }


  for (var i  = 1; i <= (BlocksRemaining/2); i++)
  {
    
    Part.new({
      Position: Vector2.new(middlex + (Gap * i), FixedY),
      Shape: "Circle",
      Color: "Black",
      Size: Vector2.new(60,60)
    })
    
  }

}