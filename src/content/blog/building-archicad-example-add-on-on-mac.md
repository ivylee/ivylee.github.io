---
title: Building Archicad Example Add-on on Mac
excerpt: How to get started with Archicad Add-ons on Mac.
publishDate: "2024-07-30"
tags:
  - Archicad
  - Mac
  - Xcode
  - CMake
---

One of my projects involves adding extra functionality to BIM software such as Archicad or Revit. I got started with Archicad because it supports Mac and it offers a demo version and several demo projects for me to learn and experiment. 

## Bootstrapping the Example Add-on

I found an old tutorial for building Archicad add-ons - [Getting started with Archicad Add-Ons](https://archicadapi.graphisoft.com/getting-started-with-archicad-add-ons). The command for generating an Xcode project on Mac resulted in a CMake error:

```bash
CMake Error at Tools/CMakeCommon.cmake:177 (set_target_properties):
  set_target_properties Can not find target to add properties to:
  /Users/ivy/.../APIDevKit-27
Call Stack (most recent call first):
  CMakeLists.txt:25 (GenerateAddOnProject)
```

Turns out the `addOnName` variable was not set.

I noticed another set of setup instructions within the [archicad-addon-cmake](https://github.com/GRAPHISOFT/archicad-addon-cmake) repository. I cloned the repository from scratch and tried the Python script, changed it to `python3` and the Archicad DevKit versions to `27` and `28`, and it worked well to generate a valid Xcode project:

```bash
$ git clone https://github.com/GRAPHISOFT/archicad-addon-cmake.git --recurse-submodules
$ python3 Tools/BuildAddOn.py --configFile config.json --acVersion 27 28
```

## Building the Xcode project

The Xcode project is located at `Build/ExampleAddOn/27/INT/ExampleAddOn.xcodeproj` and `Build/ExampleAddOn/28/INT/ExampleAddOn.xcodeproj`, one for each Archicad DevKit version.

Then I opened the first Xcode project in Xcode, clicked the build button, everything went smoothly, the bundle file is located in `Build/ExampleAddOn/27/INT/Debug/ExampleAddOn.bundle`.

## Testing the Example Add-on

To see the Add-on in action, I opened Archicad 27 in demo mode, opened [the Gino project](https://community.graphisoft.com/t5/Getting-started/Archicad-Sample-Projects/ta-p/304186). To load the add-on, go to `Options -> Add-on Manager…`.

![Screenshot 2024-07-30 at 9.54.35 AM.png](/archicad-27-add-on-manager.png)

Expand `EDIT LIST OF AVAILABLE ADD-ONS`, click `Add...`, then specify the bundle from the Xcode project. Somehow I had to restart Archicad to make the yellow warning sign icon disappear from the Add-on list. Then finally, in the `Options` menu the `Example AddOn Command...` shows up:

![Screenshot 2024-07-30 at 9.57.48 AM.png](/archicad-27-example-add-on-command.png)

It doesn’t do much other than showing a dialog with OK and Cancel buttons.

![Screenshot 2024-07-30 at 9.59.02 AM.png](/archicad-27-example-add-on-dialog.png)

But that’s a start! Now I can move on to build the extra functionalities. 🙂
