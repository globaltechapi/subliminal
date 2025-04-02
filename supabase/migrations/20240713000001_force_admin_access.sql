-- Force admin access for specific email
UPDATE public.users
SET is_super_admin = true
WHERE email = 'rajan.knm18@gmail.com';

-- Also update by ID if needed
UPDATE public.users
SET is_super_admin = true
WHERE id IN (
    SELECT id FROM auth.users
    WHERE email = 'rajan.knm18@gmail.com'
);