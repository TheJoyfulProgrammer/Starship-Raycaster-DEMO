# Starship-Raycaster-DEMO
A multi-layer demo which displays fragment shader effects on the first layer, a starship raycasting demo on the second layer, a health vignette on the third layer, and a GUI &amp; Large map GUI on the fourth layer. It also features palette-building techniques, histograms, a variety of color palettes, and multiple dithering techniques.


## HISTORY
This project started out as an experiement to build specific graphical features for a BASIC (**B**eginners **A**ll-purpose **S**ymbolic **I**nstructional **C**ode) programming language which has been in the works since 2014, mostly conceptualizing, defining, and planning.

Learning to code in the 1980s, many of the primitive graphical displays of that era, as well as the 1990s, really brought a lot of joy and excitement to many folks, including myself, hence why you see developers still crafting nostalgic games representing those "good ole days". To continue this tradition, and provide developers with a modern, and/or futuristic ways of accomplishing these tasks quickly and efficiently, the goal was to create a BASIC programming language of the future.

While pixelated graphics are still very entertaining in solutions such as video games, this technique is technically extremely easy to implement, especially on the GPU. A favorite feature for many on the EGA/VGA video cards were the indexed colored hardware screen modes, which provided a 16-color and 256-color palette modes, like modes 12h, 13, and Mode X (as it was called by Michael Abrash). There were a lot of cool effects you could do in these hardware screen modes.

To make indexed modes "futuristic" in the BASIC programming language, the idea was to provide a way to draw 24-bit colored images to these windows, and automatically get converted in realtime at run-time, so the developers did not need to concern themselves too much about trying to maintain the colors of the palette in the original images being drawn. To accomplish this technology in realtime, the process needed to be ported to the GPU.

With this technology being processed by the GPU, this opens up new features for the developers, such as rendering 3D objects. This demo, though only 2D in nature, but using raycasting techniques similar to those found in the Wolfenstein 3D and Black Stone: Aliens of Gold video games, demonstrates how these concepts have been realized.


## FEATURES
The demo provides two "SCREEN" modes: Full color and indexed.

Starting with the palette mode, here is a screenshot showing a simple fragment shader being rendered with perceptual colors:

![image](/assets/images/Screenshot 2026-02-08 175009.png)

Pixelation happens in realtime, and here is a screenshot showing the same indexed image with larger pixels, using the *perceptual color* mode, which is procedurally generated in realtime:

![image](/assets/images/Screenshot 2026-02-08 175049.png)

The second enbedded color palette is based on the Apple IIe green monochrome monitors:

![image](/assets/images/Screenshot 2026-02-08 175117.png)

The third embedded color palette is based on the Apple IIc green monochrome monitors:

![image](/assets/images/Screenshot 2026-02-08 175124.png)

The fourth embedded color palette is based on the dark-amber, monochrome monitors for IBM PCs.

![image](/assets/images/Screenshot 2026-02-08 175136.png)

The fifth embedded color palette is based on the medium-amber monochrome monitors for the IBM PCs.

![image](/assets/images/Screenshot 2026-02-08 175130.png)

The sixth embedded color palette is based on the 256-color VGA screen modes.

![image](/assets/images/Screenshot 2026-02-08 175143.png)

The number of index colors can be reduced in realtime, and the following screenshot shows the fragment shader in the 16-color VGA screen modes.

![image](/assets/images/Screenshot 2026-02-08 175215.png)

The seventh embedded color palette is for Color Theory, and there are seven schemes of this mode. The first scheme is *Monochromatic*:<br>
```
offsets = { 0.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175302.png)

The second scheme is *Split Complementary*:<br>
```
offsets = { 0.0f, 150.0f, 210.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175311.png)

The third scheme is *Triadic*:<br>
```
offsets = { 0.0f, 120.0f, 240.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175327.png)

The fourth scheme is *Analogous*:<br>
```
offsets = { -60.0f, -30.0f, 0.0f, 30.0f, 60.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175335.png)

The fifth scheme is *Diad*:<br>
```
offsets = { 0.0f, 180.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175344.png)

the sixth scheme is *Square*:<br>
```
offsets = { 0.0f, 90.0f, 180.0f, 270.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175352.png)

The seventh scheme is *Tetradic*:<br>
```
offsets = { 0.0f, 60.0f, 180.0f, 240.0f }
```

![image](/assets/images/Screenshot 2026-02-08 175401.png)

The eighth embedded color palette is muted Teal.

![image](/assets/images/Screenshot 2026-02-08 175425.png)

The ninth embedded color palette is Vermilion.

![image](/assets/images/Screenshot 2026-02-08 175432.png)

The tenth embedded color palette is grayscale.

![image](/assets/images/Screenshot 2026-02-08 175437.png)

The fragment shader effect was just the first layer rendered by the demo. The second layer is the raycasting demo.

![image](/assets/images/Screenshot 2026-02-08 175531.png)

Dropping the pixelation size back down to 1x1, the is plenty of room for higher-resolution graphics.

![image](/assets/images/Screenshot 2026-02-08 175538.png)

What good is a raycasting video game without a GUI system? Well, this demo provides a fourth layer just for that feature.

![image](/assets/images/Screenshot 2026-02-08 175556.png)

The GUI system even provides a large-map view with legend.

![image](/assets/images/Screenshot 2026-02-08 175609.png)

The large map can be zoomed in and out with the mouse scroll wheel.

![image](/assets/images/Screenshot 2026-02-08 175634.png)
![image](/assets/images/Screenshot 2026-02-08 175723.png)

There are three CRT modes in the demo.

![image](/assets/images/Screenshot 2026-02-08 175733.png)
![image](/assets/images/Screenshot 2026-02-08 175740.png)
![image](/assets/images/Screenshot 2026-02-08 175747.png)

These CRT modes affects all layers.

![image](/assets/images/Screenshot 2026-02-08 175757.png)
![image](/assets/images/Screenshot 2026-02-08 175811.png)
![image](/assets/images/Screenshot 2026-02-08 175909.png)
![image](/assets/images/Screenshot 2026-02-08 175935.png)

There are doors, doors with windows, and windows.

![image](/assets/images/Screenshot 2026-02-08 180144.png)
![image](/assets/images/Screenshot 2026-02-08 180144.png)
![image](/assets/images/Screenshot 2026-02-08 180306.png)

The current game map is 512x1024 in size. This is for testing puposes, but nowhere near close to a stress test, if that is even possible for raycasting games. Since this map represents a starship of sorts, you can have very large rooms.

![image](/assets/images/Screenshot 2026-02-08 180318.png)

The game demo also allows for sprites, which can be used for assets and NPCs.

![image](/assets/images/Screenshot 2026-02-08 180332.png)

Decreasing the alpha channel for the game layer, can lead to fascinating effects.

![image](/assets/images/Screenshot 2026-02-08 180517.png)

The minimaps in the previous screenshots show a green triangle that represents the player on the map. But, the colors change from green (100% health) to a yellow, as health decreases. To show the players health is not 100%, a thrid layer was added that shows a pulsating, red vignette.

![image](/assets/images/Screenshot 2026-02-08 180605.png)

As the health moves towards 1%, the players triangle fades to red and the vignette gets larger.

![image](/assets/images/Screenshot 2026-02-08 180635.png)

When the players health reaches 0%, the triangle becomes dark red.

![image](/assets/images/Screenshot 2026-02-08 180651.png)

## FINAL CONCLUSION
My hope is that this demo helps you create some amazing things.

**THANK YOU**
Walter W. Whitman
The Joyful Programmer (tm)
AstroCosmic Systems (tm)