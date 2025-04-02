-- Make the specific user a super admin
UPDATE users
SET is_super_admin = TRUE
WHERE email = 'rajan.knm18@gmail.com';
