## Next.js 14+ practice for NextJS

This is a [Next.js](https://nextjs.org/) big practice for NextJS built with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

### Overview

- [VHA](https://docs.google.com/document/d/1r8h1djOR2VNbIaVsH2V63S-ryJvfQVEI7SAft9D6vuM/edit) Next.js Medical Dashboard Plan
- Refer the detailed design here: [Medical-dashboard](<https://www.figma.com/design/x7FFxxP8LceboLNxMiHU50/Medical-Dashboard-Web-(Community)?node-id=1-17937&node-type=FRAME&t=aV64V94sX5QDt2Oo-0>).

### Timeline

- 4-5 weeks

### Targets

- Support dark/light mode

- User can register new account

- User can login with created account

- User can see main dashboard (Skip all charts)

- User can see a list of Chemists

  - User can add/search/edit/delete a chemist

- User can see a list of Appointments (UI the same as list in Statistics tab)

  - User can add/search/edit/delete a appointment

  - User can see notification for upcoming appointments

### Technical Stack

- Next [v14.2.5]

- React [v18.3.1]

- Typescript [v5.5.4]

- Storybook [v8.1.2]

- TailwindCss [v3.4.10]

- [React Hook Form](https://react-hook-form.com/)

- [Zustand](https://github.com/pmndrs/zustand)

- [Zod](https://zod.dev/)

- [Strapi](https://strapi.io/)

- [NextUI](https://nextui.org/)

### Features

This practice for NextJS includes:

- ⚡ [Next.js](https://nextjs.org/) with App Router support
- 🔥 Type checking [TypeScript](https://www.typescriptlang.org/)
- 💎 Integrate with [Tailwind CSS](https://tailwindcss.com/)
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) for efficiently merge Tailwind CSS classes without style conflicts
- ✅ Strict Mode for TypeScript and React 18
- 📏 Linter with [ESLint](https://eslint.org/)
- 💖 Code Formatter with [Prettier](https://prettier.io/)
- 🦊 [Husky](https://github.com/typicode/husky) for Git Hooks
- 🚫 [Lint-staged](https://github.com/lint-staged/lint-staged) for running linters on Git staged files
- 🦺 Unit Testing with Jest and React Testing Library
- ☂️ Code coverage with [V8](https://v8.dev/blog/javascript-code-coverage)
- 🎉 Storybook for UI development

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v18.18.2+](https://nodejs.org/en/download/package-manager)
- [pnpm 9.1.2+](https://pnpm.io/installation)

- **Note:**:
  - Please add `.env` into root of project source code, refer `.env.sample`.

**clone** then use in your project

Check and update config image hosting on `next.config.mjs` file follow [Next.js document](https://nextjs.org/docs/messages/next-image-unconfigured-host)

### Get source code

| Command                                                                           | Action                      |
| :-------------------------------------------------------------------------------- | :-------------------------- |
| `$ git clone https://gitlab.asoft-python.com/thang.hoquang/medical-dashboard.git` | Clone Repository with HTTPS |
| `$ git clone git@gitlab.asoft-python.com:thang.hoquang/medical-dashboard.git`     | Clone Repository with SSH   |
| `$ cd medical-dashboard`                                                          | Redirect to folder          |
| `$ git checkout dev`                                                              | Checkout into "dev" branch  |

### Build and Run app

| Command            | Action                                     | Port                  |
| :----------------- | :----------------------------------------- | :-------------------- |
| `$ pnpm install`   | Install packages dependencies              | N/A                   |
| `$ pnpm build`     | Build app with optimized production mode   | N/A                   |
| `$ pnpm start`     | Starts the application in production mode. | http://localhost:3000 |
| `$ pnpm dev`       | Run the app in development mode            | http://localhost:3000 |
| `$ pnpm storybook` | Run Storybook.                             | http://localhost:6006 |
| `$ pnpm test`      | Run Unit Test                              | N/A                   |
| `$ pnpm coverage`  | Generate code coverage                     | N/A                   |

### Project structure

```shell
.
├── README.md                       # README file
├── .github                         # Github action configuration
├── .gitlab                         # Gitlab merge request configuration
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── .vscode                         # VSCode configuration
├── patches                         # Patch package file
├── public                          # Public assets folder
├── src
│   ├── actions                     # Next.js actions
│   ├── app                         # Next.js App (App Router)
│   ├── components                  # React components
│   ├── config                      # Configuration of libraries
│   ├── constants                   # App constants
│   ├── context                     # App context
│   ├── features                    # Feature components
│   ├── hocs                        # Higher order components
│   ├── hooks                       # Custom hooks
│   ├── icons                       # Icons folder
│   ├── mocks                       # App mock data
│   ├── types                       # Model type definitions
│   ├── services                    # Handle data with API: GET, POST, PUT, DELETE
│   ├── types                       # Type definitions
│   ├── themes                      # Custom tailwindCSS styles
│   ├── utils                       # Utilities folder
├── .editorconfig                   # Editor configuration
├── .env.sample                     # Env sample
├── .env.test                       # Env using for testing
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # git ignore file
├── .lintstagedrc                   # Lint-stage
├── .prettierrc                     # Prettier configuration
├── commitlint.config.js            # Commitlint configuration
├── jest.config.ts                  # Jest configuration
├── jest.setup.ts                   # Jest setup
├── next.config.mjs                 # Next.js configuration
├── next.config.mjs                 # Next.js configuration
├── postcss.config.mjs              # Post CSS configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── pnpm-lock.yaml
└── package.json
```

## Maintainers

### Team size

- 2 Developer:

  - [Thang Ho Quang](mailto:thang.hoquang@asnet.com.vn), Slack: thang.hoquang

### Task Management

- [GitLab issue board](https://gitlab.asoft-python.com/thang.hoquang/medical-dashboard/-/boards)

### Responsibilities

- Reviewing and merging pull requests.

- Managing and responding to issues.

- Updating project documentation.

- Ensuring the project is up-to-date with the latest standards and practices.

### Availability

Thang is typically available during weekdays and aims to respond to issues and pull requests within 48 hours. For urgent matters, please email directly.

#### Setup Api on local

- Clone this repo: https://github.com/thanghoquang-agilityio/medical-dashboard-api
- Run command pnpm i
- Create an .env file with following sample:

```
  HOST=
  PORT=
  APP_KEYS=
  API_TOKEN_SALT=
  ADMIN_JWT_SECRET=
  TRANSFER_TOKEN_SALT=
  # Database
  DATABASE_CLIENT=
  DATABASE_FILENAME=
  JWT_SECRET=
```

- Get the env value in [here](https://drive.google.com/file/d/152oDSQ9kp8BUxj7w--5x2oADeR6MY9Uh/view?usp=sharing).
- Run pnpm develop
- Open admin panel and register an admin account
- Create an API token and replace it with the NEXT_PUBLIC_AUTH_TOKEN in web app
- Go to **Settings** -> **API Tokens** and choose your token to set permissions : allow all access for **Chemist**, **Specialty**, **Upload**, **Users-permissions**.
- Go to **Settings** -> **Users & Permissions plugin** -> **Roles** and set permissions:
  - Allow all access for admin role
  - Limit permissions for normal user
    - Can not _delete_ and _updateUnpublished_ for **Appointment**
    - Can not _delete_, _update_, _create_ and _updateUnpublished_ for **Chemist**
    - Can only _find_ and _findOne_ for **Specialty**
- Go to **Settings** -> **Users & Permissions plugin** -> **Advanced settings** and set default role for authenticated users to **Normal User**
