
import { Canvas, Ctx, IData, I } from "../types";
export class DrawPartogram {
    xSpan = 30
    ySpan = 30

    rows = 10
    cols = 24
    get gridWidth() {
        return this.cols * this.xSpan
    }
    get gridHeight() {
        return this.rows * this.ySpan
    }
    canvas: Canvas;
    context: Ctx;
    canvas2: Canvas;
    context2: Ctx;
    width: number;
    height: number;
    maxindex = 750;

    lastx = 0;
    lasty = 0;
    baseleft = 50;
    basetop = 50;
    type = 0; //  0，伴行型 1,交叉型
    isshowevent = 1; //是否显示事件
    max = 210;
    start = '2019-09-01 05:30';

    data: IData[] = [

    ];
    lastcurrx = 0;
    currentx = 10;
    constructor({ canvas, canvas2, width, height, data }: I) {
        this.canvas = canvas
        this.canvas2 = canvas2
        this.width = width
        this.height = height
        this.height = height
        this.context = canvas.getContext('2d') as Ctx
        this.context2 = canvas2.getContext('2d') as Ctx
        canvas.width = width;
        canvas.height = height;
        canvas2.width = width;
        canvas2.height = height;
        this.xSpan = width / 28
        this.ySpan = height / 12
        this.basetop = this.ySpan

        this.render(data)
    }
    render(d: IData[]) {
        this.data = d

        this.drawgrid();
        this.printline();
        this.canvas.addEventListener(
            'click',
            e => {
                // const p = this.getEventPosition(e);
                // alert(p);
            },
            false
        );
    }
    showcur(x: number, fhr: string, toco: string) {
        const { context } = this;

        context.font = 'bold 10px consolas';
        context.textAlign = 'left';
        context.textBaseline = 'top';
        context.font = 'bold 16px arial';
        context.fillStyle = 'blue';
        var title = document.getElementById('curtitle') as HTMLDivElement;
        title.innerHTML = 'FHR1:' + fhr + '  ' + 'TOCO:' + toco;
    }

    selectfrom(lowValue: number, highValue: number) {
        var choice = highValue - lowValue + 1;
        return Math.floor(Math.random() * choice + lowValue);
    }

    setlrules(x: number) {
        const { canvas, context, basetop, xSpan, ySpan } = this;
        if (canvas == null) return;

        context.font = 'bold 15px consolas';
        context.textAlign = 'right';
        context.textBaseline = 'top';
        context.fillStyle = 'rgba(0,51,102,1)'; // 轴数
        for (var i = 0; i < 11; i++) {
            context.fillText(String(10 - i), x, basetop + i * ySpan);
        }
        // context.fillText('宫', 20, 100);
        // context.fillText('颈', 20, 150);
        // context.fillText('扩', 20, 200);
        // context.fillText('张', 20, 250);
        // context.fillText('(cm)', 32, 300);
        [...'宫颈扩张'.split(''), '(cm)'].forEach((_, i) => {
            context.fillText(_, 30, basetop + 1.5 * ySpan * (i + 1));

        })
        context.stroke();
        this.drawarc(15, basetop + 1.5 * ySpan * 6);
    }

