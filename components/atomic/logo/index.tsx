import LogoIcon from "../../public/logo.svg";

export default function Logo() {
  return (
    <div className="max-sm:hidden">
      <LogoIcon style={{ fill: "hsl(var(--foreground))" }} />
    </div>
  );
}
