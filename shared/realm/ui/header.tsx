import { Link } from "@remix-run/react";
import { RoutesMap } from "../lib";
import { ModeToggle } from "./mode-toggle";

export function Header() {
  return (
    <header className="grid items-center grid-cols-[1fr_auto] p-4">
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <Link to={RoutesMap.Dashborad}>Dashboard</Link>
          </li>
          <li>
            <Link to={RoutesMap.Models}>Models</Link>
          </li>
        </ul>
      </nav>
      <ModeToggle />
    </header>
  );
}
