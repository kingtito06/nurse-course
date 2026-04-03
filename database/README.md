# Database Setup Instructions

## Creating the User Course Access Table

To track which courses each user has access to, you need to create a table in your Supabase database.

### Option 1: Using Supabase Dashboard (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to the "SQL Editor" tab
4. Copy and paste the contents of `database/create_user_course_access.sql`
5. Click "Run" to execute the SQL

### Option 2: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
# Initialize Supabase in your project (if not already done)
supabase init

# Link to your remote project
supabase link --project-ref YOUR_PROJECT_REF

# Apply the migration
supabase db push
```

## Table Structure

The `user_course_access` table includes:
- `id`: Primary key (UUID)
- `user_id`: References `auth.users(id)` - links to the authenticated user
- `course_id`: String identifier for the course
- `has_access`: Boolean indicating if the user has access to the course
- `created_at` / `updated_at`: Timestamps

## Course IDs

Currently defined courses:
- `autonomous-np`: "How to become an Autonomous Nurse Practitioner"
- `primary-care-setup`: "How to set up Primary Care"

## Usage

After creating the table, you can use the utility functions in `lib/courseAccess.js` to:
- Check if a user has access to a course
- Grant or revoke course access
- Initialize course access for new users

## Next Steps

1. Run the SQL script to create the table
2. Update your signup/authentication flow to call `initializeUserCourseAccess()` for new users
3. Use `hasCourseAccess()` in your course pages to control access
4. Implement a way to grant course access (e.g., after purchase, admin panel, etc.)