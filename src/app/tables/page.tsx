import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";

import DefaultLayout from "@/components/Layouts/DefaultLayout";

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="文章審查" />
      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
