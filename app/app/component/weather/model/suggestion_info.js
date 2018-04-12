/**
 * 生活指数、建议的数据模型类
 */

export class SuggestionInfo{
    /**
     *
     * "suggestion": {
        "air": {
          "brf": "中",
          "txt": "气象条件对空气污染物稀释、扩散和清除无明显影响，易感人群应适当减少室外活动时间。"
        },
        ...
        }
     */

    constructor(type, brf, txt) {
        this.type = type;
        this.brf = brf;
        this.txt = txt;
    }

}