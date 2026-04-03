-- Create user_course_access table to track which courses each user has access to
CREATE TABLE IF NOT EXISTS user_course_access (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL,
  has_access BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Ensure one record per user-course combination
  UNIQUE(user_id, course_id)
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_course_access_user_id ON user_course_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_course_access_course_id ON user_course_access(course_id);

-- Enable Row Level Security (RLS)
ALTER TABLE user_course_access ENABLE ROW LEVEL SECURITY;

-- Create policy so users can only see their own course access records
DROP POLICY IF EXISTS "Users can view their own course access" ON user_course_access;
CREATE POLICY "Users can view their own course access" ON user_course_access
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own course access" ON user_course_access;
CREATE POLICY "Users can insert their own course access" ON user_course_access
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own course access" ON user_course_access;
CREATE POLICY "Users can update their own course access" ON user_course_access
  FOR UPDATE USING (auth.uid() = user_id);

-- Insert default course access for existing users (set to false initially)
-- Note: This will be run after users exist in the system
-- INSERT INTO user_course_access (user_id, course_id, has_access)
-- SELECT id, 'autonomous-np', false FROM auth.users
-- UNION ALL
-- SELECT id, 'primary-care-setup', false FROM auth.users;

-- Insert the two courses with default access (false) for all existing users
-- This query will be run separately after users are created