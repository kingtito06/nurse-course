# Nurse Course Platform

A comprehensive online learning platform for nurse practitioners to master autonomous practice management. This full-stack web application provides structured courses with interactive lessons and quizzes.

## 🎓 Features

- **User Authentication**: Secure sign-up and login using Supabase
- **Course Management**: Multiple courses with organized lessons
- **Interactive Lessons**: Rich content with embedded quizzes
- **Progress Tracking**: Database-driven course access and completion tracking
- **Responsive Design**: Mobile-friendly interface with modern CSS
- **Dashboard**: Personalized learning hub showing accessible courses
- **Quiz System**: Interactive quizzes with pass/fail thresholds (70% required)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free tier is fine)
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nurse-course
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   - Create a free account at [supabase.com](https://supabase.com)
   - Create a new project
   - Note your Project URL and Anon Key

4. **Configure environment variables**
   - Copy `.env.local.example` (or create `.env.local` if it doesn't exist)
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_project_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
     ```

5. **Setup Database**
   - In Supabase, go to SQL Editor
   - Run the SQL script from `database/create_user_course_access.sql`
   - This creates the necessary tables and Row Level Security (RLS) policies

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open in browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Courses

### How to Become an Autonomous Nurse Practitioner (autonomous-np)

A 6-lesson comprehensive course covering:

1. **Lesson 1: NP Fundamentals** - Introduction to autonomous practice concepts
2. **Lesson 2: Licensure & Certification** - Requirements and credentials needed
3. **Lesson 3: Legal & Regulatory Compliance** - Laws and malpractice insurance
4. **Lesson 4: Clinical Practice Management** - Managing patients and protocols
5. **Lesson 5: Financial & Business Planning** - Business structure and finances
6. **Lesson 6: Building Your Practice** - Integration and launch strategies

Each lesson includes:
- Detailed topic content
- 5-question interactive quiz
- 70% pass requirement to progress
- Navigation to next lesson

## 🏗️ Project Structure

```
nurse-course/
├── app/
│   ├── components/           # React components
│   │   ├── NavBar.jsx       # Navigation bar with auth
│   │   └── Footer.jsx       # Footer component
│   ├── courses/             # Course content
│   │   ├── autonomous-np/
│   │   │   ├── page.jsx     # Course overview
│   │   │   └── lesson-*/    # Individual lessons
│   │   └── page.jsx         # Courses listing
│   ├── dashboard/           # User dashboard
│   ├── pricing/             # Pricing and enrollment
│   ├── signup/              # Authentication
│   ├── about/               # About page
│   ├── layout.jsx           # Root layout with metadata
│   ├── page.jsx             # Home page
│   ├── globals.css          # Global styles
│   └── styles/              # CSS modules
│       ├── palette.css      # Design tokens (colors, spacing, etc.)
│       ├── global.css       # Global styles
│       ├── navbar.css       # Navigation styling
│       ├── footer.css       # Footer styling
│       ├── hero.css         # Hero section
│       ├── auth.css         # Authentication forms
│       ├── pricing.css      # Pricing page
│       ├── cards.css        # Card components
│       ├── lessons.css      # Lesson content
│       └── about.css        # About page
├── lib/
│   ├── supabaseClient.js    # Supabase setup
│   └── courseAccess.js      # Database utilities
├── database/
│   ├── create_user_course_access.sql  # Database schema
│   └── README.md            # Database documentation
├── public/                  # Static assets
├── package.json
├── jsconfig.json
└── next.config.mjs
```

## 🗄️ Database Schema

### user_course_access Table

```sql
CREATE TABLE user_course_access (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  course_id TEXT,
  has_access BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  UNIQUE(user_id, course_id)
);
```

**RLS Policies**: Full access restricted to authenticated users' own records

## 🔒 Authentication Flow

1. User signs up/logs in via `/signup`
2. Supabase handles authentication
3. On signup, all courses are initialized as `has_access=false`
4. User clicks "Start Free Course" on pricing page
5. Course access is granted and set to `has_access=true`
6. User can now access course lessons via dashboard

## 🎨 Design System

The app uses CSS custom properties (variables) defined in `palette.css`:

### Colors
- **Primary**: `#1D40A4` (Dark blue) - Headers, navigation
- **Accent**: `#149CAC` (Teal) - Buttons, links, highlights
- **Text**: `#374551` (Dark gray) - Body text
- **Success/Error/Warning**: Status indicators

### Spacing & Typography
- Consistent spacing scale (xs, sm, md, lg, xl, 2xl)
- Font variables for sizes and weights
- CSS transitions for smooth animations

## 📱 Responsive Design

- **Desktop**: Full navigation with all elements visible
- **Tablet (768px-1024px)**: Optimized layouts with stacked cards
- **Mobile (<768px)**: Single column layouts, compact navigation

All CSS files include media queries for mobile optimization.

## 🔐 Security Notes

- **Row Level Security (RLS)**: Database policies restrict data access
- **Authentication**: Supabase handles secure auth with email verification
- **Protected Routes**: Course lessons redirect to login if not authenticated
- **CORS**: Configured for Supabase integration
- **Environment Variables**: Sensitive keys in `.env.local` (never committed)

## ⚙️ Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Deploy to GitHub Pages (if configured)
npm run deploy
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4.6, React 19.1.0
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: CSS3 with custom properties
- **Deployment**: Vercel (recommended), GitHub Pages, or self-hosted

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### GitHub Pages

```bash
npm run build
npm run deploy
```

### Self-Hosted

1. `npm run build`
2. `npm start` or use process manager (PM2, systemd, etc.)

## 📖 Usage Guide

### For Students

1. Visit the home page and click "Start Learning"
2. Click "Start Free Course" to enroll in Autonomous NP course
3. Access lessons through your dashboard
4. Complete quizzes (must score 70% to progress)
5. Navigate through all 6 lessons

### For Administrators

1. View `.env.local` for Supabase credentials
2. Access Supabase dashboard to manage courses
3. Update course content by editing lesson pages in `app/courses/*/`
4. Monitor user progress in Supabase database

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 🌟 Future Enhancements

- [ ] Course completion certificates
- [ ] Progress analytics dashboard
- [ ] Discussion forums
- [ ] Video content integration
- [ ] Offline mode support
- [ ] Mobile app (React Native)
- [ ] Payment integration for premium courses
- [ ] Email notifications

## 📝 License

This project is licensed under the MIT License.

## 💬 Support

For issues, questions, or feature requests:
- Check existing GitHub issues
- Create a new issue with detailed description
- Contact: support@nursecourse.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Database hosted on [Supabase](https://supabase.com)
- Icons and inspiration from the nursing education community

---

**Made with ❤️ for nurse practitioners pursuing autonomy and excellence in practice.**
