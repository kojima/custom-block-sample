enum LEDs {
    //% block="LED 1"
    LED1,
    //% block="LED 2"
    LED2,
    //% block="LED 1,2"
    BOTH_LEDS
}

enum Offsets {
    //% block="1"
    ONE = 1,
    //% block="2"
    TWO = 2,
}

enum Direction {
    //% block="前"
    FORWRD = 1,
    //% block="後"
    BACKWARD = -1,
}

let t5geStrip1: neopixel.Strip = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
let t5geStrip2: neopixel.Strip = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)

/**
 * 津田小5年ブロック
 */
//% weight=70 color=#e67e22 icon="\uf005" block="津田小5年ブロック"
namespace tsuda_5th_grade_event {

    //% block="%led|を%color|で点灯"
    export function litLED(led: LEDs, color: NeoPixelColors): void {
        if (led == LEDs.LED1 || led == LEDs.BOTH_LEDS) {
            t5geStrip1.showColor(neopixel.colors(color));
        }
        if (led == LEDs.LED2 || led == LEDs.BOTH_LEDS) {
            t5geStrip2.showColor(neopixel.colors(color));
        }
    }

    //% block="%led|を%color1|%color2|%color3|で点灯"
    export function litLEDWithColors(led: LEDs, color1: NeoPixelColors, color2: NeoPixelColors, color3: NeoPixelColors): void {
        if (led == LEDs.LED1 || led == LEDs.BOTH_LEDS) {
            t5geStrip1.setPixelColor(0, color1)
            t5geStrip1.setPixelColor(1, color2)
            t5geStrip1.setPixelColor(2, color3)
            t5geStrip1.show()
        }
        if (led == LEDs.LED2 || led == LEDs.BOTH_LEDS) {
            t5geStrip2.setPixelColor(0, color1)
            t5geStrip2.setPixelColor(1, color2)
            t5geStrip2.setPixelColor(2, color3)
            t5geStrip2.show()
        }
    }

    //% block="%led|を消灯"
    export function turnOffLED(led: LEDs): void {
        if (led == LEDs.LED1 || led == LEDs.BOTH_LEDS) {
            t5geStrip1.clear()
            t5geStrip1.show()
        }
        if (led == LEDs.LED2 || led == LEDs.BOTH_LEDS) {
            t5geStrip2.clear()
            t5geStrip2.show()
        }
    }

    //% block="%led|を%direction|へ%offset|個ずらす"
    export function rotate(led: LEDs, offset: Offsets = Offsets.ONE, direction: Direction = Direction.FORWRD): void {
        if (led == LEDs.LED1 || led == LEDs.BOTH_LEDS) {
            t5geStrip1.rotate(offset * direction)
            t5geStrip1.show()
        }
        if (led == LEDs.LED2 || led == LEDs.BOTH_LEDS) {
            t5geStrip2.rotate(offset * direction)
            t5geStrip2.show()
        }
    }
}