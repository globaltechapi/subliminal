-- Fix admin access by ensuring token_identifier is set correctly
DO $$
BEGIN
    -- Make sure the user has all required fields
    UPDATE public.users
    SET 
        is_super_admin = true,
        token_identifier = id::text,
        email = COALESCE(email, (SELECT email FROM auth.users WHERE id = public.users.id))
    WHERE id IN (
        SELECT id FROM auth.users
        WHERE email = 'rajan.knm18@gmail.com'
    );

    -- If the user doesn't exist in public.users but exists in auth.users, create it
    INSERT INTO public.users (id, email, is_super_admin, token_identifier)
    SELECT 
        id, 
        email, 
        true, 
        id::text
    FROM auth.users
    WHERE 
        email = 'rajan.knm18@gmail.com'
        AND NOT EXISTS (SELECT 1 FROM public.users WHERE id = auth.users.id);

END $$;