import style from "./recording.module.scss";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { WaveFormComponent } from "../../../components/modules/wavefrom/waveform";
import { ButtonComponent } from "../../../components/cores/button/button";
import { DropdownComponent } from "../../../components/cores/dropdown/dropdown";

export const AdminMatchesPage = () => {
  return (
    <div className={style["games"]}>
      <DropdownComponent title={"Team"} contentPosition="right">
        <ul>
          <li>eee</li>
          <li>eeerre</li>
        </ul>
      </DropdownComponent>
      <PageHeaderComponent
        title={"All matches"}
        list={[]}
        hasReturn
        hasTwoButtons
        onSelect={() => ""}
      >
        <ButtonComponent
          title="upload audio"
          variant="admin"
          icon="/icons/export.svg"
        />
      </PageHeaderComponent>
      <WaveFormComponent />
    </div>
  );
};
