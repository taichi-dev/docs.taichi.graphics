(window.webpackJsonp=window.webpackJsonp||[]).push([[93],{512:function(t,o,e){"use strict";e.r(o);var v=e(20),a=Object(v.a)({},(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"atomic-operations"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#atomic-operations"}},[t._v("#")]),t._v(" Atomic operations")]),t._v(" "),e("p",[t._v("In Taichi, augmented assignments (e.g., "),e("code",[t._v("x[i] += 1")]),t._v(") are automatically "),e("a",{attrs:{href:"https://en.wikipedia.org/wiki/Fetch-and-add",target:"_blank",rel:"noopener noreferrer"}},[t._v("atomic"),e("OutboundLink")],1),t._v(".")]),t._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",{staticClass:"custom-block-title"},[t._v("注意")]),t._v(" "),e("p",[t._v("When modifying global variables in parallel, make sure you use atomic operations. For example, to sum up all the elements in "),e("code",[t._v("x")]),t._v(", :")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("@ti.kernel\ndef sum():\n    for i in x:\n        # Approach 1: OK\n        total[None] += x[i]\n\n        # Approach 2: OK\n        ti.atomic_add(total[None], x[i])\n\n        # Approach 3: Wrong result since the operation is not atomic.\n        total[None] = total[None] + x[i]\n")])])])]),t._v(" "),e("div",{staticClass:"custom-block note"},[e("p",{staticClass:"custom-block-title"},[t._v("注解")]),t._v(" "),e("p",[t._v("When atomic operations are applied to local values, the Taichi compiler will try to demote these operations into their non-atomic counterparts.")])]),t._v(" "),e("p",[t._v("Apart from the augmented assignments, explicit atomic operations, such as "),e("code",[t._v("ti.atomic_add")]),t._v(", also do read-modify-write atomically. These operations additionally return the "),e("strong",[t._v("old value")]),t._v(" of the first argument.")]),t._v(" "),e("p",[t._v("Below is a list of all explicit atomic operations:")]),t._v(" "),e("p",[t._v("::: {.function} ti.atomic_add(x, y)\n:::")]),t._v(" "),e("p",[t._v("::: {.function} ti.atomic_sub(x, y)")]),t._v(" "),e("p",[t._v("Atomically compute "),e("code",[t._v("x + y")]),t._v(" or "),e("code",[t._v("x - y")]),t._v(" and store the result in "),e("code",[t._v("x")]),t._v(".")]),t._v(" "),e("p",[t._v("return\n:")]),t._v(" "),e("p",[t._v("The old value of "),e("code",[t._v("x")]),t._v(".")]),t._v(" "),e("p",[t._v("For example, :")]),t._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",[e("code",[t._v("x[i] = 3\ny[i] = 4\nz[i] = ti.atomic_add(x[i], y[i])\n# now x[i] = 7, y[i] = 4, z[i] = 3\n")])])]),e("p",[t._v(":::")]),t._v(" "),e("p",[t._v("::: {.function} ti.atomic_and(x, y)\n:::")]),t._v(" "),e("p",[t._v("::: {.function} ti.atomic_or(x, y)\n:::")]),t._v(" "),e("p",[t._v("::: {.function} ti.atomic_xor(x, y)")]),t._v(" "),e("p",[t._v("Atomically compute "),e("code",[t._v("x & y")]),t._v(" (bitwise and), "),e("code",[t._v("x | y")]),t._v(" (bitwise or), or "),e("code",[t._v("x ^ y")]),t._v(" (bitwise xor), and store the result in "),e("code",[t._v("x")]),t._v(".")]),t._v(" "),e("p",[t._v("return\n:")]),t._v(" "),e("p",[t._v("The old value of "),e("code",[t._v("x")]),t._v(".\n:::")]),t._v(" "),e("div",{staticClass:"custom-block note"},[e("p",{staticClass:"custom-block-title"},[t._v("注解")]),t._v(" "),e("p",[t._v("Supported atomic operations on each backend:")]),t._v(" "),e("table",[e("thead",[e("tr",[e("th",[t._v("type")]),t._v(" "),e("th",[t._v("CPU/CUDA")]),t._v(" "),e("th",[t._v("OpenGL")]),t._v(" "),e("th",[t._v("Metal")]),t._v(" "),e("th",[t._v("C source")])])]),t._v(" "),e("tbody",[e("tr",[e("td",[t._v("i32")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> OK")])]),t._v(" "),e("tr",[e("td",[t._v("f32")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> OK")])]),t._v(" "),e("tr",[e("td",[t._v("i64")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> EXT")]),t._v(" "),e("td",[t._v("> N/A")]),t._v(" "),e("td",[t._v("> OK")])]),t._v(" "),e("tr",[e("td",[t._v("f64")]),t._v(" "),e("td",[t._v("> OK")]),t._v(" "),e("td",[t._v("> EXT")]),t._v(" "),e("td",[t._v("> N/A")]),t._v(" "),e("td",[t._v("> OK")])])])]),t._v(" "),e("p",[t._v("(OK: supported; EXT: require extension; N/A: not available)")])])])}),[],!1,null,null,null);o.default=a.exports}}]);