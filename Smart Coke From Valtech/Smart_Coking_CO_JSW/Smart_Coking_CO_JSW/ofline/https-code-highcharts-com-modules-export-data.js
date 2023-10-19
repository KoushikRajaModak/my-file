﻿/*
 Highcharts JS v11.1.0 (2023-06-05)

 Exporting module

 (c) 2010-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
'use strict'; var $jscomp = $jscomp || {}; $jscomp.scope = {}; $jscomp.ASSUME_ES5 = !1; $jscomp.ASSUME_NO_NATIVE_MAP = !1; $jscomp.ASSUME_NO_NATIVE_SET = !1; $jscomp.SIMPLE_FROUND_POLYFILL = !1; $jscomp.ISOLATE_POLYFILLS = !1; $jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) { if (a == Array.prototype || a == Object.prototype) return a; a[b] = c.value; return a };
$jscomp.getGlobal = function (a) { a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global]; for (var b = 0; b < a.length; ++b) { var c = a[b]; if (c && c.Math == Math) return c } throw Error("Cannot find global object"); }; $jscomp.global = $jscomp.getGlobal(this); $jscomp.polyfills = {}; $jscomp.propertyToPolyfillSymbol = {}; $jscomp.POLYFILL_PREFIX = "$jscp$"; $jscomp.IS_SYMBOL_NATIVE = "function" === typeof Symbol && "symbol" === typeof Symbol("x");
var $jscomp$lookupPolyfilledValue = function (a, b) { var c = $jscomp.propertyToPolyfillSymbol[b]; if (null == c) return a[b]; c = a[c]; return void 0 !== c ? c : a[b] }; $jscomp.polyfill = function (a, b, c, d) { b && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(a, b, c, d) : $jscomp.polyfillUnisolated(a, b, c, d)) };
$jscomp.polyfillUnisolated = function (a, b, c, d) { c = $jscomp.global; a = a.split("."); for (d = 0; d < a.length - 1; d++) { var e = a[d]; e in c || (c[e] = {}); c = c[e] } a = a[a.length - 1]; d = c[a]; b = b(d); b != d && null != b && $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: b }) };
$jscomp.polyfillIsolated = function (a, b, c, d) {
    var e = a.split("."); a = 1 === e.length; d = e[0]; d = !a && d in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global; for (var p = 0; p < e.length - 1; p++) { var n = e[p]; n in d || (d[n] = {}); d = d[n] } e = e[e.length - 1]; c = $jscomp.IS_SYMBOL_NATIVE && "es6" === c ? d[e] : null; b = b(c); null != b && (a ? $jscomp.defineProperty($jscomp.polyfills, e, { configurable: !0, writable: !0, value: b }) : b !== c && ($jscomp.propertyToPolyfillSymbol[e] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(e) : $jscomp.POLYFILL_PREFIX + e, e = $jscomp.propertyToPolyfillSymbol[e],
        $jscomp.defineProperty(d, e, { configurable: !0, writable: !0, value: b })))
}; $jscomp.polyfill("Array.prototype.includes", function (a) { return a ? a : function (a, c) { var d = this; d instanceof String && (d = String(d)); var e = d.length; c = c || 0; for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) { var b = d[c]; if (b === a || Object.is(b, a)) return !0 } return !1 } }, "es7", "es3");
(function (a) { "object" === typeof module && module.exports ? (a["default"] = a, module.exports = a) : "function" === typeof define && define.amd ? define("highcharts/modules/export-data", ["highcharts", "highcharts/modules/exporting"], function (b) { a(b); a.Highcharts = b; return a }) : a("undefined" !== typeof Highcharts ? Highcharts : void 0) })(function (a) {
    function b(a, b, e, p) { a.hasOwnProperty(b) || (a[b] = p.apply(null, e), "function" === typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: b, module: a[b] } }))) }
    a = a ? a._modules : {}; b(a, "Extensions/ExportData/ExportDataDefaults.js", [], function () {
        ""; return {
            exporting: { csv: { annotations: { itemDelimiter: "; ", join: !1 }, columnHeaderFormatter: null, dateFormat: "%Y-%m-%d %H:%M:%S", decimalPoint: null, itemDelimiter: null, lineDelimiter: "\n" }, showTable: !1, useMultiLevelHeaders: !0, useRowspanHeaders: !0 }, lang: {
                downloadCSV: "Download CSV", downloadXLS: "Download XLS", exportData: { annotationHeader: "Annotations", categoryHeader: "Category", categoryDatetimeHeader: "DateTime" }, viewData: "View data table",
                hideData: "Hide data table"
            }
        }
    }); b(a, "Extensions/DownloadURL.js", [a["Core/Globals.js"]], function (a) {
        const { isSafari: b } = a, c = a.win, p = c.document, n = c.URL || c.webkitURL || c, C = a.dataURLtoBlob = function (a) {
            if ((a = a.replace(/filename=.*;/, "").match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/)) && 3 < a.length && c.atob && c.ArrayBuffer && c.Uint8Array && c.Blob && n.createObjectURL) {
                const d = c.atob(a[3]); var b = new c.ArrayBuffer(d.length); b = new c.Uint8Array(b); for (let a = 0; a < b.length; ++a)b[a] = d.charCodeAt(a); a = new c.Blob([b], { type: a[1] });
                return n.createObjectURL(a)
            }
        }; a = a.downloadURL = function (a, d) {
            var e = c.navigator; const n = p.createElement("a"); if ("string" === typeof a || a instanceof String || !e.msSaveOrOpenBlob) {
                a = `${a}`; e = /Edge\/\d+/.test(e.userAgent); if (b && "string" === typeof a && 0 === a.indexOf("data:application/pdf") || e || 2E6 < a.length) if (a = C(a) || "", !a) throw Error("Failed to convert to blob"); if ("undefined" !== typeof n.download) n.href = a, n.download = d, p.body.appendChild(n), n.click(), p.body.removeChild(n); else try {
                    const b = c.open(a, "chart"); if ("undefined" ===
                        typeof b || null === b) throw Error("Failed to open window");
                } catch (N) { c.location.href = a }
            } else e.msSaveOrOpenBlob(a, d)
        }; return { dataURLtoBlob: C, downloadURL: a }
    }); b(a, "Extensions/ExportData/ExportData.js", [a["Core/Renderer/HTML/AST.js"], a["Extensions/ExportData/ExportDataDefaults.js"], a["Core/Globals.js"], a["Core/Defaults.js"], a["Extensions/DownloadURL.js"], a["Core/Series/SeriesRegistry.js"], a["Core/Utilities.js"]], function (a, b, e, p, n, C, r) {
        function c() {
            const a = this.getCSV(!0); O(P(a, "text/csv") || "data:text/csv,\ufeff" +
                encodeURIComponent(a), this.getFilename() + ".csv")
        } function d() {
            const a = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>' +
                this.getTable(!0) + "</body></html>"; O(P(a, "application/vnd.ms-excel") || "data:application/vnd.ms-excel;base64," + t.btoa(unescape(encodeURIComponent(a))), this.getFilename() + ".xls")
        } function U(a) {
            let l = ""; const c = this.getDataRows(), b = this.options.exporting.csv, d = v(b.decimalPoint, "," !== b.itemDelimiter && a ? (1.1).toLocaleString()[1] : "."), h = v(b.itemDelimiter, "," === d ? ";" : ","), e = b.lineDelimiter; c.forEach((a, b) => {
                let f, q = a.length; for (; q--;)f = a[q], "string" === typeof f && (f = '"' + f + '"'), "number" === typeof f && "." !== d &&
                    (f = f.toString().replace(".", d)), a[q] = f; a.length = c.length ? c[0].length : 0; l += a.join(h); b < c.length - 1 && (l += e)
            }); return l
        } function N(a) {
            const b = this.hasParallelCoordinates, c = this.time, l = this.options.exporting && this.options.exporting.csv || {}, d = this.xAxis, h = {}, e = [], n = [], F = []; var g = this.options.lang.exportData; const y = g.categoryHeader, D = g.categoryDatetimeHeader, Q = function (b, c, d) {
                if (l.columnHeaderFormatter) { const a = l.columnHeaderFormatter(b, c, d); if (!1 !== a) return a } return b ? b instanceof V ? a ? {
                    columnTitle: 1 < d ?
                        c : b.name, topLevelColumnTitle: b.name
                } : b.name + (1 < d ? " (" + c + ")" : "") : b.options.title && b.options.title.text || (b.dateTime ? D : y) : y
            }, p = function (a, b, c) { const l = {}, d = {}; b.forEach(function (b) { var h = (a.keyToAxis && a.keyToAxis[b] || b) + "Axis"; h = W(c) ? a.chart[h][c] : a[h]; l[b] = h && h.categories || []; d[b] = h && h.dateTime }); return { categoryMap: l, dateTimeValueAxisMap: d } }, w = function (a, b) {
                return a.data.filter(a => "undefined" !== typeof a.y && a.name).length && b && !b.categories && !a.keyToAxis ? a.pointArrayMap && a.pointArrayMap.filter(a => "x" ===
                    a).length ? (a.pointArrayMap.unshift("x"), a.pointArrayMap) : ["x", "y"] : a.pointArrayMap || ["y"]
            }, A = []; let k, B, x = 0; this.series.forEach(function (f) {
                const e = f.xAxis, q = f.options.keys || w(f, e), D = q.length, k = !f.requireSorting && {}, E = d.indexOf(e); let y = p(f, q), z, g; if (!1 !== f.options.includeInDataExport && !f.options.isInternal && !1 !== f.visible) {
                    X(A, function (a) { return a[0] === E }) || A.push([E, x]); for (g = 0; g < D;)B = Q(f, q[g], q.length), F.push(B.columnTitle || B), a && n.push(B.topLevelColumnTitle || B), g++; z = {
                        chart: f.chart, autoIncrement: f.autoIncrement,
                        options: f.options, pointArrayMap: f.pointArrayMap, index: f.index
                    }; f.options.data.forEach(function (a, d) {
                        const w = { series: z }; let m; b && (y = p(f, q, d)); f.pointClass.prototype.applyOptions.apply(w, [a]); m = w.x; G(h[m]) && h[m].seriesIndices.includes(z.index) && (a = Object.keys(h).filter(a => h[a].seriesIndices.includes(z.index) && m).filter(a => 0 === a.indexOf(String(m))), m = m.toString() + "," + a.length); a = f.data[d] && f.data[d].name; g = 0; if (!e || "name" === f.exportKey || !b && e && e.hasNames && a) m = a; k && (k[m] && (m += "|" + d), k[m] = !0); h[m] || (h[m] =
                            [], h[m].xValues = []); h[m].x = w.x; h[m].name = a; h[m].xValues[E] = w.x; G(h[m].seriesIndices) || (h[m].seriesIndices = []); for (h[m].seriesIndices = [...h[m].seriesIndices, z.index]; g < D;)d = q[g], a = w[d], h[m][x + g] = v(y.categoryMap[d][a], y.dateTimeValueAxisMap[d] ? c.dateFormat(l.dateFormat, a) : null, a), g++
                    }); x += g
                }
            }); for (u in h) Object.hasOwnProperty.call(h, u) && e.push(h[u]); let r, t; g = a ? [n, F] : [F]; for (x = A.length; x--;) {
                r = A[x][0]; t = A[x][1]; k = d[r]; e.sort(function (a, b) { return a.xValues[r] - b.xValues[r] }); var u = Q(k); g[0].splice(t,
                    0, u); a && g[1] && g[1].splice(t, 0, u); e.forEach(function (a) { let b = a.name; k && !G(b) && (k.dateTime ? (a.x instanceof Date && (a.x = a.x.getTime()), b = c.dateFormat(l.dateFormat, a.x)) : b = k.categories ? v(k.names[a.x], k.categories[a.x], a.x) : a.x); a.splice(t, 0, b) })
            } g = g.concat(e); H(this, "exportData", { dataRows: g }); return g
        } function Y(a) {
            const b = a => {
                if (!a.tagName || "#text" === a.tagName) return a.textContent || ""; const c = a.attributes; let l = `<${a.tagName}`; c && Object.keys(c).forEach(a => { l += ` ${a}="${c[a]}"` }); l += ">"; l += a.textContent ||
                    ""; (a.children || []).forEach(a => { l += b(a) }); return l += `</${a.tagName}>`
            }; a = this.getTableAST(a); return b(a)
        } function Z(a) {
            let b = 0; var c = []; const d = this.options, l = a ? (1.1).toLocaleString()[1] : ".", h = v(d.exporting.useMultiLevelHeaders, !0); a = this.getDataRows(h); const e = h ? a.shift() : null, n = a.shift(), p = function (a, b, c, d) {
                let e = v(d, ""); b = "highcharts-text" + (b ? " " + b : ""); "number" === typeof e ? (e = e.toString(), "," === l && (e = e.replace(".", l)), b = "highcharts-number") : d || (b = "highcharts-empty"); c = R({ "class": b }, c); return {
                    tagName: a,
                    attributes: c, textContent: e
                }
            }; !1 !== d.exporting.tableCaption && c.push({ tagName: "caption", attributes: { "class": "highcharts-table-caption" }, textContent: v(d.exporting.tableCaption, d.title.text ? d.title.text : "Chart") }); for (let c = 0, d = a.length; c < d; ++c)a[c].length > b && (b = a[c].length); c.push(function (a, b, c) {
                const l = []; let e = 0; c = c || b && b.length; let f = 0; var k; if (k = h && a && b) { a: if (k = a.length, b.length === k) { for (; k--;)if (a[k] !== b[k]) { k = !1; break a } k = !0 } else k = !1; k = !k } if (k) {
                    for (k = []; e < c; ++e) {
                        var g = a[e]; var q = a[e + 1]; g === q ?
                            ++f : f ? (k.push(p("th", "highcharts-table-topheading", { scope: "col", colspan: f + 1 }, g)), f = 0) : (g === b[e] ? d.exporting.useRowspanHeaders ? (q = 2, delete b[e]) : (q = 1, b[e] = "") : q = 1, g = p("th", "highcharts-table-topheading", { scope: "col" }, g), 1 < q && g.attributes && (g.attributes.valign = "top", g.attributes.rowspan = q), k.push(g))
                    } l.push({ tagName: "tr", children: k })
                } if (b) { a = []; e = 0; for (c = b.length; e < c; ++e)"undefined" !== typeof b[e] && a.push(p("th", null, { scope: "col" }, b[e])); l.push({ tagName: "tr", children: a }) } return { tagName: "thead", children: l }
            }(e,
                n, Math.max(b, n.length))); const g = []; a.forEach(function (a) { const c = []; for (let d = 0; d < b; d++)c.push(p(d ? "td" : "th", null, d ? {} : { scope: "row" }, a[d])); g.push({ tagName: "tr", children: c }) }); c.push({ tagName: "tbody", children: g }); c = { tree: { tagName: "table", id: `highcharts-data-table-${this.index}`, children: c } }; H(this, "aftergetTableAST", c); return c.tree
        } function aa() { this.toggleDataTable(!1) } function ba(b) {
            var c = (b = v(b, !this.isDataTableVisible)) && !this.dataTableDiv; c && (this.dataTableDiv = ca.createElement("div"), this.dataTableDiv.className =
                "highcharts-data-table", this.renderTo.parentNode.insertBefore(this.dataTableDiv, this.renderTo.nextSibling)); if (this.dataTableDiv) { var d = this.dataTableDiv.style, e = d.display; d.display = b ? "block" : "none"; b && (this.dataTableDiv.innerHTML = a.emptyHTML, (new a([this.getTableAST()])).addToDOM(this.dataTableDiv), H(this, "afterViewData", { element: this.dataTableDiv, wasHidden: c || e !== d.display })) } this.isDataTableVisible = b; c = this.exportDivElements; e = (d = this.options.exporting) && d.buttons && d.buttons.contextButton.menuItems;
            b = this.options.lang; d && d.menuItemDefinitions && b && b.viewData && b.hideData && e && c && (c = c[e.indexOf("viewData")]) && a.setElementHTML(c, this.isDataTableVisible ? b.hideData : b.viewData)
        } function da() { this.toggleDataTable(!0) } function P(a, b) {
            const c = t.navigator, d = -1 < c.userAgent.indexOf("WebKit") && 0 > c.userAgent.indexOf("Chrome"), e = t.URL || t.webkitURL || t; try {
                if (c.msSaveOrOpenBlob && t.MSBlobBuilder) { const b = new t.MSBlobBuilder; b.append(a); return b.getBlob("image/svg+xml") } if (!d) return e.createObjectURL(new t.Blob(["\ufeff" +
                    a], { type: b }))
            } catch (h) { }
        } function ea() {
            const a = this, b = a.dataTableDiv, c = (a, b) => (c, d) => { var e = (b ? c : d).children[a].textContent; c = (b ? d : c).children[a].textContent; return "" === e || "" === c || isNaN(e) || isNaN(c) ? e.toString().localeCompare(c) : e - c }; if (b && a.options.exporting && a.options.exporting.allowTableSorting) {
                const d = b.querySelector("thead tr"); d && d.childNodes.forEach(d => {
                    const e = d.closest("table"); d.addEventListener("click", function () {
                        const l = [...b.querySelectorAll("tr:not(thead tr)")], f = [...d.parentNode.children];
                        l.sort(c(f.indexOf(d), a.ascendingOrderInTable = !a.ascendingOrderInTable)).forEach(a => { e.appendChild(a) }); f.forEach(a => { ["highcharts-sort-ascending", "highcharts-sort-descending"].forEach(b => { a.classList.contains(b) && a.classList.remove(b) }) }); d.classList.add(a.ascendingOrderInTable ? "highcharts-sort-ascending" : "highcharts-sort-descending")
                    })
                })
            }
        } function fa() { this.options && this.options.exporting && this.options.exporting.showTable && !this.options.chart.forExport && this.viewData() } const { doc: ca, win: t } = e, { getOptions: ha,
            setOptions: S } = p, { downloadURL: O } = n, { series: V, seriesTypes: { arearange: I, gantt: J, map: K, mapbubble: L, treemap: M } } = C, { addEvent: T, defined: G, extend: R, find: X, fireEvent: H, isNumber: W, pick: v } = r, u = []; ""; return {
                compose: function (a) {
                    r.pushUnique(u, a) && (T(a, "afterViewData", ea), T(a, "render", fa), a = a.prototype, a.downloadCSV = c, a.downloadXLS = d, a.getCSV = U, a.getDataRows = N, a.getTable = Y, a.getTableAST = Z, a.hideData = aa, a.toggleDataTable = ba, a.viewData = da); if (r.pushUnique(u, S)) {
                        if (a = ha().exporting) R(a.menuItemDefinitions, {
                            downloadCSV: {
                                textKey: "downloadCSV",
                                onclick: function () { this.downloadCSV() }
                            }, downloadXLS: { textKey: "downloadXLS", onclick: function () { this.downloadXLS() } }, viewData: { textKey: "viewData", onclick: function () { this.toggleDataTable() } }
                        }), a.buttons && a.buttons.contextButton.menuItems && a.buttons.contextButton.menuItems.push("separator", "downloadCSV", "downloadXLS", "viewData"); S(b)
                    } I && r.pushUnique(u, I) && (I.prototype.keyToAxis = { low: "y", high: "y" }); J && r.pushUnique(u, J) && (J.prototype.keyToAxis = { start: "x", end: "x" }); K && r.pushUnique(u, K) && (K.prototype.exportKey =
                        "name"); L && r.pushUnique(u, L) && (L.prototype.exportKey = "name"); M && r.pushUnique(u, M) && (M.prototype.exportKey = "name")
                }
            }
    }); b(a, "masters/modules/export-data.src.js", [a["Core/Globals.js"], a["Extensions/ExportData/ExportData.js"]], function (a, b) { b.compose(a.Chart) })
});
//# sourceMappingURL=export-data.js.map