    drawarc(x: number, y: number) {
        const { context } = this;

        context.beginPath();
        context.arc(x, y, 8, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.strokeStyle = 'red';
        context.fill();
        context.stroke();
    }

    drawcross(x: number, y: number) {
        const { context } = this;
        context.beginPath();
        context.fillStyle = '#394a6d';
        context.strokeStyle = '#394a6d';
        context.lineWidth = 0;
        context.moveTo(x, y - 5);
        context.lineTo(x + 5, y - 5);
        context.lineTo(x + 20, y + 10);
        context.lineTo(x + 15, y + 10);
        context.lineTo(x, y - 5);
        context.moveTo(x + 15, y - 5);
        context.lineTo(x + 20, y - 5);
        context.lineTo(x + 5, y + 10);
        context.lineTo(x, y + 10);
        context.lineTo(x + 15, y - 5);
        context.fill();
    }

    showevent(x: number, y: number, data: string) {
        const { isshowevent, context, basetop } = this;

        if (isshowevent && data != '') {
            context.textAlign = 'left';
            context.textBaseline = 'top';
            context.font = 'bold 14px arial';
            context.fillStyle = 'black';
            for (let i = 0; i < data.length; i++) {
                context.fillText(data.charAt(i), x, basetop + y + 15 * i);
            }
        }
    }

    setrrules() {
        const { canvas, context, type, gridWidth, baseleft, ySpan, basetop } = this;

        if (canvas == null) return;
        const absY = baseleft + gridWidth + 6
        context.font = 'bold 15px consolas';
        context.textAlign = 'left';
        context.textBaseline = 'bottom';
        context.fillStyle = 'rgba(0,51,102,1)'; // 轴数
        for (var i = 0; i < 11; i++) {
            var scale = 0;
            let stringScale = '';
            if (type == 0) {
                scale = 5 - i;
            } else {
                scale = i - 5;
            }
            stringScale = String(scale);
            if (scale > 0) {
                stringScale = '+' + scale;
            }
            context.fillText(stringScale, absY, basetop + i * ySpan + 10);
        }

        '抬头下降'.split('').forEach((_, i) => {
            context.fillText(_, absY + 28, basetop + 1.6 * ySpan * (i + 1));
        })
        this.drawcross(absY + 28, basetop + 1.6 * ySpan * 5);

        context.stroke();
    }

    setbrules() {
        const { canvas, context, baseleft, xSpan, basetop, gridHeight } = this;

        if (canvas == null) return;

        context.font = 'bold 15px consolas';
        context.textAlign = 'center';
        context.textBaseline = 'top';
        context.fillStyle = 'rgba(0,51,102,1)'; // 轴数
        for (var i = 1; i < 25; i++) {
            context.fillText(String(i), baseleft + i * xSpan, basetop + gridHeight + 10);
        }
        context.stroke();
    }

    setvertical() {
        const { canvas, context, baseleft, basetop, ySpan, xSpan, cols } = this;

        if (canvas == null) return;
        context.beginPath();
        context.strokeStyle = 'rgb(150,150,150)'; // 横轴线
        context.lineWidth = 1;
        for (var i = 0; i < 10 + 1; i++) {
            context.moveTo(baseleft, basetop + ySpan * i);
            context.lineTo(baseleft + cols * xSpan, basetop + ySpan * i);
        }
        context.stroke();
    }

    sethorizontal() {
        const { canvas, context, baseleft, basetop, xSpan, gridHeight } = this;

        if (canvas == null) return;
        context.beginPath();
        context.lineWidth = 1.1;
        context.strokeStyle = 'rgb(150,150,150)'; // 竖轴线
        for (var i = 0; i < 25; i++) {
            context.moveTo(xSpan * i + baseleft, basetop);
            context.lineTo(xSpan * i + baseleft, basetop + gridHeight);
        }
        context.stroke();
    }

    converttime(start: string, current: string) {
        let interval = new Date(current).getTime() - new Date(start).getTime();
        interval = interval / 1000;
        return (interval / (60 * 60)).toFixed(1);
    }

    drawgrid() {
        this.sethorizontal();
        this.setvertical();
        this.setlrules(40);
        this.setrrules();
        this.setbrules();
    }

    printline() {
        const { canvas2, context2, data: demodata, baseleft, basetop, start, type, xSpan, ySpan } = this;

        context2.clearRect(0, 0, canvas2.width, canvas2.height);
        var lastx = 0,
            lasty1 = 0,
            lasty2 = 0;
        for (var i = 0; i < demodata.length; i++) {
            var curx = baseleft + parseFloat(this.converttime(start, demodata[i].checktime)) * xSpan;
            var cury1 = basetop + (10 - demodata[i].cd) * ySpan;
            var cury2 = 0;
            if (type == 0) {
                cury2 = (5 - demodata[i].df) * ySpan + basetop;
            } else {
                cury2 = (5 + demodata[i].df) * ySpan + basetop;
            }
            this.drawarc(curx, cury1);
            this.drawcross(curx - 10, cury2);
            if (lastx != 0) {
                context2.beginPath();
                context2.lineWidth = 2.5;
                context2.strokeStyle = 'red';
                context2.moveTo(lastx, lasty1);
                context2.lineTo(curx, cury1);
                context2.stroke();
                context2.beginPath();
                context2.lineWidth = 2.5;
                context2.strokeStyle = '#394a6d';
                context2.moveTo(lastx, lasty2);
                context2.lineTo(curx, cury2);
                context2.stroke();
            }
            lastx = curx;
            lasty1 = cury1;
            lasty2 = cury2;
            this.showevent(curx, lasty1, demodata[i].event);
        }
    }

    setting(showtype: string) {
        this.isshowevent = Number(showtype);
        this.printline();
    }
    getEventPosition(ev: any) {
        var x, y;
        if (ev.layerX || ev.layerX == 0) {
            x = ev.layerX;
            y = ev.layerY;
        } else if (ev.offsetX || ev.offsetX == 0) {
            x = ev.offsetX;
            y = ev.offsetY;
        }
        //return {x: x, y: y};
        return x + '-' + y;
    }
    formatDate(date: any, format: string) {
        if (!date) return;
        if (!format) format = 'yyyy-MM-dd';
        switch (typeof date) {
            case 'string':
                date = new Date(date.replace(/-/, '/'));
                break;
            case 'number':
                date = new Date(date);
                break;
        }
        if (!(date instanceof Date)) return;
        var dict = {
            yyyy: date.getFullYear(),
            M: date.getMonth() + 1,
            d: date.getDate(),
            H: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            MM: ('' + (date.getMonth() + 101)).substr(1),
            dd: ('' + (date.getDate() + 100)).substr(1),
            HH: ('' + (date.getHours() + 100)).substr(1),
            mm: ('' + (date.getMinutes() + 100)).substr(1),
            ss: ('' + (date.getSeconds() + 100)).substr(1),
        };
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
            return dict[arguments[0]];
        });
    }
}
// var starttime = draw.formatDate(new Date(), 'HH:mm');
