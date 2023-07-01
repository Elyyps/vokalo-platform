import React from "react";
import { ButtonComponent } from "../../cores/button/button";
import style from "./waveform.module.scss";
import Wavesurfer from "wavesurfer.js";
import randomColor from "randomcolor";

export const WaveFormComponent = () => {
  const waveform = React.useRef<any>();

  const url =
    "https://vokalo-stage.s3.eu-north-1.amazonaws.com/clubs/FC5N07/sessions/943ce61d-5382-40f6-9c30-c9c45529a6a7/recordings/devices/425492cc-8882-4818-9c09-34c88c84a7d4/c6f4d880-7958-4143-b74d-d60cafefb61a/c6f4d880-7958-4143-b74d-d60cafefb61a.mp3?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LW5vcnRoLTEiRzBFAiEA6t%2FgkmEHHqwQaJ0oIyqi7r8%2F2dKLEV7uIpf6kC71yPwCICNoUcHqBVoW11Bz5dKvhbhFO8eH8qHn0JUPWCSvFtz5KvkDCLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMMDY1MTEwMDQwNzA3IgwEhi%2BSDXaBVFoD1m0qzQMbP2OQUy82kQUDhmdXoRqHWRJ%2FTdOIH%2F%2BzENGYHaVRr2V98lh7Cb644WPtcoXr1T7NG6oOTRJSqnZxhF5oZhkSLiLOp1vVmnTbh2HpVucag%2Fgk%2Fpv5Tu2dTLtFdMWwEVUdz0lsOYXJTux7K9DFZ5pXa%2BTe1432Mh6LXYENkghkxa7Ate3aVU9HC0cpjOUSgaqJbFGgTm7c3tGW%2FbZyvvcSIxE8u1QXwedaWNQcEeN5wy8ZyGAkgPtypXVv2OHNUw2WRmTtCw1czumcKZ28tJ3FEBEWVmXuc%2BuYhDeKpfqqctlVy7KPcCPbMCeEf7M9DwG25enOD%2BOPk3sdMPvsz3yV08c6UOys2t25AmuT7oCi4S9P0mM9LAHcKCy98aaRYCG0s5et5itdk1fhqKEyLj4VN1cNx8WAKBSWusoQHU2eqHIu9b32NjmcoxdNqyQKjYVZm6P9BI8Gq7MworC5EWOMjlhgyZtcs4OQGfwo9GokDDoLccyXQDWeAgpAuO%2Fpoc0N%2FBwkOTusTInG4ER6k%2FQQu35XewXx%2B83rnnYpGsEzg%2FvzmWm4KwmCLueF0lF8qSiYiydUE%2B4R7QwUTvX8WMRnL6mXNeykXYEsxlj5gTCe8qyjBjqlAeecY5prIuwGWuAe5059sA3zghEWx9nmaHo9K%2F1D%2B2PN4VMTCO87XnjM12BRGGdhHyihMokdyE4WXd4Mfth4M8U5SElugS%2FoiejULSxr3UdsfD%2B5d00G6NE9XlhCuYT2i2TW4KE2HIi8SDHbfnP6oRJAoofnBs6D69w3us6q0%2BqD%2BmupFBQku9jLCersPX0YbIZoViiN%2FYWUB9UJp3t%2FSdoOOJBjhQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230522T112019Z&X-Amz-SignedHeaders=host&X-Amz-Expires=86400&X-Amz-Credential=ASIAQ6KG4MCBSB7X2A6T%2F20230522%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=f14c22ad60d182ce9fd95dd8de86720ceae662a27073a1e46c80667de06f5b0f";
  React.useEffect(() => {
    if (!waveform.current) {
      // Create a wavesurfer object
      // More info about options here https://wavesurfer-js.org/docs/options.html
      waveform.current = Wavesurfer.create({
        container: "#waveform",
        waveColor: "#0e2e86",
        barGap: 2,
        barWidth: 3,
        barRadius: 3,
        cursorWidth: 3,
        cursorColor: "#0e2e86",
      });
      // Load audio from a remote url.
      waveform.current.load(url);
      /* To load a local audio file
                1. Read the audio file as a array buffer.
                2. Create a blob from the array buffer
                3. Load the audio using wavesurfer's loadBlob API
         */
      // Enable dragging on the audio waveform
      waveform.current.enableDragSelection &&
        waveform.current.enableDragSelection({
          maxLength: 90,
        });
      // Perform action when new region is created
      waveform.current.on("region-created", (e: any) => {
        let color = randomColor({
          luminosity: "light",
          alpha: 0.3,
          format: "rgba",
        });
        e.color = color;
      });
    }
  }, []);
  const zoomOut = () => {
    waveform.current.zoom(0);
  };
  const zoomIn = () => {
    waveform.current.zoom(25);
  };
  const deleteClip = (clipid: any) => {
    waveform.current.regions.list[clipid].remove();
  };
  const playClip = (clipid: any) => {
    waveform.current.regions.list[clipid].play();
  };
  const playAudio = () => {
    if (waveform.current.isPlaying()) {
      waveform.current.pause();
    } else {
      waveform.current.play();
    }
  };
  return (
    <div className={style["wave-form"]}>
      <div id="waveform" className="widget-container" />
      <div className={style["wave-form-buttons"]}>
        <ButtonComponent
          title="Play / Pause"
          variant="admin"
          onClick={playAudio}
        />
        <ButtonComponent title="Zoom in" variant="admin" onClick={zoomIn} />{" "}
        <ButtonComponent title="Zoom out" variant="admin" onClick={zoomOut} />
      </div>
    </div>
  );
};
