import * as Cesium from "cesium";

type ViewerOptions = {
    animation?: boolean;
    baseLayerPicker?: boolean;
    fullscreenButton?: boolean;
    vrButton?: boolean;
    geocoder?: boolean | Cesium.GeocoderService[];
    homeButton?: boolean;
    infoBox?: boolean;
    sceneModePicker?: boolean;
    selectionIndicator?: boolean;
    timeline?: boolean;
    navigationHelpButton?: boolean;
    navigationInstructionsInitiallyVisible?: boolean;
    scene3DOnly?: boolean;
    shouldAnimate?: boolean;
    clockViewModel?: Cesium.ClockViewModel;
    selectedImageryProviderViewModel?: Cesium.ProviderViewModel;
    imageryProviderViewModels?: Cesium.ProviderViewModel[];
    selectedTerrainProviderViewModel?: Cesium.ProviderViewModel;
    terrainProviderViewModels?: Cesium.ProviderViewModel[];
    // imageryProvider?: Cesium.ImageryProvider;
    // terrainProvider?: Cesium.TerrainProvider;
    skyBox?: Cesium.SkyBox | false;
    skyAtmosphere?: Cesium.SkyAtmosphere | false;
    // fullscreenElement?: Element | string;
    useDefaultRenderLoop?: boolean;
    targetFrameRate?: number;
    showRenderLoopErrors?: boolean;
    useBrowserRecommendedResolution?: boolean;
    automaticallyTrackDataSourceClocks?: boolean;
    contextOptions?: any;
    sceneMode?: Cesium.SceneMode;
    mapProjection?: Cesium.MapProjection;
    // globe?: Cesium.Globe | false;
    orderIndependentTranslucency?: boolean;
    // creditContainer?: Element | string;
    // creditViewport?: Element | string;
    // dataSources?: DataSourceCollection;
    shadows?: boolean;
    terrainShadows?: Cesium.ShadowMode;
    mapMode2D?: Cesium.MapMode2D;
    projectionPicker?: boolean;
    requestRenderMode?: boolean;
    maximumRenderTimeChange?: number;
};

/**
     * Asynchronously sets the camera to view the provided entity, entities, or data source.
     * If the data source is still in the process of loading or the visualization is otherwise still loading,
     * this method waits for the data to be ready before performing the zoom.
     *
     * <p>The offset is heading/pitch/range in the local east-north-up reference frame centered at the center of the bounding sphere.
     * The heading and the pitch angles are defined in the local east-north-up reference frame.
     * The heading is the angle from y axis and increasing towards the x axis. Pitch is the rotation from the xy-plane. Positive pitch
     * angles are above the plane. Negative pitch angles are below the plane. The range is the distance from the center. If the range is
     * zero, a range will be computed such that the whole bounding sphere is visible.</p>
     *
     * <p>In 2D, there must be a top down view. The camera will be placed above the target looking down. The height above the
     * target will be the range. The heading will be determined from the offset. If the heading cannot be
     * determined from the offset, the heading will be north.</p>
     * @param target - The entity, array of entities, entity collection, data source, Cesium3DTileset, point cloud, or imagery layer to view. You can also pass a promise that resolves to one of the previously mentioned types.
     * @param [offset] - The offset from the center of the entity in the local east-north-up reference frame.
     * @returns A Promise that resolves to true if the zoom was successful or false if the target is not currently visualized in the scene or the zoom was cancelled.
     */
// zoomTo(target: Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | TimeDynamicPointCloud | Promise < Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | TimeDynamicPointCloud >, offset ?: HeadingPitchRange): Promise<boolean>;

/**
 * Flies the camera to the provided entity, entities, or data source.
 * If the data source is still in the process of loading or the visualization is otherwise still loading,
 * this method waits for the data to be ready before performing the flight.
 *
 * <p>The offset is heading/pitch/range in the local east-north-up reference frame centered at the center of the bounding sphere.
 * The heading and the pitch angles are defined in the local east-north-up reference frame.
 * The heading is the angle from y axis and increasing towards the x axis. Pitch is the rotation from the xy-plane. Positive pitch
 * angles are above the plane. Negative pitch angles are below the plane. The range is the distance from the center. If the range is
 * zero, a range will be computed such that the whole bounding sphere is visible.</p>
 *
 * <p>In 2D, there must be a top down view. The camera will be placed above the target looking down. The height above the
 * target will be the range. The heading will be determined from the offset. If the heading cannot be
 * determined from the offset, the heading will be north.</p>
 * @param target - The entity, array of entities, entity collection, data source, Cesium3DTileset, point cloud, or imagery layer to view. You can also pass a promise that resolves to one of the previously mentioned types.
 * @param [options] - Object with the following properties:
 * @param [options.duration = 3.0] - The duration of the flight in seconds.
 * @param [options.maximumHeight] - The maximum height at the peak of the flight.
 * @param [options.offset] - The offset from the target in the local east-north-up reference frame centered at the target.
 * @returns A Promise that resolves to true if the flight was successful or false if the target is not currently visualized in the scene or the flight was cancelled. //TODO: Cleanup entity mentions
 */
// flyTo(target: Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | TimeDynamicPointCloud | Promise < Entity | Entity[] | EntityCollection | DataSource | ImageryLayer | Cesium3DTileset | TimeDynamicPointCloud >, options ?: {
//     duration?: number;
//     maximumHeight?: number;
//     offset?: HeadingPitchRange;
// }): Promise<boolean>;