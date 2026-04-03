import { supabase } from './supabaseClient';

// Course definitions
export const COURSES = {
  AUTONOMOUS_NP: 'autonomous-np',
  PRIMARY_CARE_SETUP: 'primary-care-setup'
};

export const COURSE_NAMES = {
  [COURSES.AUTONOMOUS_NP]: 'How to become an Autonomous Nurse Practitioner',
  [COURSES.PRIMARY_CARE_SETUP]: 'How to set up Primary Care'
};

/**
 * Get course access for the current user
 * @returns {Promise<Object>} Object with course_id as keys and boolean access as values
 */
export async function getUserCourseAccess() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return {};

  const { data, error } = await supabase
    .from('user_course_access')
    .select('course_id, has_access')
    .eq('user_id', user.id);

  if (error) {
    console.error('Error fetching course access:', error);
    return {};
  }

  // Convert array to object for easier access
  const accessMap = {};
  data.forEach(record => {
    accessMap[record.course_id] = record.has_access;
  });

  return accessMap;
}

/**
 * Check if user has access to a specific course
 * @param {string} courseId - The course ID to check
 * @returns {Promise<boolean>} True if user has access, false otherwise
 */
export async function hasCourseAccess(courseId) {
  const access = await getUserCourseAccess();
  return access[courseId] === true;
}

/**
 * Grant access to a course for the current user
 * @param {string} courseId - The course ID to grant access to
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function grantCourseAccess(courseId) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error('Auth error:', authError);
      return false;
    }

    if (!user) {
      console.error('No authenticated user found');
      return false;
    }

    console.log('Granting access for user:', user.id, 'to course:', courseId);

    const { data, error } = await supabase
      .from('user_course_access')
      .upsert({
        user_id: user.id,
        course_id: courseId,
        has_access: true,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,course_id' })
      .select();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return false;
    }

    console.log('Successfully granted course access, result:', data);
    return true;
  } catch (err) {
    console.error('Unexpected error in grantCourseAccess:', err);
    return false;
  }
}

/**
 * Revoke access to a course for the current user
 * @param {string} courseId - The course ID to revoke access from
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function revokeCourseAccess(courseId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { error } = await supabase
    .from('user_course_access')
    .upsert({
      user_id: user.id,
      course_id: courseId,
      has_access: false,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,course_id' });

  if (error) {
    console.error('Error revoking course access:', error);
    return false;
  }

  return true;
}

/**
 * Initialize course access for a new user (grant access to all courses by default)
 * @param {string} userId - The user ID to initialize
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function initializeUserCourseAccess(userId) {
  const courses = Object.values(COURSES);

  // First check if user already has course access records
  const { data: existingRecords, error: checkError } = await supabase
    .from('user_course_access')
    .select('course_id')
    .eq('user_id', userId);

  if (checkError) {
    console.error('Error checking existing course access:', checkError);
    return false;
  }

  // If user already has records, no need to initialize
  if (existingRecords && existingRecords.length > 0) {
    return true;
  }

  // Initialize course access for new user
  const records = courses.map(courseId => ({
    user_id: userId,
    course_id: courseId,
    has_access: false // Start with no access, can be granted later
  }));

  const { error } = await supabase
    .from('user_course_access')
    .insert(records);

  if (error) {
    console.error('Error initializing course access:', error);
    return false;
  }

  return true;
}