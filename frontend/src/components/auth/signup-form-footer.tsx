import Link from "next/link";

export function SignupFormFooter() {
  return (
    <div className="mt-6 flex items-center justify-center">
      <p className="text-sm text-muted-foreground font-light">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-[#FFFFFFBF] hover:underline hover:opacity-90 transition-opacity"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
