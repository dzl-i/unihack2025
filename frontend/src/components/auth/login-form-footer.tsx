import Link from "next/link";

export function LoginFormFooter() {
  return (
    <div className="mt-6 flex items-center justify-center">
      <p className="text-sm text-muted-foreground font-light">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="text-[#FFFFFFBF] hover:underline hover:opacity-90 transition-opacity"
        >
          Register
        </Link>
      </p>
    </div>
  );
}
