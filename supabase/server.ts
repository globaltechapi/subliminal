import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/cookies";

// Helper function to check if we're in a Server Action or Route Handler context
const isServerActionOrRouteHandler = () => {
  try {
    // This will throw an error if we're not in a Server Action or Route Handler
    cookies();
    return true;
  } catch (error) {
    return false;
  }
};

// Create a cookie store that works in all contexts
const createSafeCookieStore = () => {
  const isValidContext = isServerActionOrRouteHandler();

  return {
    getAll() {
      try {
        if (!isValidContext) return [];
        const cookieStore = cookies();
        return cookieStore.getAll().map(({ name, value }) => ({
          name,
          value,
        }));
      } catch (error) {
        console.warn("Unable to access cookies in current context");
        return [];
      }
    },
    // We don't implement setAll here as it will be overridden in createClient
    // This prevents accidental cookie setting in invalid contexts
    setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
      // This is intentionally a no-op as the actual implementation
      // will be provided in createClient
      return;
    },
  };
};

export const createClient = async () => {
  const safeCookieStore = createSafeCookieStore();
  const isValidContext = isServerActionOrRouteHandler();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => safeCookieStore.getAll(),
        // Only attempt to set cookies if we're in a valid context
        setAll: (cookiesToSet) => {
          if (!isValidContext) {
            // Silently return without attempting to set cookies
            return;
          }
          try {
            // Create a new cookies() instance to ensure we're in the right context
            const cookieStore = cookies();
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch (error) {
            // Log error but don't throw to prevent app crashes
            console.warn("Unable to set cookies in current context");
          }
        },
      },
    },
  );
};
