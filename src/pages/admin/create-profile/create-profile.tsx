import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";

export const AdminCreateProfilePage = () => {
  return (
    <div>
      <PageHeaderComponent
        title={"Create profile"}
        route="admin"
        hasReturn
        list={[]}
        onSelect={() => ""}
      />
    </div>
  );
};
