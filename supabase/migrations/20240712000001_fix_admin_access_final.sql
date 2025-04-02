-- Fix admin access by directly setting super admin flag
UPDATE public.users
SET is_super_admin = true
WHERE email = 'rajan.knm18@gmail.com';

-- If user doesn't exist in public.users, create it
INSERT INTO public.users (id, email, is_super_admin, token_identifier, created_at)
SELECT 
    id, 
    email, 
    true, 
    id::text,
    NOW()
FROM auth.users
WHERE 
    email = 'rajan.knm18@gmail.com'
    AND NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.users.id);