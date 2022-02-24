import { Cartesian3, HeadingPitchRoll, Rectangle} from "cesium";

export interface IFlyToMessage {
    action: "flyTo"
    options: {
        destination: Cartesian3 | Rectangle
        orientation: Cartesian3 | HeadingPitchRoll | null
        maximumHeight?: number;
        pitchAdjustHeight?: number;
        flyOverLongitude?: number;
        flyOverLongitudeWeight?: number;
        convert?: boolean;
    }

}

export type ICameraMessage = IFlyToMessage