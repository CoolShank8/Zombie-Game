


function LoadMap() // loads the whole map
{

    for (var i= 100; i <= 600; i = i + 100)
    {
        if (i%200 == 0)
        {
            MakePlinkoRow(width/2, 13, i, 100)
        }

        else
        {
            MakePlinkoRow(width/2, 15, i, 80)
        }
    }



    for (var i = 100; i < 800; i += 100)
    {
        if (i%200 == 0)
        {
            MakeRow(0 + 7.5,15,i, 50, undefined, "red")
        }

        else
        {
            MakeRow(0 + 7.5,40,i, 50, undefined, "red")
        }
    }

    for (var i = 100; i < 800; i += 100)
    {
        if (i%200)
        {
            continue
        }

        else
        {
            MakeRow(displayWidth/5 * 4,15,i, 50, undefined, "red")
        }
    }

    for (var x = 0; x < displayWidth/4 * 3; x+=400)
    {
        MakePyramid(x + 17 ,600,11, 2)
    }

    for (var x = 0; x < displayWidth/4 * 3; x+=400)
    {
        MakePyramid(x + 17 ,200,11, 2)
    }

}