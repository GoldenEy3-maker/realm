import { MetaFunction } from "@remix-run/node";
import { DashboradPage } from "pages/realm/dashboard";

export const meta: MetaFunction = () => [{ title: "Realm" }];

export default DashboradPage;
