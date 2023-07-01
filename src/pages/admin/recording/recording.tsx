import style from "./recording.module.scss";
import { PageHeaderComponent } from "../../../components/cores/page-header/page-header";
import { WaveFormComponent } from "../../../components/modules/wavefrom/waveform";
import { ButtonComponent } from "../../../components/cores/button/button";

export const AdminRecordingPage = () => {
  return (
    <div className={style["recording"]}>
      <PageHeaderComponent
        title={"IA - Monaco, Mar 1st - Andreas Louridsen"}
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
