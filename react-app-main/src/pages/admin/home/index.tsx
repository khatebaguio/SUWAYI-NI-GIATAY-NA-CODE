import { PageHeader } from "../../../components/common/page-header";
import { AdminRecipes } from "../../../components/features/admin/admin-recipes";

export function AdminHomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <PageHeader
        eyebrow="Recipe Book · Administration"
        title="All recipes"
        subtitle="Browse recipes across every account."
      />
      <AdminRecipes />
    </section>
  );
}
