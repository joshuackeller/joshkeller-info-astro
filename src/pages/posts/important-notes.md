---
layout: "../../layouts/BlogLayout.astro"
title: Important Notes
description: Random notes about different parts of the codebase
---

### Variable Naming Conventions
I'm not totally set on how to name all variables, but here are a couple guiding principles.
- PostgreSQL doesn't support capitalized letters and thus discourages camel case (ex: varName). For now, we should always use snake case (ex: var_name) when creating database table and column names.
- Apparently the creators of React and Postgres didn't get along because React only used camel case (ex: useState, useEffect). For that reason most of the time I write functions and variable names in a React, it's in camel case. I do break this rule from time to time so variable names reflect their column name in the SQL databse.
- In general I don't like snake case function names, so even in the backend I define function names using camel case. When working with regular variables, I'll often use snake case. 


### Requests
All requests are sent with an `Authorization` header and an `Organization` header. This can be found in the useEmpleoApi.ts file.
![Code Screenshot](/code/useEmpleoApi.png)

### Authentication
Authentication starts when a user signs in. The backend returns a token called a [JWT](https://jwt.io/). That JWT contains the ID of the user that is currently logged in. When the frontend receives the token, it is stored in local storage. (Local storage is a standard Javascript / Web API that allows you to store values in the browser. In the previous screen shot you can see the code for retrieving that token from local storage. You can actually see all local storage values for any website you visit if you open the Inspect window, go to Application, and select Local Storage.) 
![Local Storage](/code/localStorage.png)
It's important to note that this token doesn't really do anything on the frontend. The frontend only checks to make sure a token exists, then sends that token in requests to the backend. The backend verifies that the JWT is legitimate with this code:
![Auth Middleware](/code/AuthMiddleware.png)
If you look around the empleo-api repository you'll notice the `AuthMiddleware` function used in many places. Here's one example in /api/admin/self/index.ts
![Auth Middleware Exmpale](/code/AuthMiddlewareExample.png)
I'll break down what's going on:
1. `router.use()` runs `AuthMiddleware` to manipulate the request.
2. `AuthMiddleware` verifies thet JWT and assigns `req.admin_id` if successful.
3. `req.admin_id` can be used to safely query for an account because we know that the user with that id is querying for their account information.

### Authorization
When I refer to Authorization I'm refering to making sure an admin is actually part of an organization. Authorization works very similar to Authentication in terms of how it's happening in the code. When a user selects or creates an organization from the frontend, that organization ID is stored in local storage and sent with every request. The backend then uses a middleware function to verify that the admin is part of the organization. Here's an example of that that middleware function being used. Note `AuthMiddleware` still needs to be used in conjuction with `OrgMiddleware`.
![Org Middleware Example](/code/OrgMiddlewareExample.png)
The actual `OrgMiddleware` function is where Authorization starts to differ from Authentication. The Organization header sent with every request is just an ID in the form of a string. It's not a JWT like the authentication token. We can't rely on a JWT to tell us that an admin is part of an organization because an admin can be added to or removed from an organization at any time. We don't want rogue admin users running around with a JWT that gives them access to an organization that they've been removed from. 
For that reason `OrgMiddleware` checks the database every time to make sure the current admin is part of an organization. (Well it sort of checks every time, I'll explain more in just a little bit.)
![Org Middleware](/code/OrgMiddleware.png)
You might need to zoom into that image in another tab or open it in another window, but I'll explain what this function does.
1. Reads the `req.admin_id` that was validated and set in `AuthMiddleware`.
2. Creates an `admin_org_key`` that is just an admin ID and an organization ID combined together (ex: if the admin ID is 123 and the organization ID is 456 the combined ID would be 123-456). 
3. Checks a redis database to see if there is a key-value pair for the combined `admin_org_key`. 
4. If the key value pair doesn't exist in the redis database, it checks to make sure the admin is part of the organization by querying the SQL database.
5. If the admin isn't part of the organization, the prisma function will throw an error. If the admin is part of the organization, the `admin_org_key` is stored in the redis database.
6. After all this `req.organization_id` is set to the organization ID from the request header. At this point, the admin is authorized.

You might be wondering what's up with the redis database. Well a redis database is much faster than a SQL databse for this type of query. We're saving about 200-300 milliseconds on every query using this method, which is about a 30% - 50% improvement. It may not sound like much, but it will makes the website feel a lot faster.

<!-- (If you want to learn more about how JWTs work under the hood, [this video](https://www.youtube.com/watch?v=P2CPd9ynFLg) is really good.) -->

