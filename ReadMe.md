# 🏗️ MEVN-Stack-Template

This is a simple template for building "MEVN" stack with authentication.

## 🛸 Deployment

it's simple you can deploy frontend and backend separately.

💻 **Frontend** you can choose render, vercel, netify etc...

🗃️ **Backend** you can choose render, vercel etc...

## 🤔 How to deploy frontend and backend together on [Render](https://render.com/) ?

💻 **Frontend**

1. set your website address in .env file

   example: `VITE_API_URI="https://mevn-deploy.onrender.com"`

2. run cmd `npm run build `
3. copy all files from **dist** folder on frontend then paste into **public** folder on backend

🗃️ **Backend**

1.  add your website address in allowed_origin.js file

    example:

    ```
    const origins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://192.168.1.13:5173",
    "http://localhost:5174",
    "http://192.168.1.13:5174",
    "https://mevn-deploy.onrender.com"
    ];
    export default origins;
    ```

2.  push all of your source code into github

☁️ **Render**

1. login > new > web service > build and deploy from a git repository
2. select your repo that you want to deploy > connet
3. input the information that render require and your enviroment variables

   example:

![Screenshot from 2023-10-10 23-34-38](https://github.com/u-sour/mevn-stack-template/assets/145416126/5771e1eb-5986-46de-b163-4762e17cdb83)

4. create web service then wait it until build successful

**That's it, congratulation** 🥳

## 🤔 Where should i start ?

go to backend and frontend folder and check ReadMe.md file.

😎 good luck, see you there.
