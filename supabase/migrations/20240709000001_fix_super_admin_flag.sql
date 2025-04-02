-- Check if the users table exists
DO $$
BEGIN
    -- Update the is_super_admin flag for the current user
    -- This assumes you're logged in with the account that should be a super admin
    UPDATE public.users
    SET is_super_admin = true
    WHERE id IN (
        SELECT id FROM auth.users
        WHERE email = 'rajan.knm18@gmail.com'
    );

    -- Enable realtime for the users table if not already enabled
    -- Check if the table is already part of the publication before adding it
    IF NOT EXISTS (
        SELECT 1 FROM pg_publication_tables 
        WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = 'users'
    ) THEN
        ALTER PUBLICATION supabase_realtime ADD TABLE users;
    END IF;

END $$;