enum LEDs {
    //% block="LED 1"
    LED1,
    //% block="LED 2"
    LED2,
    //% block="LED 1,2"
    BOTH_LEDS
}

let t5geStrip1: neopixel.Strip = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
let t5geStrip2: neopixel.Strip = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)

/**
 * 津田小5年ブロック
 */
//% weight=70 color=#e67e22 icon="\uf005" block="津田小5年ブロック"
namespace tsuda_5th_grade_event {

    //% block="%led|を%color|で点灯"
    export function litLED(led: LEDs, color: NeoPixelColors) {
        if (led == LEDs.LED1 || led == LEDs.BOTH_LEDS) {
            t5geStrip1.showColor(neopixel.colors(color));
        }
        if (led == LEDs.LED2 || led == LEDs.BOTH_LEDS) {
            t5geStrip2.showColor(neopixel.colors(color));
        }
    }
}