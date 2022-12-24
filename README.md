# 📰 Herald

A simple news website that requires the user to pay a subscription in order to view articles. It incorporates third-party services to handle content management, payments, and authentication.

This is a finalized proof-of-concept that was developed over the course of two weeks in December of 2022.

## 🎯 Justification

This project does not address any practical problem, but it is an interesting proof-of-concepts and opportunity to work with several different third-party services to build a fully functional application. I wanted an opportunity to try different services to implement common use-cases such as content management, payments, backend as a service, and social authentication. Herald is an aggregator of such services, and a illustrates a concept on where you would implement all these services tofether.

In other words, I built Herald because I thought it could be an interesting challenge, not because it has some practical application to my life.

## 💻 Project Demo   

#### Subscribed User Use-case

https://user-images.githubusercontent.com/53352488/209422366-e258b3fa-7b32-493c-a09e-48d09e04543a.mp4

#### Unsubscribed User Use-case

https://user-images.githubusercontent.com/53352488/209422540-65e22c11-6815-4644-8afd-c0e2a595b237.mp4

## 🚀 Technology Stack

- [Next.js](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://www.supabase.com/)
- [Stripe](https://stripe.com/)
- [Hygraph](https://hygraph.com/)
- [Apollo](https://www.apollographql.com/)
- [GraphQL](https://graphql.org/)
- [TailwindCSS](https://tailwindcss.com/)

Next.js is the main engine of this project and the framework of choice for building an SSR web app in React + TypeScript. Supabase provides our underlying back-end with its nice relational cloud database. Stripe is our payment services, and Hygraph our CMS powered by GraphQL.

### Trade-offs Considered

For the BaaS (Backend as a Service) provider, the original choice was Firebase; however, due to the complexity in the docs and how difficult would be to model the data using the non-relational data and Firestore, Supabase proved to be a very efficient alternative with virtually no losses. This choice was essentially based on preference.

The CMS portion of this project was the last to be implemented. At first I thought it would be the simplest service to add, since I had no problems in leveraging Prismic as a headless CMS in the past. I was surprised by how much Prismic has changed over the past years and setting up a simple blog was a hassle. Their new flows are also imcompatible with pnpm, so I decided to try something new. The other options for more tradiotional headless CMS were either paid or self-hosted, so I landed on Hygraph with its simplistic UI and service. It is still a headless CMS but its contents are served over GraphQL instead of the typical REST used by CMS such as strapi, prismic, contentful, etc.

## ⚙️ Setup Instructions

This project uses pnpm for dependency management. Follow the steps below to set up a local development environment.

Clone this repository:

```sh
git clone https://github.com/lucasamonrc/herald.git
```

Navigate to the repository and install project dependencies:

```sh
cd herald
pnpm i
```

Copy the `example.env` to a new file named `.env.local`

```sh
cp example.env .env.local
```

You will need to set up your own project secrets to have all services working. Once you do you can start the project:

```sh
pnpm build
pnpm start
```

## 🧑‍💻 Authors

- Lucas Castro ([@lucasamonrc](https://github.com/lucasamonrc)) | [lucasamonrc.dev](https://lucasamonrc.dev) 
