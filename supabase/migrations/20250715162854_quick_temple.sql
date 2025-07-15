/*
  # Create users table for tutoring platform

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches auth.users id
      - `email` (text, unique) - user's email address
      - `username` (text, unique) - display name
      - `avatar_url` (text, optional) - profile picture URL
      - `subject` (text) - chosen subject (biology, physics, chemistry)
      - `subscription_plan` (text) - plan type (basic, premium, pro)
      - `progress` (integer) - learning progress percentage
      - `created_at` (timestamp) - account creation date
      - `updated_at` (timestamp) - last update date

  2. Security
    - Enable RLS on `users` table
    - Add policies for users to read and update their own data
    - Add policy for authenticated users to read basic user info

  3. Indexes
    - Index on email for faster lookups
    - Index on username for search functionality
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  username text UNIQUE NOT NULL,
  avatar_url text,
  subject text NOT NULL CHECK (subject IN ('biology', 'physics', 'chemistry')),
  subscription_plan text NOT NULL CHECK (subscription_plan IN ('basic', 'premium', 'pro')),
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_subject ON users(subject);
CREATE INDEX IF NOT EXISTS idx_users_subscription_plan ON users(subscription_plan);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();