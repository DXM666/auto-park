/**
 * 天气质量指数每一项的值
 */

export class AqiItem {
    constructor(eng_name, value, chn_name, unit) {
        this.eng_name = eng_name;
        this.value = value;
        this.chn_name = chn_name;
        this.unit = unit;
    }
}