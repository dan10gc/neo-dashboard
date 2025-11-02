import { Outlet } from "react-router";
import { PageLayout } from "../components/layout/page-layout";

export function Root() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}
