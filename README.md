# Headshot Generator Tool by [Builderkit.ai](https://www.builderkit.ai)

`nextjs` `typescript` `astria` `supabase`

## Introduction

The AI Headshot Generator is a powerful tool designed to create high-quality AI-generated headshots using user-defined prompts. You can first fine tune a custom model with your own images and generate headshot in context to the trained model.

<a href="https://headshot-generator.builderkit.ai/home" target="_blank" rel="noopener">
  <picture>
    <img alt="Headshot Generator Tool" src="https://headshot-generator.builderkit.ai/github-cover.webp" />
  </picture>
</a>

## Features

- 💾 Fine-tune models with user-provided images.
- 🕵️ Generate AI headshots using detailed prompts.
- 🔄 Real-time updates and image generation status.
- 💻 User-friendly interface for input and generation management using Shadcn.
- 🔗 Secure user authentication with OAuth support.

## Quickstart Guide

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or pnpm or yarn `(npm for me)`

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/1811-Labs-LLC/BuilderKit-Pro.git [YOUR_APP_NAME]
   ```

   ```sh
   cd [YOUR_APP_NAME]

   git checkout headshot-generator
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ASTRIA_API_KEY=<your-astria-api-key>
   NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY=<your-google-analytics-key>
   ```

4. **Create Table in Supabase:**

   > #### To Create a Table in Supabase
   >
   > - Go to the **SQL editor** section
   > - Click **New Query**
   > - Enter the **SQL Script** provided below for the given table

   First, Create an User table if you have not created one already.

   _Email, full name and avatar url is auto synced with the auth table managed by supabase. Once user sign in through google or email, password. The User table gets synced with the new user data._

   ```sql
   -- Create a table for public users
   create table users (
      id uuid references auth.users on delete cascade not null primary key,
      created_at timestamp with time zone not null default now(),
      email text not null,
      full_name text null,
      avatar_url text null,
      constraint users_email_key unique (email)
   );

   -- Set up Row Level Security (RLS)
   alter table users
   enable row level security;

   create policy "Users can insert their own row." on users
   for insert with check (auth.uid() = id);

   create policy "Users can update own row" on users
   for update using (auth.uid() = id);

   create policy "Users can read own row" on users
   for select using (auth.uid() = id);

   -- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
   create function public.handle_new_user()
   returns trigger as $$
   begin
   insert into public.users (id, email, full_name, avatar_url)
   values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
   return new;
   end;
   $$ language plpgsql security definer;
   create trigger on_auth_user_created_trigger
   after insert on auth.users
   for each row execute procedure public.handle_new_user();
   ```

   **Now, create two tables Headshot Model, and Headshot Generation. The first one stores the fine tuned models, and the later stores the generated images.**

   ```sql
   -- Create a table for AI Headshot Generation

   -- Enum Type for Model Status
   create type headshotmodelstatus as enum ('processing', 'finished');

   -- Models Table
   create table headshot_models (
      id uuid not null default uuid_generate_v4 (),
      created_at timestamp with time zone not null default now(),
      user_id uuid not null,
      model_id text not null,
      name text not null,
      type text not null,
      images text[] not null,
      eta timestamp with time zone not null,
      trained_at timestamp with time zone null,
      expires_at timestamp with time zone null,
      status headshotmodelstatus not null default 'processing'::headshotmodelstatus,
      constraint headshot_models_pkey primary key (id),
      constraint headshot_models_model_id_key unique (model_id),
      constraint headshot_models_user_id_fkey foreign key (user_id) references users (id)
   );

   -- Set up Row Level Security (RLS)
   alter table headshot_models
   enable row level security;

   create policy "Users can insert their own row." on headshot_models
   for insert with check (auth.uid() = user_id);

   create policy "Users can update own row" on headshot_models
   for update using (auth.uid() = user_id);

   create policy "Users can read own row" on headshot_models
   for select using (auth.uid() = user_id);

   -- -- -- -- -- --

   -- Generations Table
   create table headshot_generations (
      id uuid not null default uuid_generate_v4 (),
      created_at timestamp with time zone not null default now(),
      user_id uuid not null,
      model_id text not null,
      generation_id text not null,
      prompt text not null,
      negative_prompt text null,
      image_urls text[] null,
      constraint headshot_generations_pkey primary key (id),
      constraint headshot_generations_user_id_fkey foreign key (user_id) references users (id),
      constraint headshot_generations_model_id_fkey foreign key (model_id) references headshot_models (model_id) on delete cascade
   );

   -- Set up Row Level Security (RLS)
   alter table headshot_generations
   enable row level security;

   create policy "Users can insert their own row." on headshot_generations
   for insert with check (auth.uid() = user_id);

   create policy "Users can update own row" on headshot_generations
   for update using (auth.uid() = user_id);

   create policy "Users can read own row" on headshot_generations
   for select using (auth.uid() = user_id);

   -- Enable Realtime
   alter publication supabase_realtime add table headshot_generations;
   ```

   > - **For Headshot Generation table, we are enabling Supabase Realtime (last line of the script)**
   > - **We are also creating enum for model status (first line of the script)**
   > - For all the tables, we enable the RLS policy by default with necessary permissions as mentioned in the script.

5. **Sync Supabase Types:**

   This will sync the table schema locally from Supabase. Run the below commands to login to supabase and sync the schema type.

   ```sh
   npx supabase login

   npx supabase init

   npx supabase gen types typescript --project-id [PROJECT_ID] --schema public > src/types/supabase.ts
   ```

   _To get the **PROJECT ID**, go to **Project Settings** in Supabase where you have created your project. You will find **Reference ID** under **General settings** section which is your Project ID._

### Running the Application

1. **Run the development server:**

   ```sh
   npm run dev
   ```

   This will start the development server on `http://localhost:3000`.

2. **Build for production:**

   ```sh
   npm run build
   ```

   This command compiles the application for production usage.

3. **Start the production server:**

   ```sh
   npm start
   ```

   This will start the application in production mode.

### Additional Scripts

- **Prepare Husky for Git hooks:**

  ```sh
  npm run prepare
  ```

- **Validate the code with Linting, Formatting & Typecheck:**

  ```sh
  npm run validate
  ```

## Requirements

- **Node.js**: Download and install from [here](https://nodejs.org/).
- **Supabase**: Create an account and a new project on [Supabase](https://supabase.com/). Obtain the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your project settings.
- **Astria API Key**: Get your api key by creating an account on [Astria](https://www.astria.ai/).

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.builderkit.ai/license) file for details.

## Contact

For any inquiries or issues, please open an issue on the [GitHub repository](https://github.com/1811-Labs-LLC/BuilderKit) or contact the author at [vatsal1811@gmail.com](mailto:vatsal1811@gmail.com).
