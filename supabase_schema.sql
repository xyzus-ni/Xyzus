-- Supabase Schema for Portfolio & Publication CMS
-- Tables: categories, projects, posts, profile, messages

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Categories
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT,
    description TEXT,
    tech JSONB DEFAULT '[]'::jsonb,
    cover TEXT,
    gallery JSONB DEFAULT '[]'::jsonb,
    video_url TEXT,
    repo_url TEXT,
    demo_url TEXT,
    status TEXT DEFAULT 'completed',
    featured BOOLEAN DEFAULT false,
    visible BOOLEAN DEFAULT true,
    "order" INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Posts (Blog / Karya Tulis / Paper)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    abstract TEXT,
    content TEXT,
    cover TEXT,
    attachments JSONB DEFAULT '[]'::jsonb,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    tags JSONB DEFAULT '[]'::jsonb,
    lang TEXT DEFAULT 'id',
    "references" TEXT,
    status TEXT DEFAULT 'draft', -- 'draft' or 'published'
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER DEFAULT 5,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Profile
CREATE TABLE IF NOT EXISTS public.profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    headline TEXT,
    bio TEXT,
    location TEXT,
    avatar TEXT,
    cv_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Contact Messages
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security) Setup
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
CREATE POLICY "Public can view categories" ON public.categories FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view visible projects" ON public.projects;
CREATE POLICY "Public can view visible projects" ON public.projects FOR SELECT USING (visible = true);

DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
CREATE POLICY "Public can view published posts" ON public.posts FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Public can view profile" ON public.profile;
CREATE POLICY "Public can view profile" ON public.profile FOR SELECT USING (true);

-- Public can submit messages (Insert only)
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.messages;
CREATE POLICY "Public can insert contact messages" ON public.messages FOR INSERT WITH CHECK (true);
