# Wingz Driver App

Develop a simple ride-sharing driver mobile application using React Native that allows drivers to view nearby ride requests and accept or decline them.

## 🧐 Features

- Home: Displays the map with nearby ride requests allows viewing ride details and accepting or declining rides.
- Activity: Shows recent ride activity and ongoing rides.
- Onboarding: Simple onboarding process for new users

## 🛠️ Installation Steps:

### 1. Clone the repository

```
git clone git@github.com:edwardaldrincastro/wingz-driver.git
```

### 2. Install dependencies (preferred yarn)

```
yarn
```

### 3. Install pods (for iOS)

```
yarn install:pods
```

### 4. Start the JSON-Server

```
yarn start:json-server
```

or (when using your physical device)

```
yarn start:json-server-wifi
```

##### If you want to use your physical device, you must need to use the IP address of your machine and update the **start:json-server-wifi** script and the **baseUrl** in **ridesApiSlice.ts**.

### 5. Run the app

For iOS:

```
yarn ios
```

For Android

```
yarn android
```

##### If you want to reset the DB, you can discard the **db.json** file in your git changes or you can use the script below

```
yarn reset-db

```

## 💻 Built with

Technologies used in the project:

- React Native
- TypeScript
- Redux Toolkit
- RTK Query
