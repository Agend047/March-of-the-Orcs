class Level {
    enemys;
    clouds;
    backgroundObjects;
    level_end_x;

    constructor(enemys, clouds, backgroundObjects, level_end_x) {
        this.enemys = enemys;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.level_end_x = level_end_x;
    }
}