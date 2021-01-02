enum NeoPixelColorsPlus {
    //% block=赤
    Red = 0xFF0000,
    //% block=オレンジ
    Orange = 0xFFA500,
    //% block=黄
    Yellow = 0xFFFF00,
    //% block=緑
    Green = 0x00FF00,
    //% block=青
    Blue = 0x0000FF,
    //% block=あい
    Indigo = 0x4b0082,
    //% block=すみれ
    Violet = 0x8a2be2,
    //% block=紫
    Purple = 0xFF00FF,
    //% block=消
    None = null
}

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

enum RotateDirection {
    //% block="前"
    FORWRD = 1,
    //% block="後"
    BACKWARD = -1,
}

let t5gpStrip1: neopixel.Strip = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
let t5gpStrip2: neopixel.Strip = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)

/**
 * 津田小5年ブロック
 */
//% weight=70 color=#e67e22 icon="\uf005" block="津田小5年ブロック"
namespace tsuda_5th_grade_performance {

    //% block="%led|を%color|で点灯"
    export function litLED(led: LEDs, color: NeoPixelColorsPlus): void {
        if (color === NeoPixelColorsPlus.None) {
            turnOffLED(led)
        } else {
            if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
                t5gpStrip1.showColor(color)
            }
            if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
                t5gpStrip2.showColor(color)
            }
        }
    }

    function _setPixelColor(led: LEDs, offset: number, color: NeoPixelColorsPlus): void {
        if (color === null) {
            if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
                t5gpStrip1.buf.fill(0, offset * 3, 3)
            }
            if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
                t5gpStrip2.buf.fill(0, offset * 3, 3)
            }
        } else {
            if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
                t5gpStrip1.setPixelColor(offset, color)
            }
            if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
                t5gpStrip2.setPixelColor(offset, color)
            }
        }
    }

    //% block="%led|を%color1|%color2|%color3|で点灯"
    export function litLEDWithColors(led: LEDs, color1: NeoPixelColorsPlus, color2: NeoPixelColorsPlus, color3: NeoPixelColorsPlus): void {
        _setPixelColor(led, 0, color1)
        _setPixelColor(led, 1, color2)
        _setPixelColor(led, 2, color3)
        if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
            t5gpStrip1.show()
        }
        if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
            t5gpStrip2.show()
        }
    }

    //% block="%led|を消灯"
    export function turnOffLED(led: LEDs): void {
        if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
            t5gpStrip1.clear()
            t5gpStrip1.show()
        }
        if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
            t5gpStrip2.clear()
            t5gpStrip2.show()
        }
    }

    //% block="%led|を%direcastion|へ%offset|個ずらす"
    export function rotate(led: LEDs, direction: RotateDirection, offset: Offsets): void {
        const d = direction === RotateDirection.FORWRD ? 1 : -1
        const o = offset === Offsets.ONE ? 1 : 2
        if (led === LEDs.LED1 || led === LEDs.BOTH_LEDS) {
            t5gpStrip1.rotate(d * o)
            t5gpStrip1.show()
        }
        if (led === LEDs.LED2 || led === LEDs.BOTH_LEDS) {
            t5gpStrip2.rotate(d * o)
            t5gpStrip2.show()
        }
    }
}