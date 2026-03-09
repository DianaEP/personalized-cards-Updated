# Notes on the updated expo SDK version for Personalized Cards Project👋

This repository contains the updated working version of the original Personalized Cards project, migrated to a newer Expo SDK in order to restore compatibility with current tooling.

- **Original version:** includes the original development timeline and initial implementation 
[View Original Project] (https://github.com/DianaEP/personalized-cards)


## Compatibility adjustments in this version

- **Permanent file storage was removed from the image save flow.**
In the original implementation, generated images were moved to persistent storage after capture. In the updated Expo SDK environment, this approach became unreliable due to changes in file system APIs and platform restrictions, especially on iOS.
The current version keeps and uses the generated image URI directly from the temporary cache.

- **Color picker is currently disabled.**
The original color picker implementation relied on dependencies that became incompatible after upgrading Expo and related animation packages.

- **Color switching for overlays/text is limited in this version.**
Because of the same dependency compatibility issues affecting the color picker, dynamic color controls are not fully available in the updated build.

## Purpose of this repository

The goal of this version is to preserve the core project functionality under a modern Expo environment while keeping the original project structure and editing flow operational.

