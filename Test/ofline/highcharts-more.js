﻿/*
 Highcharts JS v11.1.0 (2023-06-05)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict'; (function (b) { "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/highcharts-more", ["highcharts"], function (t) { b(t); b.Highcharts = t; return b }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (b) {
    function t(a, d, e, b) { a.hasOwnProperty(d) || (a[d] = b.apply(null, e), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: d, module: a[d] } }))) } b = b ? b._modules :
        {}; t(b, "Extensions/Pane.js", [b["Core/Chart/Chart.js"], b["Series/CenteredUtilities.js"], b["Core/Globals.js"], b["Core/Pointer.js"], b["Core/Utilities.js"]], function (a, d, e, b, f) {
            function m(c, k, g, G, d) { let r = !0; const a = g[0], p = g[1], z = Math.sqrt(Math.pow(c - a, 2) + Math.pow(k - p, 2)); C(G) && C(d) && (c = Math.atan2(u(k - p, 8), u(c - a, 8)), d !== G && (r = G > d ? c >= G && c <= Math.PI || c <= d && c >= -Math.PI : c >= G && c <= u(d, 8))); return z <= Math.ceil(g[2] / 2) && r } const { addEvent: h, correctFloat: u, defined: C, extend: v, merge: n, pick: D, splat: y } = f; a.prototype.collectionsWithUpdate.push("pane");
            class g {
                constructor(c, k) { this.options = this.chart = this.center = this.background = void 0; this.coll = "pane"; this.defaultOptions = { center: ["50%", "50%"], size: "85%", innerSize: "0%", startAngle: 0 }; this.defaultBackgroundOptions = { shape: "circle", borderWidth: 1, borderColor: "#cccccc", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#ffffff"], [1, "#e6e6e6"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" }; this.init(c, k) } init(c, k) {
                    this.chart = k; this.background = []; k.pane.push(this);
                    this.setOptions(c)
                } setOptions(c) { this.options = n(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, c) } render() {
                    var c = this.options; let k = this.options.background; var g = this.chart.renderer; this.group || (this.group = g.g("pane-group").attr({ zIndex: c.zIndex || 0 }).add()); this.updateCenter(); if (k) for (k = y(k), c = Math.max(k.length, this.background.length || 0), g = 0; g < c; g++)k[g] && this.axis ? this.renderBackground(n(this.defaultBackgroundOptions, k[g]), g) : this.background[g] && (this.background[g] = this.background[g].destroy(),
                        this.background.splice(g, 1))
                } renderBackground(c, k) { let g = "animate", G = { "class": "highcharts-pane " + (c.className || "") }; this.chart.styledMode || v(G, { fill: c.backgroundColor, stroke: c.borderColor, "stroke-width": c.borderWidth }); this.background[k] || (this.background[k] = this.chart.renderer.path().add(this.group), g = "attr"); this.background[k][g]({ d: this.axis.getPlotBandPath(c.from, c.to, c) }).attr(G) } updateCenter(c) { this.center = (c || this.axis || {}).center = d.getCenter.call(this) } update(c, k) {
                    n(!0, this.options, c); this.setOptions(this.options);
                    this.render(); this.chart.axes.forEach(function (c) { c.pane === this && (c.pane = null, c.update({}, k)) }, this)
                }
            } a.prototype.getHoverPane = function (c) { const k = this; let g; c && k.pane.forEach(G => { m(c.chartX - k.plotLeft, c.chartY - k.plotTop, G.center) && (g = G) }); return g }; h(a, "afterIsInsidePlot", function (c) { this.polar && (c.options.inverted && ([c.x, c.y] = [c.y, c.x]), c.isInsidePlot = this.pane.some(k => m(c.x, c.y, k.center, k.axis && k.axis.normalizedStartAngleRad, k.axis && k.axis.normalizedEndAngleRad))) }); h(b, "beforeGetHoverData", function (c) {
                const k =
                    this.chart; k.polar ? (k.hoverPane = k.getHoverPane(c), c.filter = function (g) { return g.visible && !(!c.shared && g.directTouch) && D(g.options.enableMouseTracking, !0) && (!k.hoverPane || g.xAxis.pane === k.hoverPane) }) : k.hoverPane = void 0
            }); h(b, "afterGetHoverData", function (c) { const k = this.chart; c.hoverPoint && c.hoverPoint.plotX && c.hoverPoint.plotY && k.hoverPane && !m(c.hoverPoint.plotX, c.hoverPoint.plotY, k.hoverPane.center) && (c.hoverPoint = void 0) }); e.Pane = g; return e.Pane
        }); t(b, "Series/AreaRange/AreaRangePoint.js", [b["Core/Series/SeriesRegistry.js"],
        b["Core/Utilities.js"]], function (a, d) {
            const { area: { prototype: { pointClass: e, pointClass: { prototype: b } } } } = a.seriesTypes, { defined: f, isNumber: m } = d; class q extends e {
                constructor() { super(...arguments); this.series = this.plotX = this.options = this.low = this.high = void 0 } setState() {
                    const d = this.state, a = this.series, e = a.chart.polar; f(this.plotHigh) || (this.plotHigh = a.yAxis.toPixels(this.high, !0)); f(this.plotLow) || (this.plotLow = this.plotY = a.yAxis.toPixels(this.low, !0)); a.stateMarkerGraphic && (a.lowerStateMarkerGraphic =
                        a.stateMarkerGraphic, a.stateMarkerGraphic = a.upperStateMarkerGraphic); this.graphic = this.graphics && this.graphics[1]; this.plotY = this.plotHigh; e && m(this.plotHighX) && (this.plotX = this.plotHighX); b.setState.apply(this, arguments); this.state = d; this.plotY = this.plotLow; this.graphic = this.graphics && this.graphics[0]; e && m(this.plotLowX) && (this.plotX = this.plotLowX); a.stateMarkerGraphic && (a.upperStateMarkerGraphic = a.stateMarkerGraphic, a.stateMarkerGraphic = a.lowerStateMarkerGraphic, a.lowerStateMarkerGraphic = void 0);
                    b.setState.apply(this, arguments)
                } haloPath() { const a = this.series.chart.polar; let d = []; this.plotY = this.plotLow; a && m(this.plotLowX) && (this.plotX = this.plotLowX); this.isInside && (d = b.haloPath.apply(this, arguments)); this.plotY = this.plotHigh; a && m(this.plotHighX) && (this.plotX = this.plotHighX); this.isTopInside && (d = d.concat(b.haloPath.apply(this, arguments))); return d } isValid() { return m(this.low) && m(this.high) }
            } return q
        }); t(b, "Series/AreaRange/AreaRangeSeries.js", [b["Series/AreaRange/AreaRangePoint.js"], b["Core/Globals.js"],
        b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, b, h) {
            ({ noop: d } = d); const { area: e, area: { prototype: m }, column: { prototype: q } } = b.seriesTypes, { addEvent: u, defined: C, extend: v, isArray: n, isNumber: D, pick: y, merge: g } = h; class c extends e {
                constructor() { super(...arguments); this.xAxis = this.lowerStateMarkerGraphic = this.points = this.options = this.data = void 0 } toYData(c) { return [c.low, c.high] } highToXY(c) {
                    const k = this.chart, g = this.xAxis.postTranslate(c.rectPlotX || 0, this.yAxis.len - (c.plotHigh || 0)); c.plotHighX =
                        g.x - k.plotLeft; c.plotHigh = g.y - k.plotTop; c.plotLowX = c.plotX
                } getGraphPath(c) {
                    var g = [], k = []; const a = m.getGraphPath; var d = this.options; const b = this.chart.polar, p = b && !1 !== d.connectEnds, e = d.connectNulls; let f, h, v, l = d.step; c = c || this.points; for (f = c.length; f--;) {
                        h = c[f]; const l = b ? { plotX: h.rectPlotX, plotY: h.yBottom, doCurve: !1 } : { plotX: h.plotX, plotY: h.plotY, doCurve: !1 }; h.isNull || p || e || c[f + 1] && !c[f + 1].isNull || k.push(l); v = {
                            polarPlotY: h.polarPlotY, rectPlotX: h.rectPlotX, yBottom: h.yBottom, plotX: y(h.plotHighX, h.plotX),
                            plotY: h.plotHigh, isNull: h.isNull
                        }; k.push(v); g.push(v); h.isNull || p || e || c[f - 1] && !c[f - 1].isNull || k.push(l)
                    } c = a.call(this, c); l && (!0 === l && (l = "left"), d.step = { left: "right", center: "center", right: "left" }[l]); g = a.call(this, g); k = a.call(this, k); d.step = l; d = [].concat(c, g); !this.chart.polar && k[0] && "M" === k[0][0] && (k[0] = ["L", k[0][1], k[0][2]]); this.graphPath = d; this.areaPath = c.concat(k); d.isArea = !0; d.xMap = c.xMap; this.areaPath.xMap = c.xMap; return d
                } drawDataLabels() {
                    const c = this.points, g = c.length, d = [], a = this.options.dataLabels,
                    b = this.chart.inverted; let e, p, f, h, F; if (a) {
                        n(a) ? (h = a[0] || { enabled: !1 }, F = a[1] || { enabled: !1 }) : (h = v({}, a), h.x = a.xHigh, h.y = a.yHigh, F = v({}, a), F.x = a.xLow, F.y = a.yLow); if (h.enabled || this._hasPointLabels) {
                            for (e = g; e--;)if (p = c[e]) { const { plotHigh: c = 0, plotLow: l = 0 } = p; f = h.inside ? c < l : c > l; p.y = p.high; p._plotY = p.plotY; p.plotY = c; d[e] = p.dataLabel; p.dataLabel = p.dataLabelUpper; p.below = f; b ? h.align || (h.align = f ? "right" : "left") : h.verticalAlign || (h.verticalAlign = f ? "top" : "bottom") } this.options.dataLabels = h; m.drawDataLabels &&
                                m.drawDataLabels.apply(this, arguments); for (e = g; e--;)if (p = c[e]) p.dataLabelUpper = p.dataLabel, p.dataLabel = d[e], delete p.dataLabels, p.y = p.low, p.plotY = p._plotY
                        } if (F.enabled || this._hasPointLabels) { for (e = g; e--;)if (p = c[e]) { const { plotHigh: c = 0, plotLow: l = 0 } = p; f = F.inside ? c < l : c > l; p.below = !f; b ? F.align || (F.align = f ? "left" : "right") : F.verticalAlign || (F.verticalAlign = f ? "bottom" : "top") } this.options.dataLabels = F; m.drawDataLabels && m.drawDataLabels.apply(this, arguments) } if (h.enabled) for (e = g; e--;)if (p = c[e]) p.dataLabels =
                            [p.dataLabelUpper, p.dataLabel].filter(function (c) { return !!c }); this.options.dataLabels = a
                    }
                } alignDataLabel() { q.alignDataLabel.apply(this, arguments) } drawPoints() {
                    const c = this.points.length; let g, a; m.drawPoints.apply(this, arguments); for (g = 0; g < c;) {
                        a = this.points[g]; a.graphics = a.graphics || []; a.origProps = { plotY: a.plotY, plotX: a.plotX, isInside: a.isInside, negative: a.negative, zone: a.zone, y: a.y }; if (a.graphic || a.graphics[0]) a.graphics[0] = a.graphic; a.graphic = a.graphics[1]; a.plotY = a.plotHigh; C(a.plotHighX) && (a.plotX =
                            a.plotHighX); a.y = y(a.high, a.origProps.y); a.negative = a.y < (this.options.threshold || 0); this.zones.length && (a.zone = a.getZone()); this.chart.polar || (a.isInside = a.isTopInside = "undefined" !== typeof a.plotY && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len); g++
                    } m.drawPoints.apply(this, arguments); for (g = 0; g < c;) { a = this.points[g]; a.graphics = a.graphics || []; if (a.graphic || a.graphics[1]) a.graphics[1] = a.graphic; a.graphic = a.graphics[0]; a.origProps && (v(a, a.origProps), delete a.origProps); g++ }
                }
            }
            c.defaultOptions = g(e.defaultOptions, { lineWidth: 1, threshold: null, tooltip: { pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' }, trackByArea: !0, dataLabels: { align: void 0, verticalAlign: void 0, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 } }); u(c, "afterTranslate", function () {
                "low,high" === this.pointArrayMap.join(",") && this.points.forEach(c => {
                    const g = c.high, a = c.plotY; c.isNull ? c.plotY = void 0 : (c.plotLow = a, c.plotHigh = D(g) ? this.yAxis.translate(this.dataModify ?
                        this.dataModify.modifyValue(g) : g, !1, !0, void 0, !0) : void 0, this.dataModify && (c.yBottom = c.plotHigh))
                })
            }, { order: 0 }); u(c, "afterTranslate", function () { this.points.forEach(c => { if (this.chart.polar) this.highToXY(c), c.plotLow = c.plotY, c.tooltipPos = [((c.plotHighX || 0) + (c.plotLowX || 0)) / 2, ((c.plotHigh || 0) + (c.plotLow || 0)) / 2]; else { const g = c.pos(!1, c.plotLow), a = c.pos(!1, c.plotHigh); g && a && (g[0] = (g[0] + a[0]) / 2, g[1] = (g[1] + a[1]) / 2); c.tooltipPos = g } }) }, { order: 3 }); v(c.prototype, {
                deferTranslatePolar: !0, pointArrayMap: ["low",
                    "high"], pointClass: a, pointValKey: "low", setStackedPoints: d
            }); b.registerSeriesType("arearange", c); ""; return c
        }); t(b, "Series/AreaSplineRange/AreaSplineRangeSeries.js", [b["Series/AreaRange/AreaRangeSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, e) {
            const { spline: { prototype: b } } = d.seriesTypes, { merge: f, extend: m } = e; class q extends a { constructor() { super(...arguments); this.points = this.data = this.options = void 0 } } q.defaultOptions = f(a.defaultOptions); m(q.prototype, { getPointSpline: b.getPointSpline });
            d.registerSeriesType("areasplinerange", q); ""; return q
        }); t(b, "Series/BoxPlot/BoxPlotSeries.js", [b["Series/Column/ColumnSeries.js"], b["Core/Globals.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, e, b) {
            ({ noop: d } = d); const { extend: f, merge: h, pick: q } = b; class u extends a {
                constructor() { super(...arguments); this.points = this.options = this.data = void 0 } pointAttribs() { return {} } translate() {
                    const a = this.yAxis, d = this.pointArrayMap; super.translate.apply(this); this.points.forEach(function (e) {
                        d.forEach(function (d) {
                            null !==
                            e[d] && (e[d + "Plot"] = a.translate(e[d], 0, 1, 0, 1))
                        }); e.plotHigh = e.highPlot
                    })
                } drawPoints() {
                    let a = this, d = a.options, e = a.chart, b = e.renderer, f, g, c, k, r, h, z = 0, m, A, p, Q, N = !1 !== a.doQuartiles, F, I = a.options.whiskerLength; a.points.forEach(function (l) {
                        var B = l.graphic; let H = B ? "animate" : "attr", M = l.shapeArgs, J = {}, O = {}, G = {}, P = {}, n = l.color || a.color; "undefined" !== typeof l.plotY && (m = Math.round(M.width), A = Math.floor(M.x), p = A + m, Q = Math.round(m / 2), f = Math.floor(N ? l.q1Plot : l.lowPlot), g = Math.floor(N ? l.q3Plot : l.lowPlot), c = Math.floor(l.highPlot),
                            k = Math.floor(l.lowPlot), B || (l.graphic = B = b.g("point").add(a.group), l.stem = b.path().addClass("highcharts-boxplot-stem").add(B), I && (l.whiskers = b.path().addClass("highcharts-boxplot-whisker").add(B)), N && (l.box = b.path(void 0).addClass("highcharts-boxplot-box").add(B)), l.medianShape = b.path(void 0).addClass("highcharts-boxplot-median").add(B)), e.styledMode || (O.stroke = l.stemColor || d.stemColor || n, O["stroke-width"] = q(l.stemWidth, d.stemWidth, d.lineWidth), O.dashstyle = l.stemDashStyle || d.stemDashStyle || d.dashStyle,
                                l.stem.attr(O), I && (G.stroke = l.whiskerColor || d.whiskerColor || n, G["stroke-width"] = q(l.whiskerWidth, d.whiskerWidth, d.lineWidth), G.dashstyle = l.whiskerDashStyle || d.whiskerDashStyle || d.dashStyle, l.whiskers.attr(G)), N && (J.fill = l.fillColor || d.fillColor || n, J.stroke = d.lineColor || n, J["stroke-width"] = d.lineWidth || 0, J.dashstyle = l.boxDashStyle || d.boxDashStyle || d.dashStyle, l.box.attr(J)), P.stroke = l.medianColor || d.medianColor || n, P["stroke-width"] = q(l.medianWidth, d.medianWidth, d.lineWidth), P.dashstyle = l.medianDashStyle ||
                                d.medianDashStyle || d.dashStyle, l.medianShape.attr(P)), h = l.stem.strokeWidth() % 2 / 2, z = A + Q + h, B = [["M", z, g], ["L", z, c], ["M", z, f], ["L", z, k]], l.stem[H]({ d: B }), N && (h = l.box.strokeWidth() % 2 / 2, f = Math.floor(f) + h, g = Math.floor(g) + h, A += h, p += h, B = [["M", A, g], ["L", A, f], ["L", p, f], ["L", p, g], ["L", A, g], ["Z"]], l.box[H]({ d: B })), I && (h = l.whiskers.strokeWidth() % 2 / 2, c += h, k += h, F = /%$/.test(I) ? Q * parseFloat(I) / 100 : I / 2, B = [["M", z - F, c], ["L", z + F, c], ["M", z - F, k], ["L", z + F, k]], l.whiskers[H]({ d: B })), r = Math.round(l.medianPlot), h = l.medianShape.strokeWidth() %
                                2 / 2, r += h, B = [["M", A, r], ["L", p, r]], l.medianShape[H]({ d: B }))
                    })
                } toYData(a) { return [a.low, a.q1, a.median, a.q3, a.high] }
            } u.defaultOptions = h(a.defaultOptions, { threshold: null, tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> <b>{series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>' }, whiskerLength: "50%", fillColor: "#ffffff", lineWidth: 1, medianWidth: 2, whiskerWidth: 2 }); f(u.prototype, {
                pointArrayMap: ["low",
                    "q1", "median", "q3", "high"], pointValKey: "high", drawDataLabels: d, setStackedPoints: d
            }); e.registerSeriesType("boxplot", u); ""; return u
        }); t(b, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
            return {
                borderColor: void 0, borderWidth: 2, className: void 0, color: void 0, connectorClassName: void 0, connectorColor: void 0, connectorDistance: 60, connectorWidth: 1, enabled: !1, labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: "0.9em", color: "#000000" }, x: 0, y: 0 }, maxSize: 60, minSize: 10,
                legendIndex: 0, ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 }, sizeBy: "area", sizeByAbsoluteValue: !1, zIndex: 1, zThreshold: 0
            }
        }); t(b, "Series/Bubble/BubbleLegendItem.js", [b["Core/Color/Color.js"], b["Core/Templating.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (a, d, e, b) {
            const { parse: f } = a, { noop: h } = e, { arrayMax: q, arrayMin: u, isNumber: C, merge: v, pick: n, stableSort: D } = b; class y {
                constructor(a, c) {
                    this.options = this.symbols = this.visible = this.selected = this.ranges = this.movementX =
                        this.maxLabel = this.legend = this.chart = void 0; this.setState = h; this.init(a, c)
                } init(a, c) { this.options = a; this.visible = !0; this.chart = c.chart; this.legend = c } addToLegend(a) { a.splice(this.options.legendIndex, 0, this) } drawLegendSymbol(a) {
                    const c = n(a.options.itemDistance, 20), g = this.legendItem || {}, d = this.options; var e = d.ranges, b = d.connectorDistance; if (e && e.length && C(e[0].value)) {
                        D(e, function (c, a) { return a.value - c.value }); this.ranges = e; this.setOptions(); this.render(); a = this.getMaxLabelSize(); var f = this.ranges[0].radius;
                        e = 2 * f; b = b - f + a.width; b = 0 < b ? b : 0; this.maxLabel = a; this.movementX = "left" === d.labels.align ? b : 0; g.labelWidth = e + b + c; g.labelHeight = e + a.height / 2
                    } else a.options.bubbleLegend.autoRanges = !0
                } setOptions() {
                    const a = this.ranges, c = this.options, d = this.chart.series[c.seriesIndex], e = this.legend.baseline, b = { zIndex: c.zIndex, "stroke-width": c.borderWidth }, h = { zIndex: c.zIndex, "stroke-width": c.connectorWidth }, m = { align: this.legend.options.rtl || "left" === c.labels.align ? "right" : "left", zIndex: c.zIndex }, A = d.options.marker.fillOpacity,
                    p = this.chart.styledMode; a.forEach(function (g, k) { p || (b.stroke = n(g.borderColor, c.borderColor, d.color), b.fill = n(g.color, c.color, 1 !== A ? f(d.color).setOpacity(A).get("rgba") : d.color), h.stroke = n(g.connectorColor, c.connectorColor, d.color)); a[k].radius = this.getRangeRadius(g.value); a[k] = v(a[k], { center: a[0].radius - a[k].radius + e }); p || v(!0, a[k], { bubbleAttribs: v(b), connectorAttribs: v(h), labelAttribs: m }) }, this)
                } getRangeRadius(a) {
                    const c = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this,
                        c.ranges[c.ranges.length - 1].value, c.ranges[0].value, c.minSize, c.maxSize, a)
                } render() { const a = this.legendItem || {}, c = this.chart.renderer, d = this.options.zThreshold; this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] }); a.symbol = c.g("bubble-legend"); a.label = c.g("bubble-legend-item").css(this.legend.itemStyle || {}); a.symbol.translateX = 0; a.symbol.translateY = 0; a.symbol.add(a.label); a.label.add(a.group); for (const c of this.ranges) c.value >= d && this.renderRange(c); this.hideOverlappingLabels() } renderRange(a) {
                    var c =
                        this.options; const d = c.labels; var g = this.chart; const e = g.series[c.seriesIndex], b = g.renderer, f = this.symbols; g = f.labels; const h = a.center, p = Math.abs(a.radius); var m = c.connectorDistance || 0; const n = d.align, F = c.connectorWidth, q = this.ranges[0].radius || 0, l = h - p - c.borderWidth / 2 + F / 2, B = b.styledMode; m = this.legend.options.rtl || "left" === n ? -m : m; "center" === n && (m = 0, c.connectorDistance = 0, a.labelAttribs.align = "center"); f.bubbleItems.push(b.circle(q, h + ((l % 1 ? 1 : .5) - (F % 2 ? 0 : .5)), p).attr(B ? {} : a.bubbleAttribs).addClass((B ?
                            "highcharts-color-" + e.colorIndex + " " : "") + "highcharts-bubble-legend-symbol " + (c.className || "")).add(this.legendItem.symbol)); f.connectors.push(b.path(b.crispLine([["M", q, l], ["L", q + m, l]], c.connectorWidth)).attr(B ? {} : a.connectorAttribs).addClass((B ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (c.connectorClassName || "")).add(this.legendItem.symbol)); a = b.text(this.formatLabel(a)).attr(B ? {} : a.labelAttribs).css(B ? {} : d.style).addClass("highcharts-bubble-legend-labels " +
                                (c.labels.className || "")).add(this.legendItem.symbol); c = { x: q + m + c.labels.x, y: l + c.labels.y + .4 * a.getBBox().height }; a.attr(c); g.push(a); a.placed = !0; a.alignAttr = c
                } getMaxLabelSize() { let a, c; this.symbols.labels.forEach(function (d) { c = d.getBBox(!0); a = a ? c.width > a.width ? c : a : c }); return a || {} } formatLabel(a) { var c = this.options; const g = c.labels.formatter; c = c.labels.format; const { numberFormatter: b } = this.chart; return c ? d.format(c, a) : g ? g.call(a) : b(a.value, 1) } hideOverlappingLabels() {
                    const a = this.chart, c = this.symbols;
                    !this.options.labels.allowOverlap && c && (a.hideOverlappingLabels(c.labels), c.labels.forEach(function (a, d) { a.newOpacity ? a.newOpacity !== a.oldOpacity && c.connectors[d].show() : c.connectors[d].hide() }))
                } getRanges() {
                    const a = this.legend.bubbleLegend, c = a.options.ranges; let d, b, e = Number.MAX_VALUE, f = -Number.MAX_VALUE; a.chart.series.forEach(function (c) {
                        c.isBubble && !c.ignoreSeries && (b = c.zData.filter(C), b.length && (e = n(c.options.zMin, Math.min(e, Math.max(u(b), !1 === c.options.displayNegative ? c.options.zThreshold : -Number.MAX_VALUE))),
                            f = n(c.options.zMax, Math.max(f, q(b)))))
                    }); d = e === f ? [{ value: f }] : [{ value: e }, { value: (e + f) / 2 }, { value: f, autoRanges: !0 }]; c.length && c[0].radius && d.reverse(); d.forEach(function (a, g) { c && c[g] && (d[g] = v(c[g], a)) }); return d
                } predictBubbleSizes() {
                    var a = this.chart, c = a.legend.options, d = c.floating; const b = (c = "horizontal" === c.layout) ? a.legend.lastLineHeight : 0, e = a.plotSizeX, f = a.plotSizeY; var h = a.series[this.options.seriesIndex], m = h.getPxExtremes(); a = Math.ceil(m.minPxSize); m = Math.ceil(m.maxPxSize); const p = Math.min(f, e);
                    h = h.options.maxSize; if (d || !/%$/.test(h)) d = m; else if (h = parseFloat(h), d = (p + b) * h / 100 / (h / 100 + 1), c && f - d >= e || !c && e - d >= f) d = m; return [a, Math.ceil(d)]
                } updateRanges(a, c) { const d = this.legend.options.bubbleLegend; d.minSize = a; d.maxSize = c; d.ranges = this.getRanges() } correctSizes() { const a = this.legend, c = this.chart.series[this.options.seriesIndex].getPxExtremes(); 1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, c.maxPxSize), a.render()) }
            } ""; return y
        }); t(b, "Series/Bubble/BubbleLegendComposition.js",
            [b["Series/Bubble/BubbleLegendDefaults.js"], b["Series/Bubble/BubbleLegendItem.js"], b["Core/Defaults.js"], b["Core/Utilities.js"]], function (a, d, e, b) {
                function f(c, a, d) {
                    const g = this.legend; var b = 0 <= h(this); let e, f; g && g.options.enabled && g.bubbleLegend && g.options.bubbleLegend.autoRanges && b ? (e = g.bubbleLegend.options, b = g.bubbleLegend.predictBubbleSizes(), g.bubbleLegend.updateRanges(b[0], b[1]), e.placed || (g.group.placed = !1, g.allItems.forEach(c => { f = c.legendItem || {}; f.group && (f.group.translateY = null) })), g.render(),
                        this.getMargins(), this.axes.forEach(function (c) { c.visible && c.render(); e.placed || (c.setScale(), c.updateNames(), y(c.ticks, function (c) { c.isNew = !0; c.isNewLabel = !0 })) }), e.placed = !0, this.getMargins(), c.call(this, a, d), g.bubbleLegend.correctSizes(), v(g, q(g))) : (c.call(this, a, d), g && g.options.enabled && g.bubbleLegend && (g.render(), v(g, q(g))))
                } function h(c) { c = c.series; let a = 0; for (; a < c.length;) { if (c[a] && c[a].isBubble && c[a].visible && c[a].zData.length) return a; a++ } return -1 } function q(c) {
                    c = c.allItems; const a = [], d =
                        c.length; let g, b, e = 0; for (b = 0; b < d; b++) { var f = c[b].legendItem || {}; g = (c[b + 1] || {}).legendItem || {}; f.labelHeight && (c[b].itemHeight = f.labelHeight); if (c[b] === c[d - 1] || f.y !== g.y) { a.push({ height: 0 }); f = a[a.length - 1]; for (e; e <= b; e++)c[e].itemHeight > f.height && (f.height = c[e].itemHeight); f.step = b } } return a
                } function u(c) {
                    const a = this.bubbleLegend, g = this.options, b = g.bubbleLegend, e = h(this.chart); a && a.ranges && a.ranges.length && (b.ranges.length && (b.autoRanges = !!b.ranges[0].autoRanges), this.destroyItem(a)); 0 <= e && g.enabled &&
                        b.enabled && (b.seriesIndex = e, this.bubbleLegend = new d(b, this), this.bubbleLegend.addToLegend(c.allItems))
                } function C(c) { if (c.defaultPrevented) return !1; var a = this.chart; c = this.visible; const d = this.chart.legend; d && d.bubbleLegend && (this.visible = !c, this.ignoreSeries = c, a = 0 <= h(a), d.bubbleLegend.visible !== a && (d.update({ bubbleLegend: { enabled: a } }), d.bubbleLegend.visible = a), this.visible = c) } function v(c, a) {
                    const d = c.options.rtl; let g, b, e, f, h = 0; c.allItems.forEach((c, k) => {
                        f = c.legendItem || {}; if (f.group) {
                            g = f.group.translateX ||
                            0; b = f.y || 0; if ((e = c.movementX) || d && c.ranges) e = d ? g - c.options.maxSize / 2 : g + e, f.group.attr({ translateX: e }); k > a[h].step && h++; f.group.attr({ translateY: Math.round(b + a[h].height / 2) }); f.y = b + a[h].height / 2
                        }
                    })
                } const { setOptions: n } = e, { addEvent: D, objectEach: y, wrap: g } = b, c = []; return { compose: function (d, e, h) { b.pushUnique(c, d) && (n({ legend: { bubbleLegend: a } }), g(d.prototype, "drawChartBox", f)); b.pushUnique(c, e) && D(e, "afterGetAllItems", u); b.pushUnique(c, h) && D(h, "legendItemClick", C) } }
            }); t(b, "Series/Bubble/BubblePoint.js",
                [b["Core/Series/Point.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, b) { ({ seriesTypes: { scatter: { prototype: { pointClass: d } } } } = d); ({ extend: b } = b); class e extends d { constructor() { super(...arguments); this.series = this.options = void 0 } haloPath(d) { return a.prototype.haloPath.call(this, 0 === d ? 0 : (this.marker ? this.marker.radius || 0 : 0) + d) } } b(e.prototype, { ttBelow: !1 }); return e }); t(b, "Series/Bubble/BubbleSeries.js", [b["Series/Bubble/BubbleLegendComposition.js"], b["Series/Bubble/BubblePoint.js"],
                b["Core/Color/Color.js"], b["Core/Globals.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, b, h, f, m) {
                    function e() {
                        const c = this.len, a = this.chart, d = this.isXAxis, g = d ? "xData" : "yData", b = this.min, l = this.max - b; let e = 0, f = c, h = c / l, k; this.series.forEach(c => {
                            if (c.bubblePadding && (c.visible || !a.options.chart.ignoreHiddenSeries)) {
                                k = this.allowZoomOutside = !0; const a = c[g]; d && ((c.onPoint || c).getRadii(0, 0, c), c.onPoint && (c.radii = c.onPoint.radii)); if (0 < l) {
                                    let d = a.length; for (; d--;)if (r(a[d]) &&
                                        this.dataMin <= a[d] && a[d] <= this.max) { const l = c.radii && c.radii[d] || 0; e = Math.min((a[d] - b) * h - l, e); f = Math.max((a[d] - b) * h + l, f) }
                                }
                            }
                        }); k && 0 < l && !this.logarithmic && (f -= c, h *= (c + Math.max(0, e) - Math.min(f, c)) / c, [["min", "userMin", e], ["max", "userMax", f]].forEach(c => { "undefined" === typeof z(this.options[c[0]], this[c[1]]) && (this[c[0]] += c[2] / h) }))
                    } const { parse: u } = b; ({ noop: b } = h); const { series: C, seriesTypes: { column: { prototype: v }, scatter: n } } = f, { addEvent: D, arrayMax: y, arrayMin: g, clamp: c, extend: k, isNumber: r, merge: G, pick: z } =
                        m, P = []; class A extends n {
                            constructor() { super(...arguments); this.zData = this.yData = this.radii = this.points = this.options = this.minPxSize = this.maxPxSize = this.data = void 0 } static compose(c, d, g, b) { a.compose(d, g, b); m.pushUnique(P, c) && (c.prototype.beforePadding = e) } animate(c) {
                                !c && this.points.length < this.options.animationLimit && this.points.forEach(function (c) { const { graphic: a } = c; a && a.width && (this.hasRendered || a.attr({ x: c.plotX, y: c.plotY, width: 1, height: 1 }), a.animate(this.markerAttribs(c), this.options.animation)) },
                                    this)
                            } getRadii() {
                                const c = this.zData, a = this.yData, d = []; let g, b, l, e = this.chart.bubbleZExtremes; const { minPxSize: f, maxPxSize: h } = this.getPxExtremes(); if (!e) { let c = Number.MAX_VALUE, a = -Number.MAX_VALUE, d; this.chart.series.forEach(l => { l.bubblePadding && (l.visible || !this.chart.options.chart.ignoreHiddenSeries) && (l = (l.onPoint || l).getZExtremes()) && (c = Math.min(z(c, l.zMin), l.zMin), a = Math.max(z(a, l.zMax), l.zMax), d = !0) }); d ? (e = { zMin: c, zMax: a }, this.chart.bubbleZExtremes = e) : e = { zMin: 0, zMax: 0 } } b = 0; for (g = c.length; b < g; b++)l =
                                    c[b], d.push(this.getRadius(e.zMin, e.zMax, f, h, l, a && a[b])); this.radii = d
                            } getRadius(c, a, d, b, g, l) { const e = this.options, f = "width" !== e.sizeBy, h = e.zThreshold; let k = a - c, p = .5; if (null === l || null === g) return null; if (r(g)) { e.sizeByAbsoluteValue && (g = Math.abs(g - h), k = Math.max(a - h, Math.abs(c - h)), c = 0); if (g < c) return d / 2 - 1; 0 < k && (p = (g - c) / k) } f && 0 <= p && (p = Math.sqrt(p)); return Math.ceil(d + p * (b - d)) / 2 } hasData() { return !!this.processedXData.length } pointAttribs(c, a) {
                                const d = this.options.marker.fillOpacity; c = C.prototype.pointAttribs.call(this,
                                    c, a); 1 !== d && (c.fill = u(c.fill).setOpacity(d).get("rgba")); return c
                            } translate() { super.translate.call(this); this.getRadii(); this.translateBubble() } translateBubble() {
                                const { data: c, options: a, radii: d } = this, { minPxSize: g } = this.getPxExtremes(); let b = c.length; for (; b--;) {
                                    const l = c[b], e = d ? d[b] : 0; "z" === this.zoneAxis && (l.negative = (l.z || 0) < (a.zThreshold || 0)); r(e) && e >= g / 2 ? (l.marker = k(l.marker, { radius: e, width: 2 * e, height: 2 * e }), l.dlBox = { x: l.plotX - e, y: l.plotY - e, width: 2 * e, height: 2 * e }) : (l.shapeArgs = l.plotY = l.dlBox = void 0,
                                        l.isInside = !1)
                                }
                            } getPxExtremes() { const c = Math.min(this.chart.plotWidth, this.chart.plotHeight); var a = a => { let d; "string" === typeof a && (d = /%$/.test(a), a = parseInt(a, 10)); return d ? c * a / 100 : a }; const d = a(z(this.options.minSize, 8)); a = Math.max(a(z(this.options.maxSize, "20%")), d); return { minPxSize: d, maxPxSize: a } } getZExtremes() {
                                var a = this.options; const d = (this.zData || []).filter(r); if (d.length) {
                                    const b = z(a.zMin, c(g(d), !1 === a.displayNegative ? a.zThreshold || 0 : -Number.MAX_VALUE, Number.MAX_VALUE)); a = z(a.zMax, y(d)); if (r(b) &&
                                        r(a)) return { zMin: b, zMax: a }
                                }
                            }
                    } A.defaultOptions = G(n.defaultOptions, {
                        dataLabels: { formatter: function () { const { numberFormatter: c } = this.series.chart, { z: a } = this.point; return r(a) ? c(a, -1) : "" }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0,
                        zoneAxis: "z"
                    }); k(A.prototype, { alignDataLabel: v.alignDataLabel, applyZones: b, bubblePadding: !0, buildKDTree: b, directTouch: !0, isBubble: !0, pointArrayMap: ["y", "z"], pointClass: d, parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", zoneAxis: "z" }); D(A, "updatedData", c => { delete c.target.chart.bubbleZExtremes }); D(A, "remove", c => { delete c.target.chart.bubbleZExtremes }); f.registerSeriesType("bubble", A); ""; ""; return A
                }); t(b, "Series/ColumnRange/ColumnRangePoint.js", [b["Core/Series/SeriesRegistry.js"],
                b["Core/Utilities.js"]], function (a, d) { const { seriesTypes: { column: { prototype: { pointClass: { prototype: b } } }, arearange: { prototype: { pointClass: h } } } } = a, { extend: f, isNumber: m } = d; class q extends h { constructor() { super(...arguments); this.series = this.options = void 0 } isValid() { return m(this.low) } } f(q.prototype, { setState: b.setState }); return q }); t(b, "Series/ColumnRange/ColumnRangeSeries.js", [b["Series/ColumnRange/ColumnRangePoint.js"], b["Core/Globals.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]],
                    function (a, d, b, h) {
                        ({ noop: d } = d); const { seriesTypes: { arearange: e, column: m, column: { prototype: q } } } = b, { addEvent: u, clamp: C, extend: v, isNumber: n, merge: D, pick: y } = h; class g extends e {
                            setOptions() { D(!0, arguments[0], { stacking: void 0 }); return e.prototype.setOptions.apply(this, arguments) } translate() { return q.translate.apply(this) } pointAttribs() { return q.pointAttribs.apply(this, arguments) } translate3dPoints() { return q.translate3dPoints.apply(this, arguments) } translate3dShapes() {
                                return q.translate3dShapes.apply(this,
                                    arguments)
                            } afterColumnTranslate() {
                                const c = this.yAxis, a = this.xAxis, d = a.startAngleRad, b = this.chart, g = this.xAxis.isRadial, e = Math.max(b.chartWidth, b.chartHeight) + 999; let f, h, m, q; this.points.forEach(k => {
                                    const p = k.shapeArgs || {}, l = this.options.minPointLength, B = k.plotY, H = c.translate(k.high, 0, 1, 0, 1); if (n(H) && n(B)) if (k.plotHigh = C(H, -e, e), k.plotLow = C(B, -e, e), q = k.plotHigh, f = y(k.rectPlotY, k.plotY) - k.plotHigh, Math.abs(f) < l ? (h = l - f, f += h, q -= h / 2) : 0 > f && (f *= -1, q -= f), g && this.polar) m = k.barX + d, k.shapeType = "arc", k.shapeArgs =
                                        this.polar.arc(q + f, q, m, m + k.pointWidth); else { p.height = f; p.y = q; const { x: d = 0, width: l = 0 } = p; k.shapeArgs = D(k.shapeArgs, this.crispCol(d, q, l, f)); k.tooltipPos = b.inverted ? [c.len + c.pos - b.plotLeft - q - f / 2, a.len + a.pos - b.plotTop - d - l / 2, f] : [a.left - b.plotLeft + d + l / 2, c.pos - b.plotTop + q + f / 2, f] }
                                })
                            }
                        } g.defaultOptions = D(m.defaultOptions, e.defaultOptions, { borderRadius: { where: "all" }, pointRange: null, marker: null, states: { hover: { halo: !1 } } }); u(g, "afterColumnTranslate", function () { g.prototype.afterColumnTranslate.apply(this) }, { order: 5 });
                        v(g.prototype, { directTouch: !0, pointClass: a, trackerGroups: ["group", "dataLabelsGroup"], adjustForMissingColumns: q.adjustForMissingColumns, animate: q.animate, crispCol: q.crispCol, drawGraph: d, drawPoints: q.drawPoints, getSymbol: d, drawTracker: q.drawTracker, getColumnMetrics: q.getColumnMetrics }); b.registerSeriesType("columnrange", g); ""; return g
                    }); t(b, "Series/ColumnPyramid/ColumnPyramidSeries.js", [b["Series/Column/ColumnSeries.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, b) {
                        const { prototype: e } =
                            a, { clamp: f, merge: m, pick: q } = b; class u extends a {
                                constructor() { super(...arguments); this.points = this.options = this.data = void 0 } translate() {
                                    let a = this, d = a.chart, b = a.options; var h = a.dense = 2 > a.closestPointRange * a.xAxis.transA; h = a.borderWidth = q(b.borderWidth, h ? 0 : 1); let m = a.yAxis, g = b.threshold, c = a.translatedThreshold = m.getThreshold(g), k = q(b.minPointLength, 5), r = a.getColumnMetrics(), u = r.width, z = a.barW = Math.max(u, 1 + 2 * h), P = a.pointXOffset = r.offset; d.inverted && (c -= .5); b.pointPadding && (z = Math.ceil(z)); e.translate.apply(a);
                                    a.points.forEach(function (e) {
                                        var h = q(e.yBottom, c), n = 999 + Math.abs(h), r = f(e.plotY, -n, m.len + n); n = e.plotX + P; let v = z / 2, A = Math.min(r, h); h = Math.max(r, h) - A; var l; let B, H; e.barX = n; e.pointWidth = u; e.tooltipPos = d.inverted ? [m.len + m.pos - d.plotLeft - r, a.xAxis.len - n - v, h] : [n + v, r + m.pos - d.plotTop, h]; r = g + (e.total || e.y); "percent" === b.stacking && (r = g + (0 > e.y) ? -100 : 100); r = m.toPixels(r, !0); var M = (l = d.plotHeight - r - (d.plotHeight - c)) ? v * (A - r) / l : 0; var J = l ? v * (A + h - r) / l : 0; l = n - M + v; M = n + M + v; var O = n + J + v; J = n - J + v; B = A - k; H = A + h; 0 > e.y && (B = A,
                                            H = A + h + k); d.inverted && (O = m.width - A, l = r - (m.width - c), M = v * (r - O) / l, J = v * (r - (O - h)) / l, l = n + v + M, M = l - 2 * M, O = n - J + v, J = n + J + v, B = A, H = A + h - k, 0 > e.y && (H = A + h + k)); e.shapeType = "path"; e.shapeArgs = { x: l, y: B, width: M - l, height: h, d: [["M", l, B], ["L", M, B], ["L", O, H], ["L", J, H], ["Z"]] }
                                    })
                                }
                        } u.defaultOptions = m(a.defaultOptions, {}); d.registerSeriesType("columnpyramid", u); ""; return u
                    }); t(b, "Series/ErrorBar/ErrorBarSeriesDefaults.js", [], function () {
                        ""; return {
                            color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>' },
                            whiskerWidth: null
                        }
                    }); t(b, "Series/ErrorBar/ErrorBarSeries.js", [b["Series/BoxPlot/BoxPlotSeries.js"], b["Series/Column/ColumnSeries.js"], b["Series/ErrorBar/ErrorBarSeriesDefaults.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, b, h, f) {
                        const { arearange: e } = h.seriesTypes, { addEvent: q, merge: u, extend: C } = f; class v extends a {
                            constructor() { super(...arguments); this.points = this.options = this.data = void 0 } getColumnMetrics() { return this.linkedParent && this.linkedParent.columnMetrics || d.prototype.getColumnMetrics.call(this) } drawDataLabels() {
                                const a =
                                    this.pointValKey; e && (e.prototype.drawDataLabels.call(this), this.data.forEach(function (d) { d.y = d[a] }))
                            } toYData(a) { return [a.low, a.high] }
                        } v.defaultOptions = u(a.defaultOptions, b); q(v, "afterTranslate", function () { this.points.forEach(a => { a.plotLow = a.plotY }) }, { order: 0 }); C(v.prototype, { pointArrayMap: ["low", "high"], pointValKey: "high", doQuartiles: !1 }); h.registerSeriesType("errorbar", v); return v
                    }); t(b, "Series/Gauge/GaugePoint.js", [b["Core/Series/SeriesRegistry.js"]], function (a) {
                        ({ series: { prototype: { pointClass: a } } } =
                            a); class d extends a { constructor() { super(...arguments); this.shapeArgs = this.series = this.options = void 0 } setState(a) { this.state = a } } return d
                    }); t(b, "Series/Gauge/GaugeSeries.js", [b["Series/Gauge/GaugePoint.js"], b["Core/Globals.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, d, b, h) {
                        ({ noop: d } = d); const { series: e, seriesTypes: { column: m } } = b, { clamp: q, isNumber: u, extend: C, merge: v, pick: n, pInt: D, defined: y } = h; class g extends e {
                            constructor() {
                                super(...arguments); this.yAxis = this.options = this.points =
                                    this.data = void 0
                            } translate() {
                                const c = this.yAxis, a = this.options, d = c.center; this.generatePoints(); this.points.forEach(b => {
                                    const e = v(a.dial, b.dial), g = D(e.radius) * d[2] / 200, f = D(e.baseLength) * g / 100, h = D(e.rearLength) * g / 100, k = e.baseWidth, m = e.topWidth; let n = a.overshoot, r = c.startAngleRad + c.translate(b.y, void 0, void 0, void 0, !0); if (u(n) || !1 === a.wrap) n = u(n) ? n / 180 * Math.PI : 0, r = q(r, c.startAngleRad - n, c.endAngleRad + n); r = 180 * r / Math.PI; b.shapeType = "path"; b.shapeArgs = {
                                        d: e.path || [["M", -h, -k / 2], ["L", f, -k / 2], ["L", g, -m /
                                            2], ["L", g, m / 2], ["L", f, k / 2], ["L", -h, k / 2], ["Z"]], translateX: d[0], translateY: d[1], rotation: r
                                    }; b.plotX = d[0]; b.plotY = d[1]; y(b.y) && c.max - c.min && (b.percentage = (b.y - c.min) / (c.max - c.min) * 100)
                                })
                            } drawPoints() {
                                const c = this, a = c.chart, d = c.yAxis.center, b = c.pivot, e = c.options, g = e.pivot, f = a.renderer; c.points.forEach(d => {
                                    const b = d.graphic, g = d.shapeArgs, h = g.d, k = v(e.dial, d.dial); b ? (b.animate(g), g.d = h) : d.graphic = f[d.shapeType](g).addClass("highcharts-dial").add(c.group); if (!a.styledMode) d.graphic[b ? "animate" : "attr"]({
                                        stroke: k.borderColor,
                                        "stroke-width": k.borderWidth, fill: k.backgroundColor
                                    })
                                }); b ? b.animate({ translateX: d[0], translateY: d[1] }) : g && (c.pivot = f.circle(0, 0, g.radius).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(d[0], d[1]).add(c.group), a.styledMode || c.pivot.attr({ fill: g.backgroundColor, stroke: g.borderColor, "stroke-width": g.borderWidth }))
                            } animate(c) { const a = this; c || a.points.forEach(c => { const d = c.graphic; d && (d.attr({ rotation: 180 * a.yAxis.startAngleRad / Math.PI }), d.animate({ rotation: c.shapeArgs.rotation }, a.options.animation)) }) } render() {
                                this.group =
                                this.plotGroup("group", "series", this.visible ? "inherit" : "hidden", this.options.zIndex, this.chart.seriesGroup); e.prototype.render.call(this); this.group.clip(this.chart.clipRect)
                            } setData(a, d) { e.prototype.setData.call(this, a, !1); this.processData(); this.generatePoints(); n(d, !0) && this.chart.redraw() } hasData() { return !!this.points.length }
                        } g.defaultOptions = v(e.defaultOptions, {
                            dataLabels: { borderColor: "#cccccc", borderRadius: 3, borderWidth: 1, crop: !1, defer: !1, enabled: !0, verticalAlign: "top", y: 15, zIndex: 2 }, dial: {
                                backgroundColor: "#000000",
                                baseLength: "70%", baseWidth: 3, borderColor: "#cccccc", borderWidth: 0, radius: "80%", rearLength: "10%", topWidth: 1
                            }, pivot: { radius: 5, borderWidth: 0, borderColor: "#cccccc", backgroundColor: "#000000" }, tooltip: { headerFormat: "" }, showInLegend: !1
                        }); C(g.prototype, { angular: !0, directTouch: !0, drawGraph: d, drawTracker: m.prototype.drawTracker, fixedBox: !0, forceDL: !0, noSharedTooltip: !0, pointClass: a, trackerGroups: ["group", "dataLabelsGroup"] }); b.registerSeriesType("gauge", g); ""; return g
                    }); t(b, "Series/DragNodesComposition.js",
                        [b["Core/Utilities.js"]], function (a) {
                            function d() { const a = this; let d, e, h; a.container && (d = b(a.container, "mousedown", d => { const f = a.hoverPoint; f && f.series && f.series.hasDraggableNodes && f.series.options.draggable && (f.series.onMouseDown(f, d), e = b(a.container, "mousemove", a => f && f.series && f.series.onMouseMove(f, a)), h = b(a.container.ownerDocument, "mouseup", a => { e(); h(); return f && f.series && f.series.onMouseUp(f, a) })) })); b(a, "destroy", function () { d() }) } const { addEvent: b } = a, h = []; return {
                                compose: function (e) {
                                    a.pushUnique(h,
                                        e) && b(e, "load", d)
                                }, onMouseDown: function (a, d) { d = this.chart.pointer.normalize(d); a.fixedPosition = { chartX: d.chartX, chartY: d.chartY, plotX: a.plotX, plotY: a.plotY }; a.inDragMode = !0 }, onMouseMove: function (a, d) {
                                    if (a.fixedPosition && a.inDragMode) {
                                        const f = this.chart; d = f.pointer.normalize(d); var b = a.fixedPosition.chartX - d.chartX, e = a.fixedPosition.chartY - d.chartY; d = f.graphLayoutsLookup; if (5 < Math.abs(b) || 5 < Math.abs(e)) b = a.fixedPosition.plotX - b, e = a.fixedPosition.plotY - e, f.isInsidePlot(b, e) && (a.plotX = b, a.plotY = e, a.hasDragged =
                                            !0, this.redrawHalo(a), d.forEach(a => { a.restartSimulation() }))
                                    }
                                }, onMouseUp: function (a, d) { a.fixedPosition && (a.hasDragged && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw()), a.inDragMode = a.hasDragged = !1, this.options.fixedDraggable || delete a.fixedPosition) }, redrawHalo: function (a) { a && this.halo && this.halo.attr({ d: a.haloPath(this.options.states.hover.halo.size) }) }
                            }
                        }); t(b, "Series/GraphLayoutComposition.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Utilities.js"]], function (a, d) {
                            function b() {
                                this.graphLayoutsLookup &&
                                (this.graphLayoutsLookup.forEach(a => { a.updateSimulation() }), this.redraw())
                            } function h() { this.graphLayoutsLookup && (this.graphLayoutsLookup.forEach(a => { a.updateSimulation(!1) }), this.redraw()) } function f() { this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(a => { a.stop() }) } function m() {
                                let a, d = !1; const b = b => { b.maxIterations-- && isFinite(b.temperature) && !b.isStable() && !b.enableSimulation && (b.beforeStep && b.beforeStep(), b.step(), a = !1, d = !0) }; if (this.graphLayoutsLookup) {
                                    q(!1, this); for (this.graphLayoutsLookup.forEach(a =>
                                        a.start()); !a;)a = !0, this.graphLayoutsLookup.forEach(b); d && this.series.forEach(a => { a && a.layout && a.render() })
                                }
                            } const { setAnimation: q } = a, { addEvent: u } = d, C = []; return { compose: function (a) { d.pushUnique(C, a) && (u(a, "afterPrint", b), u(a, "beforePrint", h), u(a, "predraw", f), u(a, "render", m)) }, integrations: {}, layouts: {} }
                        }); t(b, "Series/PackedBubble/PackedBubblePoint.js", [b["Core/Chart/Chart.js"], b["Core/Series/Point.js"], b["Core/Series/SeriesRegistry.js"]], function (a, d, b) {
                            ({ seriesTypes: { bubble: { prototype: { pointClass: b } } } } =
                                b); class e extends b {
                                    constructor() { super(...arguments); this.radius = this.mass = this.degree = NaN; this.series = this.options = void 0; this.value = null } destroy() { this.series.layout && this.series.layout.removeElementFromCollection(this, this.series.layout.nodes); return d.prototype.destroy.apply(this, arguments) } firePointEvent() {
                                        const a = this.series.options; if (this.isParentNode && a.parentNode) {
                                            const b = a.allowPointSelect; a.allowPointSelect = a.parentNode.allowPointSelect; d.prototype.firePointEvent.apply(this, arguments);
                                            a.allowPointSelect = b
                                        } else d.prototype.firePointEvent.apply(this, arguments)
                                    } select() { const b = this.series.chart; this.isParentNode ? (b.getSelectedPoints = b.getSelectedParentNodes, d.prototype.select.apply(this, arguments), b.getSelectedPoints = a.prototype.getSelectedPoints) : d.prototype.select.apply(this, arguments) }
                            } return e
                        }); t(b, "Series/PackedBubble/PackedBubbleSeriesDefaults.js", [b["Core/Utilities.js"]], function (a) {
                            const { isNumber: d } = a; ""; return {
                                minSize: "10%", maxSize: "50%", sizeBy: "area", zoneAxis: "y", crisp: !1,
                                tooltip: { pointFormat: "Value: {point.value}" }, draggable: !0, useSimulation: !0, parentNode: { allowPointSelect: !1 }, dataLabels: { formatter: function () { const { numberFormatter: a } = this.series.chart, { value: b } = this.point; return d(b) ? a(b, -1) : "" }, parentNodeFormatter: function () { return this.name }, parentNodeTextPath: { enabled: !0 }, padding: 0, style: { transition: "opacity 2000ms" } }, layoutAlgorithm: {
                                    initialPositions: "circle", initialPositionRadius: 20, bubblePadding: 5, parentNodeLimit: !1, seriesInteraction: !0, dragBetweenSeries: !1,
                                    parentNodeOptions: { maxIterations: 400, gravitationalConstant: .03, maxSpeed: 50, initialPositionRadius: 100, seriesInteraction: !0, marker: { fillColor: null, fillOpacity: 1, lineWidth: null, lineColor: null, symbol: "circle" } }, enableSimulation: !0, type: "packedbubble", integration: "packedbubble", maxIterations: 1E3, splitSeries: !1, maxSpeed: 5, gravitationalConstant: .01, friction: -.981
                                }
                            }
                        }); t(b, "Series/Networkgraph/VerletIntegration.js", [], function () {
                            return {
                                attractive: function (a, d, b) {
                                    const e = a.getMass(), f = -b.x * d * this.diffTemperature;
                                    d = -b.y * d * this.diffTemperature; a.fromNode.fixedPosition || (a.fromNode.plotX -= f * e.fromNode / a.fromNode.degree, a.fromNode.plotY -= d * e.fromNode / a.fromNode.degree); a.toNode.fixedPosition || (a.toNode.plotX += f * e.toNode / a.toNode.degree, a.toNode.plotY += d * e.toNode / a.toNode.degree)
                                }, attractiveForceFunction: function (a, d) { return (d - a) / a }, barycenter: function () {
                                    let a = this.options.gravitationalConstant, d = this.barycenter.xFactor, b = this.barycenter.yFactor; d = (d - (this.box.left + this.box.width) / 2) * a; b = (b - (this.box.top + this.box.height) /
                                        2) * a; this.nodes.forEach(function (a) { a.fixedPosition || (a.plotX -= d / a.mass / a.degree, a.plotY -= b / a.mass / a.degree) })
                                }, getK: function (a) { return Math.pow(a.box.width * a.box.height / a.nodes.length, .5) }, integrate: function (a, d) {
                                    var b = -a.options.friction; let h = a.options.maxSpeed, f = (d.plotX + d.dispX - d.prevX) * b; b *= d.plotY + d.dispY - d.prevY; var m = Math.abs; let q = m(f) / (f || 1); m = m(b) / (b || 1); f = q * Math.min(h, Math.abs(f)); b = m * Math.min(h, Math.abs(b)); d.prevX = d.plotX + d.dispX; d.prevY = d.plotY + d.dispY; d.plotX += f; d.plotY += b; d.temperature =
                                        a.vectorLength({ x: f, y: b })
                                }, repulsive: function (a, d, b) { d = d * this.diffTemperature / a.mass / a.degree; a.fixedPosition || (a.plotX += b.x * d, a.plotY += b.y * d) }, repulsiveForceFunction: function (a, d) { return (d - a) / a * (d > a ? 1 : 0) }
                            }
                        }); t(b, "Series/PackedBubble/PackedBubbleIntegration.js", [b["Core/Globals.js"], b["Series/Networkgraph/VerletIntegration.js"]], function (a, d) {
                            ({ noop: a } = a); return {
                                barycenter: function () {
                                    const a = this.options.gravitationalConstant, d = this.box, b = this.nodes; let m, q; for (const e of b) this.options.splitSeries &&
                                        !e.isParentNode ? (m = e.series.parentNode.plotX, q = e.series.parentNode.plotY) : (m = d.width / 2, q = d.height / 2), e.fixedPosition || (e.plotX -= (e.plotX - m) * a / (e.mass * Math.sqrt(b.length)), e.plotY -= (e.plotY - q) * a / (e.mass * Math.sqrt(b.length)))
                                }, getK: a, integrate: d.integrate, repulsive: function (a, d, b, m) { const e = d * this.diffTemperature / a.mass / a.degree; d = b.x * e; b = b.y * e; a.fixedPosition || (a.plotX += d, a.plotY += b); m.fixedPosition || (m.plotX -= d, m.plotY -= b) }, repulsiveForceFunction: function (a, d, b, m) {
                                    return Math.min(a, (b.marker.radius +
                                        m.marker.radius) / 2)
                                }
                            }
                        }); t(b, "Series/Networkgraph/EulerIntegration.js", [], function () {
                            return {
                                attractive: function (a, d, b, h) { const e = a.getMass(), m = b.x / h * d; d *= b.y / h; a.fromNode.fixedPosition || (a.fromNode.dispX -= m * e.fromNode / a.fromNode.degree, a.fromNode.dispY -= d * e.fromNode / a.fromNode.degree); a.toNode.fixedPosition || (a.toNode.dispX += m * e.toNode / a.toNode.degree, a.toNode.dispY += d * e.toNode / a.toNode.degree) }, attractiveForceFunction: function (a, d) { return a * a / d }, barycenter: function () {
                                    const a = this.options.gravitationalConstant,
                                    d = this.barycenter.xFactor, b = this.barycenter.yFactor; this.nodes.forEach(function (e) { if (!e.fixedPosition) { var f = e.getDegree(); f *= 1 + f / 2; e.dispX += (d - e.plotX) * a * f / e.degree; e.dispY += (b - e.plotY) * a * f / e.degree } })
                                }, getK: function (a) { return Math.pow(a.box.width * a.box.height / a.nodes.length, .3) }, integrate: function (a, d) {
                                    let b; d.dispX += d.dispX * a.options.friction; d.dispY += d.dispY * a.options.friction; b = d.temperature = a.vectorLength({ x: d.dispX, y: d.dispY }); 0 !== b && (d.plotX += d.dispX / b * Math.min(Math.abs(d.dispX), a.temperature),
                                        d.plotY += d.dispY / b * Math.min(Math.abs(d.dispY), a.temperature))
                                }, repulsive: function (a, d, b, h) { a.dispX += b.x / h * d / a.degree; a.dispY += b.y / h * d / a.degree }, repulsiveForceFunction: function (a, d) { return d * d / a }
                            }
                        }); t(b, "Series/Networkgraph/QuadTreeNode.js", [], function () {
                            class a {
                                constructor(a) { this.isInternal = this.isEmpty = this.body = !1; this.nodes = []; this.box = a; this.boxSize = Math.min(a.width, a.height) } divideBox() {
                                    const d = this.box.width / 2, b = this.box.height / 2; this.nodes[0] = new a({
                                        left: this.box.left, top: this.box.top, width: d,
                                        height: b
                                    }); this.nodes[1] = new a({ left: this.box.left + d, top: this.box.top, width: d, height: b }); this.nodes[2] = new a({ left: this.box.left + d, top: this.box.top + b, width: d, height: b }); this.nodes[3] = new a({ left: this.box.left, top: this.box.top + b, width: d, height: b })
                                } getBoxPosition(a) { const b = a.plotY < this.box.top + this.box.height / 2; return a.plotX < this.box.left + this.box.width / 2 ? b ? 0 : 3 : b ? 1 : 2 } insert(b, e) {
                                    this.isInternal ? this.nodes[this.getBoxPosition(b)].insert(b, e - 1) : (this.isEmpty = !1, this.body ? e ? (this.isInternal = !0, this.divideBox(),
                                        !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body, e - 1), this.body = !0), this.nodes[this.getBoxPosition(b)].insert(b, e - 1)) : (e = new a({ top: b.plotX || NaN, left: b.plotY || NaN, width: .1, height: .1 }), e.body = b, e.isInternal = !1, this.nodes.push(e)) : (this.isInternal = !1, this.body = b))
                                } updateMassAndCenter() {
                                    let a = 0, b = 0, h = 0; if (this.isInternal) { for (const d of this.nodes) d.isEmpty || (a += d.mass, b += d.plotX * d.mass, h += d.plotY * d.mass); b /= a; h /= a } else this.body && (a = this.body.mass, b = this.body.plotX, h = this.body.plotY);
                                    this.mass = a; this.plotX = b; this.plotY = h
                                }
                            } return a
                        }); t(b, "Series/Networkgraph/QuadTree.js", [b["Series/Networkgraph/QuadTreeNode.js"]], function (a) {
                            class b {
                                constructor(b, d, f, m) { this.box = { left: b, top: d, width: f, height: m }; this.maxDepth = 25; this.root = new a(this.box); this.root.isInternal = !0; this.root.isRoot = !0; this.root.divideBox() } calculateMassAndCenter() { this.visitNodeRecursive(null, null, function (a) { a.updateMassAndCenter() }) } insertNodes(a) { for (const b of a) this.root.insert(b, this.maxDepth) } visitNodeRecursive(a,
                                    b, d) { let e; a || (a = this.root); a === this.root && b && (e = b(a)); if (!1 !== e) { for (const f of a.nodes) { if (f.isInternal) { b && (e = b(f)); if (!1 === e) continue; this.visitNodeRecursive(f, b, d) } else f.body && b && b(f.body); d && d(f) } a === this.root && d && d(a) } }
                            } return b
                        }); t(b, "Series/Networkgraph/ReingoldFruchtermanLayout.js", [b["Series/Networkgraph/EulerIntegration.js"], b["Core/Globals.js"], b["Series/GraphLayoutComposition.js"], b["Series/Networkgraph/QuadTree.js"], b["Core/Utilities.js"], b["Series/Networkgraph/VerletIntegration.js"]],
                            function (a, b, e, h, f, m) {
                                const { win: d } = b, { clamp: u, defined: C, isFunction: v, fireEvent: n, pick: D } = f; class y {
                                    constructor() { this.attractiveForce = void 0; this.box = {}; this.currentStep = 0; this.initialRendering = !0; this.integration = void 0; this.links = []; this.nodes = []; this.repulsiveForce = this.quadTree = this.options = void 0; this.series = []; this.simulation = !1 } static compose(b) { e.compose(b); e.integrations.euler = a; e.integrations.verlet = m; e.layouts["reingold-fruchterman"] = y } init(a) {
                                        this.options = a; this.nodes = []; this.links = [];
                                        this.series = []; this.box = { x: 0, y: 0, width: 0, height: 0 }; this.setInitialRendering(!0); this.integration = e.integrations[a.integration]; this.enableSimulation = a.enableSimulation; this.attractiveForce = D(a.attractiveForce, this.integration.attractiveForceFunction); this.repulsiveForce = D(a.repulsiveForce, this.integration.repulsiveForceFunction); this.approximation = a.approximation
                                    } updateSimulation(a) { this.enableSimulation = D(a, this.options.enableSimulation) } start() {
                                        const a = this.series, c = this.options; this.currentStep =
                                            0; this.forces = a[0] && a[0].forces || []; this.chart = a[0] && a[0].chart; this.initialRendering && (this.initPositions(), a.forEach(function (a) { a.finishedAnimating = !0; a.render() })); this.setK(); this.resetSimulation(c); this.enableSimulation && this.step()
                                    } step() {
                                        const a = this.series; this.currentStep++; "barnes-hut" === this.approximation && (this.createQuadTree(), this.quadTree.calculateMassAndCenter()); for (const a of this.forces || []) this[a + "Forces"](this.temperature); this.applyLimits(); this.temperature = this.coolDown(this.startTemperature,
                                            this.diffTemperature, this.currentStep); this.prevSystemTemperature = this.systemTemperature; this.systemTemperature = this.getSystemTemperature(); if (this.enableSimulation) { for (const c of a) c.chart && c.render(); this.maxIterations-- && isFinite(this.temperature) && !this.isStable() ? (this.simulation && d.cancelAnimationFrame(this.simulation), this.simulation = d.requestAnimationFrame(() => this.step())) : (this.simulation = !1, this.series.forEach(a => { n(a, "afterSimulation") })) }
                                    } stop() { this.simulation && d.cancelAnimationFrame(this.simulation) } setArea(a,
                                        c, b, d) { this.box = { left: a, top: c, width: b, height: d } } setK() { this.k = this.options.linkLength || this.integration.getK(this) } addElementsToCollection(a, c) { for (const b of a) -1 === c.indexOf(b) && c.push(b) } removeElementFromCollection(a, c) { a = c.indexOf(a); -1 !== a && c.splice(a, 1) } clear() { this.nodes.length = 0; this.links.length = 0; this.series.length = 0; this.resetSimulation() } resetSimulation() { this.forcedStop = !1; this.systemTemperature = 0; this.setMaxIterations(); this.setTemperature(); this.setDiffTemperature() } restartSimulation() {
                                            this.simulation ?
                                            this.resetSimulation() : (this.setInitialRendering(!1), this.enableSimulation ? this.start() : this.setMaxIterations(1), this.chart && this.chart.redraw(), this.setInitialRendering(!0))
                                        } setMaxIterations(a) { this.maxIterations = D(a, this.options.maxIterations) } setTemperature() { this.temperature = this.startTemperature = Math.sqrt(this.nodes.length) } setDiffTemperature() { this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1) } setInitialRendering(a) { this.initialRendering = a } createQuadTree() {
                                            this.quadTree =
                                            new h(this.box.left, this.box.top, this.box.width, this.box.height); this.quadTree.insertNodes(this.nodes)
                                        } initPositions() { const a = this.options.initialPositions; if (v(a)) { a.call(this); for (const a of this.nodes) C(a.prevX) || (a.prevX = a.plotX), C(a.prevY) || (a.prevY = a.plotY), a.dispX = 0, a.dispY = 0 } else "circle" === a ? this.setCircularPositions() : this.setRandomPositions() } setCircularPositions() {
                                            const a = this.box; var c = this.nodes; const b = 2 * Math.PI / (c.length + 1), d = c.filter(function (a) { return 0 === a.linksTo.length }), e = {},
                                                f = this.options.initialPositionRadius, h = a => { for (const c of a.linksFrom || []) e[c.toNode.id] || (e[c.toNode.id] = !0, m.push(c.toNode), h(c.toNode)) }; let m = []; for (const a of d) m.push(a), h(a); if (m.length) for (const a of c) -1 === m.indexOf(a) && m.push(a); else m = c; for (let d = 0, e = m.length; d < e; ++d)c = m[d], c.plotX = c.prevX = D(c.plotX, a.width / 2 + f * Math.cos(d * b)), c.plotY = c.prevY = D(c.plotY, a.height / 2 + f * Math.sin(d * b)), c.dispX = 0, c.dispY = 0
                                        } setRandomPositions() {
                                            const a = this.box, c = this.nodes, b = c.length + 1, d = a => {
                                                a = a * a / Math.PI; return a -=
                                                    Math.floor(a)
                                            }; let e; for (let g = 0, f = c.length; g < f; ++g)e = c[g], e.plotX = e.prevX = D(e.plotX, a.width * d(g)), e.plotY = e.prevY = D(e.plotY, a.height * d(b + g)), e.dispX = 0, e.dispY = 0
                                        } force(a, ...c) { this.integration[a].apply(this, c) } barycenterForces() { this.getBarycenter(); this.force("barycenter") } getBarycenter() { let a = 0, c = 0, b = 0; for (const d of this.nodes) c += d.plotX * d.mass, b += d.plotY * d.mass, a += d.mass; return this.barycenter = { x: c, y: b, xFactor: c / a, yFactor: b / a } } barnesHutApproximation(a, c) {
                                            const b = this.getDistXY(a, c), d = this.vectorLength(b);
                                            let e, g; a !== c && 0 !== d && (c.isInternal ? c.boxSize / d < this.options.theta && 0 !== d ? (g = this.repulsiveForce(d, this.k), this.force("repulsive", a, g * c.mass, b, d), e = !1) : e = !0 : (g = this.repulsiveForce(d, this.k), this.force("repulsive", a, g * c.mass, b, d))); return e
                                        } repulsiveForces() {
                                            if ("barnes-hut" === this.approximation) for (const a of this.nodes) this.quadTree.visitNodeRecursive(null, c => this.barnesHutApproximation(a, c)); else {
                                                let a, c, b; for (const d of this.nodes) for (const e of this.nodes) d === e || d.fixedPosition || (b = this.getDistXY(d,
                                                    e), c = this.vectorLength(b), 0 !== c && (a = this.repulsiveForce(c, this.k), this.force("repulsive", d, a * e.mass, b, c)))
                                            }
                                        } attractiveForces() { let a, c, b; for (const d of this.links) d.fromNode && d.toNode && (a = this.getDistXY(d.fromNode, d.toNode), c = this.vectorLength(a), 0 !== c && (b = this.attractiveForce(c, this.k), this.force("attractive", d, b, a, c))) } applyLimits() { const a = this.nodes; for (const c of a) { if (c.fixedPosition) break; this.integration.integrate(this, c); this.applyLimitBox(c, this.box); c.dispX = 0; c.dispY = 0 } } applyLimitBox(a,
                                            c) { const b = a.radius; a.plotX = u(a.plotX, c.left + b, c.width - b); a.plotY = u(a.plotY, c.top + b, c.height - b) } coolDown(a, c, b) { return a - c * b } isStable() { return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature } getSystemTemperature() { let a = 0; for (const c of this.nodes) a += c.temperature; return a } vectorLength(a) { return Math.sqrt(a.x * a.x + a.y * a.y) } getDistR(a, c) { a = this.getDistXY(a, c); return this.vectorLength(a) } getDistXY(a, c) {
                                                const b = a.plotX - c.plotX; a = a.plotY - c.plotY; return {
                                                    x: b, y: a, absX: Math.abs(b),
                                                    absY: Math.abs(a)
                                                }
                                            }
                                } return y
                            }); t(b, "Series/PackedBubble/PackedBubbleLayout.js", [b["Series/GraphLayoutComposition.js"], b["Series/PackedBubble/PackedBubbleIntegration.js"], b["Series/Networkgraph/ReingoldFruchtermanLayout.js"], b["Core/Utilities.js"]], function (a, b, e, h) {
                                function d() { const a = []; this.series.forEach(b => { b.parentNode && b.parentNode.selected && a.push(b.parentNode) }); return a } function m() { this.allDataPoints && delete this.allDataPoints } const { addEvent: q, pick: u } = h, C = []; class v extends e {
                                    constructor() {
                                        super(...arguments);
                                        this.index = NaN; this.nodes = []; this.options = void 0; this.series = []
                                    } static compose(f) { e.compose(f); a.integrations.packedbubble = b; a.layouts.packedbubble = v; h.pushUnique(C, f) && (q(f, "beforeRedraw", m), f.prototype.getSelectedParentNodes = d) } beforeStep() { this.options.marker && this.series.forEach(a => { a && a.calculateParentRadius() }) } isStable() { const a = Math.abs(this.prevSystemTemperature - this.systemTemperature); return 1 > Math.abs(10 * this.systemTemperature / Math.sqrt(this.nodes.length)) && .00001 > a || 0 >= this.temperature } setCircularPositions() {
                                        const a =
                                            this.box; var b = this.nodes; const d = 2 * Math.PI / (b.length + 1), e = this.options.initialPositionRadius; let c, f = 0; for (const g of b) this.options.splitSeries && !g.isParentNode ? (b = g.series.parentNode.plotX, c = g.series.parentNode.plotY) : (b = a.width / 2, c = a.height / 2), g.plotX = g.prevX = u(g.plotX, b + e * Math.cos(g.index || f * d)), g.plotY = g.prevY = u(g.plotY, c + e * Math.sin(g.index || f * d)), g.dispX = 0, g.dispY = 0, f++
                                    } repulsiveForces() {
                                        const a = this, b = a.options.bubblePadding; let d, e, c; a.nodes.forEach(g => {
                                            g.degree = g.mass; g.neighbours = 0; a.nodes.forEach(f => { d = 0; g === f || g.fixedPosition || !a.options.seriesInteraction && g.series !== f.series || (c = a.getDistXY(g, f), e = a.vectorLength(c) - (g.marker.radius + f.marker.radius + b), 0 > e && (g.degree += .01, g.neighbours++, d = a.repulsiveForce(-e / Math.sqrt(g.neighbours), a.k, g, f)), a.force("repulsive", g, d * f.mass, c, f, e)) })
                                        })
                                    } applyLimitBox(a, b) {
                                        let d, e; this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit && (d = this.getDistXY(a, a.series.parentNode), e = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(d), 0 > e &&
                                            e > -2 * a.marker.radius && (a.plotX -= .01 * d.x, a.plotY -= .01 * d.y)); super.applyLimitBox(a, b)
                                    }
                                } return a.layouts.packedbubble = v
                            }); t(b, "Series/SimulationSeriesUtilities.js", [b["Core/Utilities.js"], b["Core/Animation/AnimationUtilities.js"]], function (a, b) {
                                const { syncTimeout: d } = a, { animObject: h } = b; return {
                                    initDataLabels: function () {
                                        const a = this.options.dataLabels; if (!this.dataLabelsGroup) {
                                            const b = this.initDataLabelsGroup(); !this.chart.styledMode && (null === a || void 0 === a ? 0 : a.style) && b.css(a.style); b.attr({ opacity: 0 });
                                            this.visible && b.show(); return b
                                        } this.dataLabelsGroup.attr({ opacity: 1 }); return this.dataLabelsGroup
                                    }, initDataLabelsDefer: function () { var a; const b = this.options.dataLabels; (null === b || void 0 === b ? 0 : b.defer) && (null === (a = this.options.layoutAlgorithm) || void 0 === a ? 0 : a.enableSimulation) ? d(() => { this.deferDataLabels = !1 }, b ? h(b.animation).defer : 0) : this.deferDataLabels = !1 }
                                }
                            }); t(b, "Series/PackedBubble/PackedBubbleSeries.js", [b["Core/Color/Color.js"], b["Series/DragNodesComposition.js"], b["Series/GraphLayoutComposition.js"],
                            b["Core/Globals.js"], b["Series/PackedBubble/PackedBubblePoint.js"], b["Series/PackedBubble/PackedBubbleSeriesDefaults.js"], b["Series/PackedBubble/PackedBubbleLayout.js"], b["Core/Series/SeriesRegistry.js"], b["Series/SimulationSeriesUtilities.js"], b["Core/Utilities.js"], b["Core/Animation/AnimationUtilities.js"]], function (a, b, e, h, f, m, q, u, C, v, n) {
                                const { parse: d } = a; ({ noop: a } = h); const { series: { prototype: y }, seriesTypes: { bubble: g } } = u, { initDataLabels: c, initDataLabelsDefer: k } = C, { addEvent: r, clamp: t, defined: z,
                                    extend: P, fireEvent: A, isArray: p, isNumber: Q, merge: N, pick: F } = v; class I extends g {
                                        constructor() { super(...arguments); this.options = this.layout = this.data = this.chart = void 0; this.parentNodeMass = 0; this.xData = this.points = void 0; this.deferDataLabels = !0 } static compose(a, c, d, e) { g.compose(a, c, d, e); b.compose(c); q.compose(c) } accumulateAllPoints() {
                                            const a = this.chart, b = []; let c; for (const d of a.series) if (d.is("packedbubble") && d.visible || !a.options.chart.ignoreHiddenSeries) {
                                                c = d.yData || []; for (let a = 0; a < c.length; a++)b.push([null,
                                                    null, c[a], d.index, a, { id: a, marker: { radius: 0 } }])
                                            } return b
                                        } addLayout() {
                                            const a = this.options.layoutAlgorithm = this.options.layoutAlgorithm || {}, b = a.type || "packedbubble", c = this.chart.options.chart; let d = this.chart.graphLayoutsStorage, g = this.chart.graphLayoutsLookup, f; d || (this.chart.graphLayoutsStorage = d = {}, this.chart.graphLayoutsLookup = g = []); f = d[b]; f || (a.enableSimulation = z(c.forExport) ? !c.forExport : a.enableSimulation, d[b] = f = new e.layouts[b], f.init(a), g.splice(f.index, 0, f)); this.layout = f; this.points.forEach(a => { a.mass = 2; a.degree = 1; a.collisionNmb = 1 }); f.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight); f.addElementsToCollection([this], f.series); f.addElementsToCollection(this.points, f.nodes)
                                        } addSeriesLayout() {
                                            var a = this.options.layoutAlgorithm = this.options.layoutAlgorithm || {}; const b = a.type || "packedbubble", c = this.chart.graphLayoutsStorage, d = this.chart.graphLayoutsLookup; a = N(a, a.parentNodeOptions, { enableSimulation: this.layout.options.enableSimulation }); let g = c[b + "-series"]; g || (c[b + "-series"] = g = new e.layouts[b],
                                                g.init(a), d.splice(g.index, 0, g)); this.parentNodeLayout = g; this.createParentNodes()
                                        } calculateParentRadius() { const a = this.seriesBox(); this.parentNodeRadius = t(Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20, 20, a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20); this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius) } calculateZExtremes() {
                                            let a = this.options.zMin, b = this.options.zMax, c = Infinity, d = -Infinity;
                                            if (a && b) return [a, b]; this.chart.series.forEach(a => { a.yData.forEach(a => { z(a) && (a > d && (d = a), a < c && (c = a)) }) }); a = F(a, c); b = F(b, d); return [a, b]
                                        } checkOverlap(a, b) { const c = a[0] - b[0], d = a[1] - b[1]; return -.001 > Math.sqrt(c * c + d * d) - Math.abs(a[2] + b[2]) } createParentNodes() {
                                            const a = this.pointClass, b = this.chart, c = this.parentNodeLayout, e = this.layout.options; let g, f = this.parentNode, h = { radius: this.parentNodeRadius, lineColor: this.color, fillColor: d(this.color).brighten(.4).get() }; e.parentNodeOptions && (h = N(e.parentNodeOptions.marker ||
                                                {}, h)); this.parentNodeMass = 0; this.points.forEach(a => { this.parentNodeMass += Math.PI * Math.pow(a.marker.radius, 2) }); this.calculateParentRadius(); c.nodes.forEach(a => { a.seriesIndex === this.index && (g = !0) }); c.setArea(0, 0, b.plotWidth, b.plotHeight); g || (f || (f = (new a).init(this, { mass: this.parentNodeRadius / 2, marker: h, dataLabels: { inside: !1 }, states: { normal: { marker: h }, hover: { marker: h } }, dataLabelOnNull: !0, degree: this.parentNodeRadius, isParentNode: !0, seriesIndex: this.index })), this.parentNode && (f.plotX = this.parentNode.plotX,
                                                    f.plotY = this.parentNode.plotY), this.parentNode = f, c.addElementsToCollection([this], c.series), c.addElementsToCollection([f], c.nodes))
                                        } deferLayout() { const a = this.options.layoutAlgorithm; this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout()) } destroy() {
                                            this.chart.graphLayoutsLookup && this.chart.graphLayoutsLookup.forEach(a => { a.removeElementFromCollection(this, a.series) }, this); this.parentNode && this.parentNodeLayout && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes),
                                                this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy())); y.destroy.apply(this, arguments)
                                        } drawDataLabels() { this.deferDataLabels || (y.drawDataLabels.call(this, this.points), this.parentNode && (this.parentNode.formatPrefix = "parentNode", y.drawDataLabels.call(this, [this.parentNode]))) } drawGraph() {
                                            var a; if (this.layout && this.layout.options.splitSeries) {
                                                var b = this.chart, c = this.layout.options.parentNodeOptions.marker; c = {
                                                    fill: c.fillColor || d(this.color).brighten(.4).get(), opacity: c.fillOpacity,
                                                    stroke: c.lineColor || this.color, "stroke-width": F(c.lineWidth, this.options.lineWidth)
                                                }; this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", this.visible ? "inherit" : "hidden", .1, b.seriesGroup); null === (a = this.group) || void 0 === a ? void 0 : a.attr({ zIndex: 2 }); this.calculateParentRadius(); this.parentNode && z(this.parentNode.plotX) && z(this.parentNode.plotY) && z(this.parentNodeRadius) && (a = N({
                                                    x: this.parentNode.plotX - this.parentNodeRadius, y: this.parentNode.plotY - this.parentNodeRadius, width: 2 * this.parentNodeRadius,
                                                    height: 2 * this.parentNodeRadius
                                                }, c), this.parentNode.graphic || (this.graph = this.parentNode.graphic = b.renderer.symbol(c.symbol).add(this.parentNodesGroup)), this.parentNode.graphic.attr(a))
                                            }
                                        } drawTracker() { const a = this.parentNode; let b; super.drawTracker(); a && (b = p(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : [], a.graphic && (a.graphic.element.point = a), b.forEach(b => { b.div ? b.div.point = a : b.element.point = a })) } getPointRadius() {
                                            const a = this.chart, b = this.options, c = b.useSimulation, d = Math.min(a.plotWidth, a.plotHeight),
                                            e = {}, g = [], f = a.allDataPoints || [], h = f.length; let m, k, p, w;["minSize", "maxSize"].forEach(a => { const c = parseInt(b[a], 10), g = /%$/.test(b[a]); e[a] = g ? d * c / 100 : c * Math.sqrt(h) }); a.minRadius = m = e.minSize / Math.sqrt(h); a.maxRadius = k = e.maxSize / Math.sqrt(h); const E = c ? this.calculateZExtremes() : [m, k]; f.forEach((a, b) => { p = c ? t(a[2], E[0], E[1]) : a[2]; w = this.getRadius(E[0], E[1], m, k, p); 0 === w && (w = null); f[b][2] = w; g.push(w) }); this.radii = g
                                        } init() {
                                            y.init.apply(this, arguments); k.call(this); this.eventsToUnbind.push(r(this, "updatedData",
                                                function () { this.chart.series.forEach(a => { a.type === this.type && (a.isDirty = !0) }, this) })); return this
                                        } onMouseUp(a) {
                                            const c = a; if (c.fixedPosition && !c.removed) {
                                                const a = this.layout, d = this.parentNodeLayout; let e, g; d && a.options.dragBetweenSeries && d.nodes.forEach(b => { c && c.marker && b !== c.series.parentNode && (e = a.getDistXY(c, b), g = a.vectorLength(e) - b.marker.radius - c.marker.radius, 0 > g && (b.series.addPoint(N(c.options, { plotX: c.plotX, plotY: c.plotY }), !1), a.removeElementFromCollection(c, a.nodes), c.remove())) }); b.onMouseUp.apply(this,
                                                    arguments)
                                            }
                                        } placeBubbles(a) {
                                            const b = this.checkOverlap, c = this.positionBubble, d = []; let e = 1, g = 0, f = 0; var l = []; let h; a = a.sort((a, b) => b[2] - a[2]); if (a.length) {
                                                d.push([[0, 0, a[0][2], a[0][3], a[0][4]]]); if (1 < a.length) for (d.push([[0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]]), h = 2; h < a.length; h++)a[h][2] = a[h][2] || 1, l = c(d[e][g], d[e - 1][f], a[h]), b(l, d[e][0]) ? (d.push([]), f = 0, d[e + 1].push(c(d[e][g], d[e][0], a[h])), e++, g = 0) : 1 < e && d[e - 1][f + 1] && b(l, d[e - 1][f + 1]) ? (f++, d[e].push(c(d[e][g], d[e - 1][f], a[h])), g++) : (g++, d[e].push(l));
                                                this.chart.stages = d; this.chart.rawPositions = [].concat.apply([], d); this.resizeRadius(); l = this.chart.rawPositions
                                            } return l
                                        } pointAttribs(a, b) { var c = this.options; let d = c.marker; a && a.isParentNode && c.layoutAlgorithm && c.layoutAlgorithm.parentNodeOptions && (d = c.layoutAlgorithm.parentNodeOptions.marker); c = d.fillOpacity; a = y.pointAttribs.call(this, a, b); 1 !== c && (a["fill-opacity"] = c); return a } positionBubble(a, b, c) {
                                            var d = Math.sqrt, e = Math.asin, g = Math.acos; const f = Math.pow, l = Math.abs; d = d(f(a[0] - b[0], 2) + f(a[1] - b[1],
                                                2)); g = g((f(d, 2) + f(c[2] + b[2], 2) - f(c[2] + a[2], 2)) / (2 * (c[2] + b[2]) * d)); e = e(l(a[0] - b[0]) / d); a = (0 > a[1] - b[1] ? 0 : Math.PI) + g + e * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1); return [b[0] + (b[2] + c[2]) * Math.sin(a), b[1] - (b[2] + c[2]) * Math.cos(a), c[2], c[3], c[4]]
                                        } render() { const a = []; y.render.apply(this, arguments); this.options.dataLabels.allowOverlap || (this.data.forEach(b => { p(b.dataLabels) && b.dataLabels.forEach(b => { a.push(b) }) }), this.options.useSimulation && this.chart.hideOverlappingLabels(a)) } resizeRadius() {
                                            const a = this.chart, b = a.rawPositions;
                                            var c = Math.min, d = Math.max; const e = a.plotLeft, g = a.plotTop, f = a.plotHeight, h = a.plotWidth; let m, k, p, w, E; m = p = Number.POSITIVE_INFINITY; k = w = Number.NEGATIVE_INFINITY; for (const a of b) E = a[2], m = c(m, a[0] - E), k = d(k, a[0] + E), p = c(p, a[1] - E), w = d(w, a[1] + E); d = [k - m, w - p]; c = c.apply([], [(h - e) / d[0], (f - g) / d[1]]); if (1e-10 < Math.abs(c - 1)) { for (const a of b) a[2] *= c; this.placeBubbles(b) } else a.diffY = f / 2 + g - p - (w - p) / 2, a.diffX = h / 2 + e - m - (k - m) / 2
                                        } seriesBox() {
                                            const a = this.chart, b = Math.max, c = Math.min, d = [a.plotLeft, a.plotLeft + a.plotWidth,
                                            a.plotTop, a.plotTop + a.plotHeight]; let e; this.data.forEach(a => { z(a.plotX) && z(a.plotY) && a.marker.radius && (e = a.marker.radius, d[0] = c(d[0], a.plotX - e), d[1] = b(d[1], a.plotX + e), d[2] = c(d[2], a.plotY - e), d[3] = b(d[3], a.plotY + e)) }); return Q(d.width / d.height) ? d : null
                                        } setVisible() {
                                            const a = this; y.setVisible.apply(a, arguments); a.parentNodeLayout && a.graph ? a.visible ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show()) : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode, a.parentNodeLayout.nodes),
                                                a.parentNode.dataLabel && a.parentNode.dataLabel.hide()) : a.layout && (a.visible ? a.layout.addElementsToCollection(a.points, a.layout.nodes) : a.points.forEach(b => { a.layout.removeElementFromCollection(b, a.layout.nodes) }))
                                        } translate() {
                                            const a = this.chart, b = this.data, c = this.index, d = this.options.useSimulation; let e; this.processedXData = this.xData; this.generatePoints(); z(a.allDataPoints) || (a.allDataPoints = this.accumulateAllPoints(), this.getPointRadius()); if (d) var g = a.allDataPoints; else g = this.placeBubbles(a.allDataPoints),
                                                this.options.draggable = !1; for (const f of g) f[3] === c && (g = b[f[4]], e = F(f[2], void 0), d || (g.plotX = f[0] - a.plotLeft + a.diffX, g.plotY = f[1] - a.plotTop + a.diffY), Q(e) && (g.marker = P(g.marker, { radius: e, width: 2 * e, height: 2 * e }), g.radius = e)); d && this.deferLayout(); A(this, "afterTranslate")
                                        }
                                } I.defaultOptions = N(g.defaultOptions, m); P(I.prototype, {
                                    pointClass: f, axisTypes: [], directTouch: !0, forces: ["barycenter", "repulsive"], hasDraggableNodes: !0, isCartesian: !1, noSharedTooltip: !0, pointArrayMap: ["value"], pointValKey: "value", requireSorting: !1,
                                    trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"], initDataLabels: c, alignDataLabel: y.alignDataLabel, indexateNodes: a, onMouseDown: b.onMouseDown, onMouseMove: b.onMouseMove, redrawHalo: b.redrawHalo, searchPoint: a
                                }); u.registerSeriesType("packedbubble", I); ""; return I
                            }); t(b, "Series/Polygon/PolygonSeries.js", [b["Core/Globals.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"]], function (a, b, e) {
                                ({ noop: a } = a); const { series: d, seriesTypes: { area: f, line: m, scatter: q } } = b, { extend: u, merge: t } = e; class v extends q {
                                    constructor() {
                                        super(...arguments);
                                        this.points = this.options = this.data = void 0
                                    } getGraphPath() { let a = m.prototype.getGraphPath.call(this), b = a.length + 1; for (; b--;)(b === a.length || "M" === a[b][0]) && 0 < b && a.splice(b, 0, ["Z"]); return this.areaPath = a } drawGraph() { this.options.fillColor = this.color; f.prototype.drawGraph.call(this) }
                                } v.defaultOptions = t(q.defaultOptions, { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0, legendSymbol: "rectangle" }); u(v.prototype, {
                                    type: "polygon", drawTracker: d.prototype.drawTracker,
                                    setStackedPoints: a
                                }); b.registerSeriesType("polygon", v); ""; return v
                            }); t(b, "Core/Axis/WaterfallAxis.js", [b["Core/Axis/Stacking/StackItem.js"], b["Core/Utilities.js"]], function (a, b) {
                                const { addEvent: d, objectEach: h } = b; var f; (function (b) {
                                    function e() { const a = this.waterfall.stacks; a && (a.changed = !1, delete a.alreadyChanged) } function f() { const a = this.options.stackLabels; a && a.enabled && this.waterfall.stacks && this.waterfall.renderStackTotals() } function m() {
                                        let a = this.axes, b = this.series, d = b.length; for (; d--;)b[d].options.stacking &&
                                            (a.forEach(function (a) { a.isXAxis || (a.waterfall.stacks.changed = !0) }), d = 0)
                                    } function v() { this.waterfall || (this.waterfall = new n(this)) } class n {
                                        constructor(a) { this.axis = a; this.stacks = { changed: !1 } } renderStackTotals() {
                                            const b = this.axis, d = b.waterfall.stacks, e = b.stacking && b.stacking.stackTotalGroup, c = new a(b, b.options.stackLabels || {}, !1, 0, void 0); this.dummyStackItem = c; e && h(d, function (b) { h(b, function (b, d) { c.total = b.stackTotal; c.x = +d; b.label && (c.label = b.label); a.prototype.render.call(c, e); b.label = c.label; delete c.label }) });
                                            c.total = null
                                        }
                                    } b.Composition = n; b.compose = function (a, b) { d(a, "init", v); d(a, "afterBuildStacks", e); d(a, "afterRender", f); d(b, "beforeRedraw", m) }
                                })(f || (f = {})); return f
                            }); t(b, "Series/Waterfall/WaterfallPoint.js", [b["Series/Column/ColumnSeries.js"], b["Core/Series/Point.js"], b["Core/Utilities.js"]], function (a, b, e) {
                                const { isNumber: d } = e; class f extends a.prototype.pointClass {
                                    constructor() { super(...arguments); this.series = this.options = void 0 } getClassName() {
                                        let a = b.prototype.getClassName.call(this); this.isSum ? a +=
                                            " highcharts-sum" : this.isIntermediateSum && (a += " highcharts-intermediate-sum"); return a
                                    } isValid() { return d(this.y) || this.isSum || !!this.isIntermediateSum }
                                } return f
                            }); t(b, "Series/Waterfall/WaterfallSeries.js", [b["Core/Axis/Axis.js"], b["Core/Chart/Chart.js"], b["Core/Series/SeriesRegistry.js"], b["Core/Utilities.js"], b["Core/Axis/WaterfallAxis.js"], b["Series/Waterfall/WaterfallPoint.js"]], function (a, b, e, h, f, m) {
                                const { seriesTypes: { column: d, line: u } } = e, { addEvent: t, arrayMax: v, arrayMin: n, correctFloat: D, extend: y,
                                    isNumber: g, merge: c, objectEach: k, pick: r } = h; class G extends d {
                                        constructor() { super(...arguments); this.yData = this.yAxis = this.xData = this.stackKey = this.stackedYPos = this.stackedYNeg = this.points = this.options = this.data = this.chart = void 0 } generatePoints() { d.prototype.generatePoints.apply(this); for (let a = 0, b = this.points.length; a < b; a++) { const b = this.points[a], c = this.processedYData[a]; g(c) && (b.isIntermediateSum || b.isSum) && (b.y = D(c)) } } processData(a) {
                                            let b = this.options, c = this.yData, d = b.data, e, g = c.length, f = b.threshold ||
                                                0, h, l, m, k, q, z; for (z = l = h = m = k = 0; z < g; z++)q = c[z], e = d && d[z] ? d[z] : {}, "sum" === q || e.isSum ? c[z] = D(l) : "intermediateSum" === q || e.isIntermediateSum ? (c[z] = D(h), h = 0) : (l += q, h += q), m = Math.min(l, m), k = Math.max(l, k); super.processData.call(this, a); b.stacking || (this.dataMin = m + f, this.dataMax = k)
                                        } toYData(a) { return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y } updateParallelArrays(a, b) { super.updateParallelArrays.call(this, a, b); if ("sum" === this.yData[0] || "intermediateSum" === this.yData[0]) this.yData[0] = null } pointAttribs(a,
                                            b) { const c = this.options.upColor; c && !a.options.color && g(a.y) && (a.color = 0 < a.y ? c : void 0); a = d.prototype.pointAttribs.call(this, a, b); delete a.dashstyle; return a } getGraphPath() { return [["M", 0, 0]] } getCrispPath() {
                                                let a = this.data.filter(a => g(a.y)), b = this.yAxis, c = a.length, d = Math.round(this.graph.strokeWidth()) % 2 / 2, e = Math.round(this.borderWidth) % 2 / 2, f = this.xAxis.reversed, h = this.yAxis.reversed, m = this.options.stacking, l = []; for (let p = 1; p < c; p++) {
                                                    if (!this.options.connectNulls && !g(this.data[a[p].index - 1].y)) continue;
                                                    var k = a[p].box, q = a[p - 1]; const c = q.y || 0, A = a[p - 1].box; if (!k || !A) continue; var v = b.waterfall.stacks[this.stackKey]; const B = 0 < c ? -A.height : 0; v && A && k && (v = v[p - 1], q = m ? Math.round(b.translate(v.connectorThreshold, !1, !0, !1, !0) + (h ? B : 0)) - d : A.y + q.minPointLengthOffset + e - d, l.push(["M", (A.x || 0) + (f ? 0 : A.width || 0), q], ["L", (k.x || 0) + (f ? k.width || 0 : 0), q])); A && l.length && (!m && 0 > c && !h || 0 < c && h) && ((k = l[l.length - 2]) && "number" === typeof k[2] && (k[2] += A.height || 0), (k = l[l.length - 1]) && "number" === typeof k[2] && (k[2] += A.height || 0))
                                                } return l
                                            } drawGraph() {
                                                u.prototype.drawGraph.call(this);
                                                this.graph && this.graph.attr({ d: this.getCrispPath() })
                                            } setStackedPoints() {
                                                function a(a, b, c, d) { if (k) { if (n) for (c; c < n; c++)k.stackState[c] += d; else k.stackState[0] = a, n = k.stackState.length; k.stackState.push(k.stackState[n - 1] + b) } } let b = this.options, c = this.yAxis.waterfall.stacks, d = b.threshold || 0, e = d, g = e, f = this.stackKey, h = this.xData, l = h.length, k, m, q, v, n; let u, t, K; var r; let y; this.yAxis.stacking.usePercentage = !1; m = q = v = e; if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                                                    y = c.changed; (r = c.alreadyChanged) &&
                                                        0 > r.indexOf(f) && (y = !0); c[f] || (c[f] = {}); if (r = c[f]) for (let c = 0; c < l; c++) {
                                                            var w = h[c]; if (!r[w] || y) r[w] = { negTotal: 0, posTotal: 0, stackTotal: 0, threshold: 0, stateIndex: 0, stackState: [], label: y && r[w] ? r[w].label : void 0 }; k = r[w]; K = this.yData[c]; 0 <= K ? k.posTotal += K : k.negTotal += K; t = b.data[c]; w = k.absolutePos = k.posTotal; u = k.absoluteNeg = k.negTotal; k.stackTotal = w + u; n = k.stackState.length; t && t.isIntermediateSum ? (a(v, q, 0, v), v = q, q = d, e ^= g, g ^= e, e ^= g) : t && t.isSum ? (a(d, m, n, 0), e = d) : (a(e, K, 0, m), t && (m += K, q += K)); k.stateIndex++; k.threshold =
                                                                e; e += k.stackTotal
                                                        } c.changed = !1; c.alreadyChanged || (c.alreadyChanged = []); c.alreadyChanged.push(f)
                                                }
                                            } getExtremes() { let a = this.options.stacking; let b, c; if (a) { var d = this.yAxis; d = d.waterfall.stacks; b = this.stackedYNeg = []; c = this.stackedYPos = []; "overlap" === a ? k(d[this.stackKey], function (a) { b.push(n(a.stackState)); c.push(v(a.stackState)) }) : k(d[this.stackKey], function (a) { b.push(a.negTotal + a.threshold); c.push(a.posTotal + a.threshold) }); return { dataMin: n(b), dataMax: v(c) } } return { dataMin: this.dataMin, dataMax: this.dataMax } }
                                }
                                G.defaultOptions = c(d.defaultOptions, { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "Dot", borderColor: "#333333", states: { hover: { lineWidthPlus: 0 } } }); t(G, "afterColumnTranslate", function () {
                                    const { options: a, points: b, yAxis: d } = this, e = r(a.minPointLength, 5), f = e / 2, h = a.threshold || 0, k = a.stacking, m = d.waterfall.stacks[this.stackKey]; let l = h, q = h; for (let a = 0; a < b.length; a++) {
                                        const p = b[a]; var v = this.processedYData[a]; const r = y({ x: 0, y: 0, width: 0, height: 0 }, p.shapeArgs || {}); p.box = r; var n = [0, v], u = p.y ||
                                            0; if (k) {
                                                if (m) {
                                                    n = m[a]; if ("overlap" === k) { var t = n.stackState[n.stateIndex--]; t = 0 <= u ? t : t - u; Object.hasOwnProperty.call(n, "absolutePos") && delete n.absolutePos; Object.hasOwnProperty.call(n, "absoluteNeg") && delete n.absoluteNeg } else 0 <= u ? (t = n.threshold + n.posTotal, n.posTotal -= u) : (t = n.threshold + n.negTotal, n.negTotal -= u, t -= u), !n.posTotal && g(n.absolutePos) && Object.hasOwnProperty.call(n, "absolutePos") && (n.posTotal = n.absolutePos, delete n.absolutePos), !n.negTotal && g(n.absoluteNeg) && Object.hasOwnProperty.call(n, "absoluteNeg") &&
                                                        (n.negTotal = n.absoluteNeg, delete n.absoluteNeg); p.isSum || (n.connectorThreshold = n.threshold + n.stackTotal); d.reversed ? v = 0 <= u ? t - u : t + u : (v = t, t -= u); p.below = v <= h; r.y = d.translate(v, !1, !0, !1, !0); r.height = Math.abs(r.y - d.translate(t, !1, !0, !1, !0)); if (t = d.waterfall.dummyStackItem) t.x = a, t.label = m[a].label, t.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[a], this.stackedYPos[a], void 0, this.xAxis)
                                                }
                                            } else t = Math.max(q, q + u) + n[0], r.y = d.translate(t, !1, !0, !1, !0), p.isSum ? (r.y = d.translate(n[1], !1, !0, !1, !0),
                                                r.height = Math.min(d.translate(n[0], !1, !0, !1, !0), d.len) - r.y, p.below = n[1] <= h) : p.isIntermediateSum ? (0 <= u ? (v = n[1] + l, t = l) : (v = l, t = n[1] + l), d.reversed && (v ^= t, t ^= v, v ^= t), r.y = d.translate(v, !1, !0, !1, !0), r.height = Math.abs(r.y - Math.min(d.translate(t, !1, !0, !1, !0), d.len)), l += n[1], p.below = v <= h) : (r.height = 0 < v ? d.translate(q, !1, !0, !1, !0) - r.y : d.translate(q, !1, !0, !1, !0) - d.translate(q - v, !1, !0, !1, !0), q += v, p.below = q < h), 0 > r.height && (r.y += r.height, r.height *= -1); p.plotY = r.y = Math.round(r.y || 0) - this.borderWidth % 2 / 2; r.height =
                                                    Math.max(Math.round(r.height || 0), .001); p.yBottom = r.y + r.height; r.height <= e && !p.isNull ? (r.height = e, r.y -= f, p.plotY = r.y, p.minPointLengthOffset = 0 > u ? -f : f) : (p.isNull && (r.width = 0), p.minPointLengthOffset = 0); u = p.plotY + (p.negative ? r.height : 0); p.below && (p.plotY += r.height); p.tooltipPos && (this.chart.inverted ? p.tooltipPos[0] = d.len - u : p.tooltipPos[1] = u); p.isInside = this.isPointInside(p); c(!0, p.shapeArgs, r)
                                    }
                                }, { order: 2 }); y(G.prototype, { getZonesGraphs: u.prototype.getZonesGraphs, pointValKey: "y", showLine: !0, pointClass: m });
                                e.registerSeriesType("waterfall", G); f.compose(a, b); ""; return G
                            }); t(b, "Core/Axis/RadialAxis.js", [b["Core/Axis/AxisDefaults.js"], b["Core/Defaults.js"], b["Core/Globals.js"], b["Core/Utilities.js"]], function (a, b, e, h) {
                                const { defaultOptions: d } = b, { noop: m } = e, { addEvent: q, correctFloat: t, defined: C, extend: v, fireEvent: n, merge: D, pick: y, relativeLength: g, wrap: c } = h; var k; (function (b) {
                                    function e() {
                                        this.autoConnect = this.isCircular && "undefined" === typeof y(this.userMax, this.options.max) && t(this.endAngleRad - this.startAngleRad) ===
                                            t(2 * Math.PI); !this.isCircular && this.chart.inverted && this.max++; this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0)
                                    } function f() { return () => { if (this.isRadial && this.tickPositions && this.options.labels && !0 !== this.options.labels.allowOverlap) return this.tickPositions.map(a => this.ticks[a] && this.ticks[a].label).filter(a => !!a) } } function k() { return m } function r(a, b, c) {
                                        const d = this.pane.center; let e = a.value; let g; if (this.isCircular) {
                                            if (C(e)) a.point && (f = a.point.shapeArgs ||
                                                {}, f.start && (e = this.chart.inverted ? this.translate(a.point.rectPlotY, !0) : a.point.x)); else { var f = a.chartX || 0; g = a.chartY || 0; e = this.translate(Math.atan2(g - c, f - b) - this.startAngleRad, !0) } a = this.getPosition(e); f = a.x; g = a.y
                                        } else C(e) || (f = a.chartX, g = a.chartY), C(f) && C(g) && (c = d[1] + this.chart.plotTop, e = this.translate(Math.min(Math.sqrt(Math.pow(f - b, 2) + Math.pow(g - c, 2)), d[2] / 2) - d[3] / 2, !0)); return [e, f || 0, g || 0]
                                    } function p(a, b, c) {
                                        a = this.pane.center; const d = this.chart, e = this.left || 0, g = this.top || 0; let f = y(b, a[2] / 2 - this.offset);
                                        "undefined" === typeof c && (c = this.horiz ? 0 : this.center && -this.center[3] / 2); c && (f += c); this.isCircular || "undefined" !== typeof b ? (b = this.chart.renderer.symbols.arc(e + a[0], g + a[1], f, f, { start: this.startAngleRad, end: this.endAngleRad, open: !0, innerR: 0 }), b.xBounds = [e + a[0]], b.yBounds = [g + a[1] - f]) : (b = this.postTranslate(this.angleRad, f), b = [["M", this.center[0] + d.plotLeft, this.center[1] + d.plotTop], ["L", b.x, b.y]]); return b
                                    } function u() { this.constructor.prototype.getOffset.call(this); this.chart.axisOffset[this.side] = 0 }
                                    function N(a, b, c) {
                                        const d = this.chart; var e = a => { if ("string" === typeof a) { let b = parseInt(a, 10); E.test(a) && (b = b * h / 100); return b } return a }; const g = this.center; var f = this.startAngleRad; const h = g[2] / 2; var k = Math.min(this.offset, 0), m = this.left || 0; const l = this.top || 0, E = /%$/; var w = this.isCircular; let L, p = y(e(c.outerRadius), h), x = e(c.innerRadius); e = y(e(c.thickness), 10); "polygon" === this.options.gridLineInterpolation ? k = this.getPlotLinePath({ value: a }).concat(this.getPlotLinePath({ value: b, reverse: !0 })) : (a = Math.max(a,
                                            this.min), b = Math.min(b, this.max), a = this.translate(a), b = this.translate(b), w || (p = a || 0, x = b || 0), "circle" !== c.shape && w ? (c = f + (a || 0), f += b || 0) : (c = -Math.PI / 2, f = 1.5 * Math.PI, L = !0), p -= k, k = d.renderer.symbols.arc(m + g[0], l + g[1], p, p, { start: Math.min(c, f), end: Math.max(c, f), innerR: y(x, p - (e - k)), open: L }), w && (w = (f + c) / 2, m = m + g[0] + g[2] / 2 * Math.cos(w), k.xBounds = w > -Math.PI / 2 && w < Math.PI / 2 ? [m, d.plotWidth] : [0, m], k.yBounds = [l + g[1] + g[2] / 2 * Math.sin(w)], k.yBounds[0] += w > -Math.PI && 0 > w || w > Math.PI ? -10 : 10)); return k
                                    } function F(a) {
                                        var b =
                                            this.pane.center, c = this.chart; const d = c.inverted; var e = a.reverse, f = this.pane.options.background ? this.pane.options.background[0] || this.pane.options.background : {}; const h = f.innerRadius || "0%", k = f.outerRadius || "100%"; var w = b[0] + c.plotLeft, m = b[1] + c.plotTop; const l = this.height, E = a.isCrosshair; f = b[3] / 2; var L = a.value; let p; var x = this.getPosition(L); let n = x.x; x = x.y; E && (x = this.getCrosshairPosition(a, w, m), L = x[0], n = x[1], x = x[2]); if (this.isCircular) L = Math.sqrt(Math.pow(n - w, 2) + Math.pow(x - m, 2)), e = "string" === typeof h ?
                                                g(h, 1) : h / L, c = "string" === typeof k ? g(k, 1) : k / L, b && f && (f /= L, e < f && (e = f), c < f && (c = f)), b = [["M", w + e * (n - w), m - e * (m - x)], ["L", n - (1 - c) * (n - w), x + (1 - c) * (m - x)]]; else if ((L = this.translate(L)) && (0 > L || L > l) && (L = 0), "circle" === this.options.gridLineInterpolation) b = this.getLinePath(0, L, f); else if (b = [], c[d ? "yAxis" : "xAxis"].forEach(a => { a.pane === this.pane && (p = a) }), p) for (w = p.tickPositions, p.autoConnect && (w = w.concat([w[0]])), e && (w = w.slice().reverse()), L && (L += f), m = 0; m < w.length; m++)f = p.getPosition(w[m], L), b.push(m ? ["L", f.x, f.y] :
                                                    ["M", f.x, f.y]); return b
                                    } function I(a, b) { a = this.translate(a); return this.postTranslate(this.isCircular ? a : this.angleRad, y(this.isCircular ? b : 0 > a ? 0 : a, this.center[2] / 2) - this.offset) } function l() { const a = this.center, b = this.chart, c = this.options.title; return { x: b.plotLeft + a[0] + (c.x || 0), y: b.plotTop + a[1] - { high: .5, middle: .25, low: 0 }[c.align] * a[2] + (c.y || 0) } } function B(a) {
                                        a.beforeSetTickPositions = e; a.createLabelCollector = f; a.getCrosshairPosition = r; a.getLinePath = p; a.getOffset = u; a.getPlotBandPath = N; a.getPlotLinePath =
                                            F; a.getPosition = I; a.getTitlePosition = l; a.postTranslate = R; a.setAxisSize = w; a.setAxisTranslation = E; a.setOptions = x
                                    } function H() {
                                        var a = this.chart, b = this.options, c = this.pane, d = c && c.options; a.angular && this.isXAxis || !c || !a.angular && !a.polar || (a = 2 * Math.PI, c = (y(d.startAngle, 0) - 90) * Math.PI / 180, d = (y(d.endAngle, y(d.startAngle, 0) + 360) - 90) * Math.PI / 180, this.angleRad = (b.angle || 0) * Math.PI / 180, this.startAngleRad = c, this.endAngleRad = d, this.offset = b.offset || 0, b = (c % a + a) % a, d = (d % a + a) % a, b > Math.PI && (b -= a), d > Math.PI && (d -= a),
                                            this.normalizedStartAngleRad = b, this.normalizedEndAngleRad = d)
                                    } function M(a) { this.isRadial && (a.align = void 0, a.preventDefault()) } function J() { if (this.chart && this.chart.labelCollectors) { const a = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1; 0 <= a && this.chart.labelCollectors.splice(a, 1) } } function O(b) {
                                        const c = this.chart, d = c.inverted, e = c.angular, f = c.polar, g = this.isXAxis, h = this.coll, w = e && g; b = b.userOptions.pane || 0; b = this.pane = c.pane && c.pane[b]; let l; if ("colorAxis" === h) this.isRadial =
                                            !1; else {
                                                if (e) { if (w ? (this.isHidden = !0, this.createLabelCollector = k, this.getOffset = m, this.render = this.redraw = T, this.setTitle = this.setCategories = this.setScale = m) : B(this), l = !g) this.defaultPolarOptions = X } else f && (B(this), this.defaultPolarOptions = (l = this.horiz) ? Y : D("xAxis" === h ? a.defaultXAxisOptions : a.defaultYAxisOptions, Z), d && "yAxis" === h && (this.defaultPolarOptions.stackLabels = a.defaultYAxisOptions.stackLabels, this.defaultPolarOptions.reversedStacks = !0)); e || f ? (this.isRadial = !0, this.labelCollector || (this.labelCollector =
                                                    this.createLabelCollector()), this.labelCollector && c.labelCollectors.push(this.labelCollector)) : this.isRadial = !1; b && l && (b.axis = this); this.isCircular = l
                                        }
                                    } function U() { this.isRadial && this.beforeSetTickPositions() } function V(a) {
                                        const b = this.label; if (b) {
                                            var c = this.axis, d = b.getBBox(), e = c.options.labels, f = (c.translate(this.pos) + c.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360, h = Math.round(f), k = C(e.y) ? 0 : .3 * -d.height, w = e.y, m = 20, l = e.align, E = "end", x = 0 > h ? h + 360 : h, p = x, n = 0, q = 0; if (c.isRadial) {
                                                var S = c.getPosition(this.pos,
                                                    c.center[2] / 2 + g(y(e.distance, -25), c.center[2] / 2, -c.center[2] / 2)); "auto" === e.rotation ? b.attr({ rotation: f }) : C(w) || (w = c.chart.renderer.fontMetrics(b).b - d.height / 2); C(l) || (c.isCircular ? (d.width > c.len * c.tickInterval / (c.max - c.min) && (m = 0), l = f > m && f < 180 - m ? "left" : f > 180 + m && f < 360 - m ? "right" : "center") : l = "center", b.attr({ align: l })); if ("auto" === l && 2 === c.tickPositions.length && c.isCircular) {
                                                        90 < x && 180 > x ? x = 180 - x : 270 < x && 360 >= x && (x = 540 - x); 180 < p && 360 >= p && (p = 360 - p); if (c.pane.options.startAngle === h || c.pane.options.startAngle ===
                                                            h + 360 || c.pane.options.startAngle === h - 360) E = "start"; l = -90 <= h && 90 >= h || -360 <= h && -270 >= h || 270 <= h && 360 >= h ? "start" === E ? "right" : "left" : "start" === E ? "left" : "right"; 70 < p && 110 > p && (l = "center"); 15 > x || 180 <= x && 195 > x ? n = .3 * d.height : 15 <= x && 35 >= x ? n = "start" === E ? 0 : .75 * d.height : 195 <= x && 215 >= x ? n = "start" === E ? .75 * d.height : 0 : 35 < x && 90 >= x ? n = "start" === E ? .25 * -d.height : d.height : 215 < x && 270 >= x && (n = "start" === E ? d.height : .25 * -d.height); 15 > p ? q = "start" === E ? .15 * -d.height : .15 * d.height : 165 < p && 180 >= p && (q = "start" === E ? .15 * d.height : .15 * -d.height);
                                                        b.attr({ align: l }); b.translate(q, n + k)
                                                    } a.pos.x = S.x + (e.x || 0); a.pos.y = S.y + (w || 0)
                                            }
                                        }
                                    } function K(a) { this.axis.getPosition && v(a.pos, this.axis.getPosition(this.pos)) } function R(a, b) { const c = this.chart, d = this.center; a = this.startAngleRad + a; return { x: c.plotLeft + d[0] + Math.cos(a) * b, y: c.plotTop + d[1] + Math.sin(a) * b } } function T() { this.isDirty = !1 } function w() {
                                        let a, b; this.constructor.prototype.setAxisSize.call(this); this.isRadial && (this.pane.updateCenter(this), a = this.center = this.pane.center.slice(), this.isCircular ? this.sector =
                                            this.endAngleRad - this.startAngleRad : (b = this.postTranslate(this.angleRad, a[3] / 2), a[0] = b.x - this.chart.plotLeft, a[1] = b.y - this.chart.plotTop), this.len = this.width = this.height = (a[2] - a[3]) * y(this.sector, 1) / 2)
                                    } function E() { this.constructor.prototype.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0) }
                                    function x(a) { a = this.options = D(this.constructor.defaultOptions, this.defaultPolarOptions, d[this.coll], a); a.plotBands || (a.plotBands = []); n(this, "afterSetOptions") } function W(a, b, c, d, e, f, g) { const h = this.axis; h.isRadial ? (a = h.getPosition(this.pos, h.center[2] / 2 + d), b = ["M", b, c, "L", a.x, a.y]) : b = a.call(this, b, c, d, e, f, g); return b } const S = [], Y = { gridLineWidth: 1, labels: { align: void 0, x: 0, y: void 0, style: { textOverflow: "none" } }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, X = {
                                        labels: {
                                            align: "center", distance: -25,
                                            x: 0, y: void 0
                                        }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2
                                    }, Z = { gridLineInterpolation: "circle", gridLineWidth: 1, labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 } }; b.compose = function (a, b) {
                                        h.pushUnique(S, a) && (q(a, "afterInit", H), q(a, "autoLabelAlign", M), q(a, "destroy", J), q(a, "init", O), q(a, "initialAxisTranslation", U)); h.pushUnique(S,
                                            b) && (q(b, "afterGetLabelPosition", V), q(b, "afterGetPosition", K), c(b.prototype, "getMarkPath", W)); return a
                                    }
                                })(k || (k = {})); return k
                            }); t(b, "Series/PolarComposition.js", [b["Core/Animation/AnimationUtilities.js"], b["Core/Globals.js"], b["Core/Series/Series.js"], b["Extensions/Pane.js"], b["Core/Axis/RadialAxis.js"], b["Core/Utilities.js"]], function (a, b, e, h, f, m) {
                                function d(a, b, c, e) {
                                    var f = e ? 1 : 0; var g = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0; b = 0 > g - 1 ? a.length - (1 + f) : g - 1; var h = a[b]; f = a[g + 1 > a.length - 1 ? f : g + 1]; var k = h.plotY;
                                    var m = f.plotX; var w = f.plotY; f = a[g].plotX; g = a[g].plotY; h = (1.5 * f + h.plotX) / 2.5; k = (1.5 * g + k) / 2.5; m = (1.5 * f + m) / 2.5; var l = (1.5 * g + w) / 2.5; w = Math.sqrt(Math.pow(h - f, 2) + Math.pow(k - g, 2)); const E = Math.sqrt(Math.pow(m - f, 2) + Math.pow(l - g, 2)); h = Math.atan2(k - g, h - f); l = Math.PI / 2 + (h + Math.atan2(l - g, m - f)) / 2; Math.abs(h - l) > Math.PI / 2 && (l -= Math.PI); h = f + Math.cos(l) * w; k = g + Math.sin(l) * w; m = f + Math.cos(Math.PI + l) * E; l = g + Math.sin(Math.PI + l) * E; f = { rightContX: m, rightContY: l, leftContX: h, leftContY: k, plotX: f, plotY: g }; c && (f.prevPointCont = d(a,
                                        b, !1, e)); return f
                                } function t() { (this.pane || []).forEach(a => { a.render() }) } function C(a) { const b = a.args[0].xAxis, c = a.args[0].yAxis; a = a.args[0].chart; b && c && ("polygon" === c.gridLineInterpolation ? (b.startOnTick = !0, b.endOnTick = !0) : "polygon" === b.gridLineInterpolation && a.inverted && (c.startOnTick = !0, c.endOnTick = !0)) } function v() { this.pane || (this.pane = []); this.options.pane = U(this.options.pane); this.options.pane.forEach(a => { new h(a, this) }, this) } function n(a) {
                                    var b = a.args.marker, c = this.chart.xAxis[0], d = this.chart.yAxis[0],
                                    e = this.chart.inverted; const f = e ? d : c; c = e ? c : d; if (this.chart.polar) { a.preventDefault(); d = (b.attr ? b.attr("start") : b.start) - f.startAngleRad; e = b.attr ? b.attr("r") : b.r; let g = (b.attr ? b.attr("end") : b.end) - f.startAngleRad; b = b.attr ? b.attr("innerR") : b.innerR; a.result.x = d + f.pos; a.result.width = g - d; a.result.y = c.len + c.pos - b; a.result.height = b - e }
                                } function D(a) {
                                    var b = this.chart; if (b.polar && b.hoverPane && b.hoverPane.axis) {
                                        a.preventDefault(); var c = b.hoverPane.center, d = this.mouseDownX || 0; const E = this.mouseDownY || 0; var e =
                                            a.args.chartY; const q = a.args.chartX; var f = 2 * Math.PI, g = b.hoverPane.axis.startAngleRad, h = b.hoverPane.axis.endAngleRad, l = b.inverted ? b.xAxis[0] : b.yAxis[0]; const x = {}; var m = "arc"; x.x = c[0] + b.plotLeft; x.y = c[1] + b.plotTop; if (this.zoomHor) {
                                                var w = 0 < g ? h - g : Math.abs(g) + Math.abs(h), p = Math.atan2(E - b.plotTop - c[1], d - b.plotLeft - c[0]) - g, n = Math.atan2(e - b.plotTop - c[1], q - b.plotLeft - c[0]) - g; x.r = c[2] / 2; x.innerR = c[3] / 2; 0 >= p && (p += f); 0 >= n && (n += f); n < p && (n = [p, p = n][0]); w < f && g + n > h + (f - w) / 2 && (n = p, p = 0 >= g ? g : 0); f = x.start = Math.max(p +
                                                    g, g); w = x.end = Math.min(n + g, h); if ("polygon" === l.options.gridLineInterpolation) { m = b.hoverPane.axis; n = f - m.startAngleRad + m.pos; p = w - f; f = l.getPlotLinePath({ value: l.max }); w = m.toValue(n); n = m.toValue(n + p); if (w < m.getExtremes().min) { const { min: a, max: b } = m.getExtremes(); w = b - (a - w) } if (n < m.getExtremes().min) { const { min: a, max: b } = m.getExtremes(); n = b - (a - n) } n < w && (n = [w, w = n][0]); f = k(f, w, n, m); f.push(["L", c[0] + b.plotLeft, b.plotTop + c[1]]); x.d = f; m = "path" }
                                            } this.zoomVert && (n = b.inverted ? b.xAxis[0] : b.yAxis[0], d = Math.sqrt(Math.pow(d -
                                                b.plotLeft - c[0], 2) + Math.pow(E - b.plotTop - c[1], 2)), e = Math.sqrt(Math.pow(q - b.plotLeft - c[0], 2) + Math.pow(e - b.plotTop - c[1], 2)), e < d && (d = [e, e = d][0]), e > c[2] / 2 && (e = c[2] / 2), d < c[3] / 2 && (d = c[3] / 2), this.zoomHor || (x.start = g, x.end = h), x.r = e, x.innerR = d, "polygon" === n.options.gridLineInterpolation && (c = n.toValue(n.len + n.pos - d), g = n.toValue(n.len + n.pos - e), c = n.getPlotLinePath({ value: g }).concat(n.getPlotLinePath({ value: c, reverse: !0 })), x.d = c, m = "path")); this.zoomHor && this.zoomVert && "polygon" === l.options.gridLineInterpolation &&
                                                    (c = b.hoverPane.axis, l = x.start || 0, g = l - c.startAngleRad + c.pos, h = (x.end || 0) - l, l = c.toValue(g), c = c.toValue(g + h), x.d instanceof Array && (g = x.d.slice(0, x.d.length / 2), h = x.d.slice(x.d.length / 2, x.d.length), h = [...h].reverse(), b = b.hoverPane.axis, g = k(g, l, c, b), (h = k(h, l, c, b)) && (h[0][0] = "L"), h = [...h].reverse(), x.d = g.concat(h), m = "path")); a.attrs = x; a.shapeType = m
                                    }
                                } function y() { const a = this.chart; a.polar && (this.polar = new T(this), a.inverted && (this.isRadialSeries = !0, this.is("column") && (this.isRadialBar = !0))) } function g() {
                                    if (this.chart.polar &&
                                        this.xAxis) {
                                            const { xAxis: a, yAxis: d } = this, e = this.chart; (this.kdByAngle = e.tooltip && e.tooltip.shared) ? this.searchPoint = c : this.options.findNearestPointBy = "xy"; const f = this.points; let g = f.length; for (; g--;)this.is("column") || this.is("columnrange") || this.polar.toXY(f[g]), e.hasParallelCoordinates || this.yAxis.reversed || (J(f[g].y, Number.MIN_VALUE) < d.min || f[g].x < a.min || f[g].x > a.max ? (f[g].isNull = !0, f[g].plotY = NaN) : f[g].isNull = f[g].isValid && !f[g].isValid()); this.hasClipCircleSetter || (this.hasClipCircleSetter =
                                                !!this.eventsToUnbind.push(I(this, "afterRender", function () { if (e.polar) { var a = this.yAxis.pane.center; if (this.clipCircle) this.clipCircle.animate({ x: a[0], y: a[1], r: a[2] / 2, innerR: a[3] / 2 }); else { { var c = e.renderer; var d = a[0], f = a[1], g = a[2] / 2, h = a[3] / 2; a = V(); const b = c.createElement("clipPath").attr({ id: a }).add(c.defs); c = h ? c.arc(d, f, g, h, 0, 2 * Math.PI).add(b) : c.circle(d, f, g).add(b); c.id = a; c.clipPath = b } this.clipCircle = c } this.group.clip(this.clipCircle); this.setClip = b.noop } })))
                                    }
                                } function c(a) {
                                    const b = this.chart; var c =
                                        this.xAxis; c = c.pane && c.pane.center; return this.searchKDTree({ clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - (c && c[0] || 0) - b.plotLeft, a.chartY - (c && c[1] || 0) - b.plotTop) })
                                } function k(a, b, c, d) { const e = d.tickInterval; d = d.tickPositions; let f = B(d, a => a >= c), g = B([...d].reverse(), a => a <= b); l(f) || (f = d[d.length - 1]); l(g) || (g = d[0], f += e, a[0][0] = "L", a.unshift(a[a.length - 3])); a = a.slice(d.indexOf(g), d.indexOf(f) + 1); a[0][0] = "M"; return a } function r(a, b) {
                                    return B(this.pane || [], function (a) { return a.options.id === b }) || a.call(this,
                                        b)
                                } function G(a, b, c, d, f, g) {
                                    const h = this.chart; var k = J(d.inside, !!this.options.stacking); h.polar ? (a = b.rectPlotX / Math.PI * 180, h.inverted ? (this.forceDL = h.isInsidePlot(b.plotX, b.plotY), k && b.shapeArgs ? (k = b.shapeArgs, k = this.yAxis.postTranslate(((k.start || 0) + (k.end || 0)) / 2 - this.xAxis.startAngleRad, b.barX + b.pointWidth / 2), f = M(f, { x: k.x - h.plotLeft, y: k.y - h.plotTop })) : b.tooltipPos && (f = M(f, { x: b.tooltipPos[0], y: b.tooltipPos[1] })), d.align = J(d.align, "center"), d.verticalAlign = J(d.verticalAlign, "middle")) : (null === d.align &&
                                        (d.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"), null === d.verticalAlign && (d.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle")), e.prototype.alignDataLabel.call(this, b, c, d, f, g), this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end ? c.hide() : c.show()) : a.call(this, b, c, d, f, g)
                                } function z() {
                                    const a = this.options, b = a.stacking, c = this.chart; var d = this.xAxis; const e = this.yAxis, f = e.reversed, g = e.center, h = d.startAngleRad, k = d.endAngleRad - h; let n = 0, p, q, v, r = 0; var t = 0; if (d.isRadial) {
                                        d =
                                        this.points; p = d.length; q = e.translate(e.min); v = e.translate(e.max); var u = a.threshold || 0; c.inverted && H(u) && (n = e.translate(u), l(n) && (0 > n ? n = 0 : n > k && (n = k), this.translatedThreshold = n + h)); for (; p--;) {
                                            u = d[p]; var y = u.barX; var A = u.x; var z = u.y; u.shapeType = "arc"; if (c.inverted) {
                                                u.plotY = e.translate(z); b && e.stacking ? (z = e.stacking.stacks[(0 > z ? "-" : "") + this.stackKey], this.visible && z && z[A] && !u.isNull && (t = z[A].points[this.getStackIndicator(void 0, A, this.index).key], r = e.translate(t[0]), t = e.translate(t[1]), l(r) && (r = m.clamp(r,
                                                    0, k)))) : (r = n, t = u.plotY); r > t && (t = [r, r = t][0]); if (!f) if (r < q) r = q; else if (t > v) t = v; else { if (t < q || r > v) r = t = 0 } else if (t > q) t = q; else if (r < v) r = v; else if (r > q || t < v) r = t = k; e.min > e.max && (r = t = f ? k : 0); r += h; t += h; g && (u.barX = y += g[3] / 2); A = Math.max(y, 0); z = Math.max(y + u.pointWidth, 0); var B = a.borderRadius; B = O(("object" === typeof B ? B.radius : B) || 0, z - A); u.shapeArgs = { x: g[0], y: g[1], r: z, innerR: A, start: r, end: t, borderRadius: B }; u.opacity = r === t ? 0 : void 0; u.plotY = (l(this.translatedThreshold) && (r < this.translatedThreshold ? r : t)) - h
                                            } else r = y +
                                                h, u.shapeArgs = this.polar.arc(u.yBottom, u.plotY, r, r + u.pointWidth), u.shapeArgs.borderRadius = 0; this.polar.toXY(u); c.inverted ? (y = e.postTranslate(u.rectPlotY, y + u.pointWidth / 2), u.tooltipPos = [y.x - c.plotLeft, y.y - c.plotTop]) : u.tooltipPos = [u.plotX, u.plotY]; g && (u.ttBelow = u.plotY > g[1])
                                        }
                                    }
                                } function P(a, b) {
                                    const c = this; let d; if (this.chart.polar) {
                                        b = b || this.points; for (let a = 0; a < b.length; a++)if (!b[a].isNull) { var e = a; break } !1 !== this.options.connectEnds && "undefined" !== typeof e && (this.connectEnds = !0, b.splice(b.length,
                                            0, b[e]), d = !0); b.forEach(a => { "undefined" === typeof a.polarPlotY && c.polar.toXY(a) })
                                    } e = a.apply(this, [].slice.call(arguments, 1)); d && b.pop(); return e
                                } function A(a, b) { const c = this.chart; let d = { xAxis: [], yAxis: [] }; c.polar ? c.axes.forEach(a => { if ("colorAxis" !== a.coll) { var e = a.isXAxis, f = a.center, g = b.chartX - f[0] - c.plotLeft; f = b.chartY - f[1] - c.plotTop; d[e ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(e ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0) }) } }) : d = a.call(this, b); return d } function p(a,
                                    b) { this.chart.polar || a.call(this, b) } function Q(a, c) {
                                        const d = this, e = this.chart, f = this.group, g = this.markerGroup, h = this.xAxis && this.xAxis.center, k = e.plotLeft, m = e.plotTop; let l = this.options.animation, n, p, w, q, r; e.polar ? d.isRadialBar ? c || (d.startAngleRad = J(d.translatedThreshold, d.xAxis.startAngleRad), b.seriesTypes.pie.prototype.animate.call(d, c)) : (l = F(l), d.is("column") ? c || (n = h[3] / 2, d.points.forEach(a => {
                                            p = a.graphic; q = (w = a.shapeArgs) && w.r; r = w && w.innerR; p && w && (p.attr({ r: n, innerR: n }), p.animate({ r: q, innerR: r },
                                                d.options.animation))
                                        })) : c ? (a = { translateX: h[0] + k, translateY: h[1] + m, scaleX: .001, scaleY: .001 }, f.attr(a), g && g.attr(a)) : (a = { translateX: k, translateY: m, scaleX: 1, scaleY: 1 }, f.animate(a, l), g && g.animate(a, l))) : a.call(this, c)
                                    } function N(a, b, c, e) {
                                        this.chart.polar ? e ? (a = d(b, e, !0, this.connectEnds), b = a.prevPointCont && a.prevPointCont.rightContX, c = a.prevPointCont && a.prevPointCont.rightContY, a = ["C", H(b) ? b : a.plotX, H(c) ? c : a.plotY, H(a.leftContX) ? a.leftContX : a.plotX, H(a.leftContY) ? a.leftContY : a.plotY, a.plotX, a.plotY]) :
                                            a = ["M", c.plotX, c.plotY] : a = a.call(this, b, c, e); return a
                                    } const { animObject: F } = a, { addEvent: I, defined: l, find: B, isNumber: H, merge: M, pick: J, relativeLength: O, splat: U, uniqueKey: V, wrap: K } = m, R = []; class T {
                                        static compose(a, b, c, d, e, h, k, l, q) {
                                            f.compose(a, e); m.pushUnique(R, b) && (I(b, "afterDrawChartBox", t), I(b, "getAxes", v), I(b, "init", C), K(b.prototype, "get", r)); m.pushUnique(R, c) && (a = c.prototype, K(a, "getCoordinates", A), K(a, "pinch", p), I(c, "getSelectionMarkerAttrs", D), I(c, "getSelectionBox", n)); m.pushUnique(R, d) && (I(d, "afterInit",
                                                y), I(d, "afterTranslate", g, { order: 2 }), I(d, "afterColumnTranslate", z, { order: 4 }), K(d.prototype, "animate", Q)); k && m.pushUnique(R, k) && (c = k.prototype, K(c, "alignDataLabel", G), K(c, "animate", Q)); l && m.pushUnique(R, l) && K(l.prototype, "getGraphPath", P); q && m.pushUnique(R, q) && (l = q.prototype, K(l, "getPointSpline", N), h && m.pushUnique(R, h) && (h.prototype.getPointSpline = l.getPointSpline))
                                        } constructor(a) { this.series = a } arc(a, b, c, d) {
                                            const e = this.series, f = e.xAxis.center, g = e.yAxis.len, h = f[3] / 2; b = g - b + h; a = g - J(a, g) + h; e.yAxis.reversed &&
                                                (0 > b && (b = h), 0 > a && (a = h)); return { x: f[0], y: f[1], r: b, innerR: a, start: c, end: d }
                                        } toXY(a) {
                                            var b = this.series; const c = b.chart, d = b.xAxis; var e = b.yAxis; const f = a.plotX, g = c.inverted, h = a.y; let k = a.plotY, l = g ? f : e.len - k; g && b && !b.isRadialBar && (a.plotY = k = H(h) ? e.translate(h) : 0); a.rectPlotX = f; a.rectPlotY = k; e.center && (l += e.center[3] / 2); H(k) && (e = g ? e.postTranslate(k, l) : d.postTranslate(f, l), a.plotX = a.polarPlotX = e.x - c.plotLeft, a.plotY = a.polarPlotY = e.y - c.plotTop); b.kdByAngle ? (b = (f / Math.PI * 180 + d.pane.options.startAngle) % 360,
                                                0 > b && (b += 360), a.clientX = b) : a.clientX = a.plotX
                                        }
                                } return T
                            }); t(b, "masters/highcharts-more.src.js", [b["Core/Globals.js"], b["Core/Series/SeriesRegistry.js"], b["Series/Bubble/BubbleSeries.js"], b["Series/PackedBubble/PackedBubbleSeries.js"], b["Series/PolarComposition.js"]], function (a, b, e, h, f) { e.compose(a.Axis, a.Chart, a.Legend, a.Series); h.compose(a.Axis, a.Chart, a.Legend, a.Series); f.compose(a.Axis, a.Chart, a.Pointer, a.Series, a.Tick, b.seriesTypes.areasplinerange, b.seriesTypes.column, b.seriesTypes.line, b.seriesTypes.spline) })
});
//# sourceMappingURL=highcharts-more.js.map