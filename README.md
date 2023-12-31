<!-- PROJECT LOGO -->
<a name="readme-top"></a>
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://i.ibb.co/HnfJK9t/Collectiv-Logo.png" alt="Logo">
  </a>
  <p align="center">
     <b>Your Sanctuary for Community Events!</b>
    <br />
    <a href="https://collectiv-fe-web.vercel.app/"><strong>Check out the Web App »</strong></a>
  </p>
    <img src="https://github.com/The-Mud-Koalas/collectiv-fe-web/assets/70852167/f602728c-e2aa-4f46-8479-f7b4160f0b3c"></img>
  <br/>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-collectiv">About Collectiv</a>
      <ul>
        <li><a href="#the-problem">The Problem</a></li>
        <li><a href="#our-vision">Our Vision</a></li>
        <li><a href="#our-mission">Our Mission</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#environment-setup">Environment Setup</a></li>
      </ul>
    </li>
    <li><a href="#running-the-project">Running the project</a></li>
    <li><a href="#conventions">Conventions</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>


## About Collectiv
### The Problem:
Active engagement of community members to initiatives and/or ongoing projects is an essential component of a healthy communal space. However, there exists several obstacles that can hinder this, especially in a youth-dominated campus community. Lack of awareness of suitable opportunities to contribute is an important factor that discourages youth from participating in these events (Volunteering Queensland, 2021). Furthermore, inability to connect people affiliated to a common cause deprives the members of motivation to participate (Culp III & Schwartz, 1999). Therefore, it is necessary to motivate these members to  contribute more proactively to their communal space through informing members of any initiatives and/or projects and providing a medium for community members to connect with others sharing a common interest.

### Our Vision:

***Create a healthy community where everyone feels inspired to contribute, where diversity is celebrated, and where shared interests unite us in making every communal space a better place for all.***

### Our Mission:

***Cultivate an interactive and self-sustaining community around a specific shared communal space which is inclusive and allows people with diverse perspectives to contribute.***

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![React Native][React-Native]][React-native-url]
* [![Expo][Expo]][Expo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

You can choose to fork or clone this repository before you get started with development. The following demonstrates how to do the latter:
  ```
  git clone https://github.com/The-Mud-Koalas/collectiv-fe-web.git
  ```
This will automatically create a `/collectiv-fe-web` directory which contains the contents of this repository. You can then open that directory using the IDE of your choice i.e Visual Studio Code.

### Environment Setup

1. Once you have opened the project folder in your preferred IDE, open up a command propmt and run the following commands in the root directory:
  ```
  npm install
  ```
  or with any package manager of your choice (`yarn`, `pnpm`, etc.). This will install all the necessary packages for the project to run.

2. Since this project uses authentication provided by [Firebase](https://firebase.google.com) and wraps a website inside a webview, we need to define several environment variables in our `.env` file, as shown below:

   ```
    EXPO_PUBLIC_APP_URL=XXXXXXXXXXXXXXXXXXXXXXXXXX
    EXPO_PUBLIC_BACKEND_URL=XXXXXXXXXXXXXXXXXXXXXXXXXX
    
    EXPO_PUBLIC_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    ```
    Learn more about [Firebase Authentication](https://firebase.google.com/docs/auth/)
<p align="right">(<a href="#readme-top">back to top</a>)</p>

>Note that `EXPO_PUBLIC_BACKEND_URL` should be the *url* of the [Collectiv Backend Application](https://github.com/The-Mud-Koalas/collectiv-be), and to run that locally, visit the repository for instructions. `EXPO_PUBLIC_FRONTEND_URL` is just the *url* of your local frontend server during development, in most cases its `http://localhost:3000`

### Running the project
If you followed all the environment setup steps correctly you should be able to run the application.

To run on the Expo Go app, run the following command:
```
npx expo start
```
Note that if you are using Expo Go, some functionalities, such as background location tracking and notifications might not work as expected.

To run on a device, you can run the following command for Android:
```
npx expo run:android -d
```

Or the following command for iOS:
```
npx expo run:ios
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
### Contact

The Mud Koalas  - themudkoalas@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React-query]: https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white
[React-query-url]: https://tanstack.com/query/v3/
[Django]: https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[Django-url]: https://www.djangoproject.com/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]:https://expo.dev/
[React-native]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-native-url]: https://reactnative.dev/
[React-hook-form]: https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white
[React-hook-form-url]: https://react-hook-form.com/
[Tailwind-css]: https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-css-url]: https://tailwindcss.com/
[Huggingface]: https://huggingface.co/datasets/huggingface/badges/resolve/main/powered-by-huggingface-light.svg
[Huggingface-url]: https://huggingface.co/
[Firebase]: https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white
[Firebase-url]: https://firebase.google.com/
