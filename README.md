# Notes on the updated expo SDK version for Personalized Cards Project👋

This repository contains the updated working version of the original Personalized Cards project, migrated to a newer Expo SDK in order to restore compatibility with current tooling.

- **Original version:** includes the original development timeline and initial implementation 
[View Original Project](https://github.com/DianaEP/personalized-cards)


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

## Getting Started

1. **Clone the Repository**

``` bash
 git clone https://github.com/DianaEP/personalized-cards-Updated.git
 cd personalized-cards-Updated

```


2. **Setup the Backend**

```bash

cd backend
npm install
npm start

```


3. **Setup the Frontend**

```bash

cd frontend
npm install
npm start

```


## ***Important Notes***
The app is designed to run on **Android Emulator**.
  - If testing on a **real device**, update the **API base URL** in axiosInstance with your IP Address:

```ts
  const axiosInstance = axios.create({
    baseURL: 'http://YOUR_IP_ADDRESS:5000',
    headers: {
      'Content-Type': 'application/json'
    }
  });

```
1. Open the terminal on your device and type:

```bash 

  ipconfig

```

2. Look for the IPv4 address in the output, which is your local IP address.

3. Replace **YOUR_IP_ADDRESS** with your local network IP.


