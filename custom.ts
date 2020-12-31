enum LEDs {
    //% block="LED 1"
    LED1,
    //% block="LED 2"
    LED2
}

/**
 * 津田小5年ブロック
 */
//% weight=70 color=#e67e22 icon="\uf005" block="津田小5年ブロック"
namespace tsuda_5th_grade_event {
    let strip1: neopixel.Strip = null;
    let strip2: neopixel.Strip = null;

    //% block="LEDセットアップ"
    export function setupLEDs() {
        strip1 = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB);
        strip2 = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB);
    }

    //% block="%led|を%color|で点灯"
    export function litLED(led: LEDs, color: NeoPixelColors) {
        let strip = led == LEDs.LED1 ? strip1 : strip2;
        strip.showColor(neopixel.colors(color));
    }
}