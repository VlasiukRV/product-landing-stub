#  Astro Platform

A monorepo platform designed to manage multiple Astro-based websites, served via Docker and Nginx.

## Project Structure
- `/projects`: Source code for each individual website.
- `/nginx`: Nginx configuration files.

---

## 1. Development Mode
Use this mode for local development with HMR (Hot Module Replacement) enabled for a specific site.

### How to run:
Set the `SITE_NAME` environment variable to the folder name of your project (located in `/projects`):

```bash

# Example for a specific site
export SITE_NAME=auto-body-shop
docker-compose up dev-server
```
The site will be available at: `http://localhost:4321`

## 1. Production Mode

In this mode, all projects are built via `npm run build:all`. Files are copied into the Nginx container, which serves them over ports `8091–8097`.

### Building and Running:

````bash

# 1. Build the production image (no cache ensures a fresh build)
docker-compose build nginx-prod --no-cache

# 2. Start the production containers
docker-compose up nginx-prod -d
````

| Port  | Site Name          | Source Path                     |
|-------|------------------|--------------------------------|
| 8091  | Owl Solution      | /owl-solution                  |
| 8092  | Dynamic UI        | /dynamic-ui-bridge             |
| 8093  | Speech Translator | /real-time-speech-translator   |
| 8094  | Vlasiuk.me        | /vlasiuk-me                    |
| 8095  | TSB Enterprise    | /tsb-enterprise                |
| 8096  | Olena Vlasiuk     | /olena-vlasiuk-me              |
| 8097  | Auto Body Shop    | /auto-body-shop                |