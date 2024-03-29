const level8 = new Level(
    [
        new WalkerWarrior(200),
        new WalkerWarrior(200),
        new WalkerWarrior(200),
        new WalkerBerserker(300),
    ],

    [
        new Cloud(20, 'img/5_background/layers/4_clouds/1.png'),
        new Cloud(740, 'img/5_background/layers/4_clouds/2.png'),
        new Cloud(740 * 2, 'img/5_background/layers/4_clouds/2.png'),
        new Cloud(740 * 3, 'img/5_background/layers/4_clouds/1.png'),
        new Cloud(740 * 4, 'img/5_background/layers/4_clouds/2.png'),
        new Cloud(740 * 5, 'img/5_background/layers/4_clouds/1.png'),
        new Cloud(740 * 6, 'img/5_background/layers/4_clouds/2.png'),
        new Cloud(740 * 7, 'img/5_background/layers/4_clouds/1.png'),
    ],

    //coins
    [
        new Coin(100, 100),
        new Coin(200, 100),
        new Coin(300, 100),
        new Coin(400, 100),
        new Coin(500, 100),
        new Coin(600, 100),
        new Coin(200, 100),
        new Coin(200, 100),
        new Coin(100, 100),
        new Coin(100, 100),
        new Coin(300, 100),
        new Coin(300, 100),
        new Coin(300, 100),
        new Coin(300, 100),
        new Coin(300, 100),
    ],
    //collectables
    [],

    //backgrounds
    [
        new Background(0, 480, 'img/5_background/layers/air.png'),
        new Background(719, 480, 'img/5_background/layers/air.png'),
        new Background(719 * 2, 480, 'img/5_background/layers/air.png'),
        new Background(719 * 3, 480, 'img/5_background/layers/air.png'),

        new Background(0, 500, 'img/5_background/layers/3_third_layer/1.png'),
        new Background(720, 500, 'img/5_background/layers/3_third_layer/2.png'),
        new Background(719 * 2, 500, 'img/5_background/layers/3_third_layer/1.png'),
        new Background(719 * 3, 500, 'img/5_background/layers/3_third_layer/2.png'),

        new Background(0, 500, 'img/5_background/layers/2_second_layer/1.png'),
        new Background(720, 500, 'img/5_background/layers/2_second_layer/2.png'),
        new Background(719 * 2, 500, 'img/5_background/layers/2_second_layer/1.png'),
        new Background(719 * 3, 500, 'img/5_background/layers/2_second_layer/2.png'),

        new Background(0, 500, 'img/5_background/layers/1_first_layer/1.png'),
        new Background(720, 500, 'img/5_background/layers/1_first_layer/2.png'),
        new Background(719 * 2, 500, 'img/5_background/layers/1_first_layer/1.png'),
        new Background(719 * 3, 500, 'img/5_background/layers/1_first_layer/2.png'),
    ],

    level_end_x = (719 * 4)
)