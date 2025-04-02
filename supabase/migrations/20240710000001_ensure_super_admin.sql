-- Ensure the super admin flag is set correctly
DO $$
BEGIN
    -- Update the is_super_admin flag for the specified user
    UPDATE public.users
    SET is_super_admin = true
    WHERE id IN (
        SELECT id FROM auth.users
        WHERE email = 'rajan.knm18@gmail.com'
    );

    -- If no rows were updated, the user might not exist yet
    -- This can happen if the auth user exists but the public user doesn't
    IF NOT FOUND THEN
        -- Check if the auth user exists but not the public user
        INSERT INTO public.users (id, is_super_admin)
        SELECT id, true
        FROM auth.users
        WHERE email = 'rajan.knm18@gmail.com'
        AND NOT EXISTS (
            SELECT 1 FROM public.users WHERE id = auth.users.id
        );
    END IF;

END $$;