enum NeoPixelColorsPlus {
    //% block=赤
    Red = 0xFF0000,
    //% block=オレンジ
    Orange = 0xFF6A00,
    //% block=黄
    Yellow = 0xFFE800,
    //% block=緑
    Green = 0x006400,
    //% block=黄緑
    YellowGreen = 0x55FF00,
    //% block=藍
    Indigo = 0x101989,
    //% block=青
    Blue = 0x0000FF,
    //% block=水色
    WaterBlue = 0x2255FF,
    //% block=紫
    Purple = 0x7700FF,
    //% block=ピンク
    Pink = 0xEE33EE,
    //% block=白
    White = 0xFFFFFF,
    //% block=消
    None = null
}

enum MusicTitle {
    //% block="Step and a step"
    STEP_AND_A_STEP = 1,
    //% block="群青"
    GUNJO = 2
}

enum Palette {
    //% block="パレット1"
    Palette1 = 0,
    //% block="パレット2"
    Palette2 = 1,
    //% block="パレット3"
    Palette3 = 2,
    //% block="パレット4"
    Palette4 = 3,
    //% block="パレット5"
    Palette5 = 4,
    //% block="パレット6"
    Palette6 = 5,
}

const paletteColors: {[key: number]: Array<number>} = {
    1: [
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None
    ],
    2: [
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None,
        NeoPixelColorsPlus.None
    ]
};

let t5gpStrip1: neopixel.Strip = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
let t5gpStrip2: neopixel.Strip = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)

let currentMusicTitle: MusicTitle = MusicTitle.STEP_AND_A_STEP
let currentPalette: Palette = null

/**
 * 津田小5年ブロック
 */
//% weight=100 color=#e67e22 icon="\uf005" block="津田小5年ブロック"
namespace tsuda_5th_grade_performance {

    input.onButtonPressed(Button.A, function () {
        if (currentPalette === null) currentPalette = Palette.Palette1
        else currentPalette = (currentPalette + 1) % 6
        _litLED(paletteColors[currentMusicTitle][currentPalette])
    })

    input.onButtonPressed(Button.B, function () {
        if (currentPalette === null) {
            currentPalette = Palette.Palette6
        } else {
            if (currentPalette <= 0) currentPalette = 6
            currentPalette = (currentPalette - 1) % 6
        }
        _litLED(paletteColors[currentMusicTitle][currentPalette])
    })

    input.onButtonPressed(Button.AB, function () {
        if (mode === 'switchingMusicTitle') return
        const tmpMode = mode
        mode = 'switchingMusicTitle'
        currentPalette = null
        if (currentMusicTitle === MusicTitle.STEP_AND_A_STEP) {
            currentMusicTitle = MusicTitle.GUNJO
            for (let i = 0; i < 3; i++) {
                _turnOffLED()
                basic.pause(500)
                _litLED(NeoPixelColors.Blue)
                basic.pause(500)
            }
        } else if (currentMusicTitle === MusicTitle.GUNJO) {
            currentMusicTitle = MusicTitle.STEP_AND_A_STEP
            for (let i = 0; i < 3; i++) {
                _turnOffLED()
                basic.pause(500)
                _litLED(NeoPixelColors.Red)
                basic.pause(500)
            }
        }
        _turnOffLED()
        mode = tmpMode
    })

    radio.onReceivedString(function (receivedString) {
        mode = receivedString
        _litLED(paletteColors[currentMusicTitle][currentPalette])
    })

    radio.onReceivedValue(function (name, value) {
        if (name == "bpm") {
            bpm = value
            serial.writeValue(name, bpm)
        } else if (name == "led") {
            serial.writeValue(name, value)
            currentPalette = value
        } else if (mode == "Blink" && name == "blink") {
            if (value == 1) {
                _litLED(paletteColors[currentMusicTitle][currentPalette])
            } else {
                _turnOffLED()
            }
        }
    })

    let bpm = 0
    let mode = "AlwaysON"
    radio.setGroup(1)
    _turnOffLED()
    basic.forever(function () {
        if (mode === 'switchingMusicTitle') return
        if (bpm > 0) {
            if (mode == "AlwaysON" && currentPalette !== null) {
                _litLED(paletteColors[currentMusicTitle][currentPalette])
            }
        } else {
            if (currentPalette === null) _turnOffLED()
            else _litLED(paletteColors[currentMusicTitle][currentPalette])
        }
    })

    /**
     * パレットを指定した色に設定します
    */
    //% block="$musicTitle の$palette を%color=neo_pixel_colors_plus|にする"
    //% weight=100
    export function setPaletteColor(musicTitle: MusicTitle, palette: Palette, color: number): void {
        paletteColors[musicTitle][palette] = color
    }

    function _litLED(color: number): void {
        if (color === NeoPixelColorsPlus.None) {
            _turnOffLED()
        } else {
            t5gpStrip1.showColor(color)
            t5gpStrip2.showColor(color)
        }
    }

    function _setPixelColor(offset: number, color: number): void {
        if (color === null) {
            t5gpStrip1.buf.fill(0, offset * 3, 3)
            t5gpStrip2.buf.fill(0, offset * 3, 3)
        } else {
            t5gpStrip1.setPixelColor(offset, color)
            t5gpStrip1.show()
            t5gpStrip2.setPixelColor(offset, color)
            t5gpStrip2.show()
        }
    }

    function _litLEDWithColors(color1: number, color2: number, color3: number): void {
        _setPixelColor(0, color1)
        _setPixelColor(1, color2)
        _setPixelColor(2, color3)
        t5gpStrip1.show()
        t5gpStrip2.show()
    }

    function _turnOffLED(): void {
        t5gpStrip1.clear()
        t5gpStrip1.show()
        t5gpStrip2.clear()
        t5gpStrip2.show()
    }


   /**
     * LEDの色を選択します
    */
    //% blockId="neo_pixel_colors_plus" block="%color"
    //% weight=90
    export function colors(color: NeoPixelColorsPlus): number {
        return color
    }

    /**
     * カラーコード(#FF00FFのようなコード)を色に変換します
    */
    //% block="カラーコード%colorCode|を色に変換"
    //% weight=80
    export function convertColorCode(colorCode: string): number {
        let sanitized = false
        while (!sanitized) {
            if (colorCode.length > 0 && (colorCode[0] === '#' || colorCode[0] === ' ')) {
                colorCode = colorCode.slice(1)
            } else {
                sanitized = true
            }
        }
        return parseInt(colorCode, 16)
    }
}