
/**
 * このファイルを使って、独自の関数やブロックを定義してください。
 * 詳しくはこちらを参照してください：https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * カスタムブロック
 */
//% weight=100 color=#f39c12 icon="\uf005"
namespace custom {
    /**
     * TODO: ここに関数を記述してください
     * @param n ここでパラメーターの説明をしてください。, eg: 5
     * @param s ここでパラメーターの説明をしてください。, eg: "Hello"
     * @param e ここでパラメーターの説明をしてください。
     */
    //% block
    export function foo(n: number, s: string, e: MyEnum): void {
        basic.showNumber(n);
    }

    /**
     * TODO: ここに関数を記述してください
     * @param value ここで値の説明をしてください。, eg: 5
     */
    //% block
    export function fib(value: number): number {
        return value <= 1 ? value : fib(value -1) + fib(value - 2);
    }
}
