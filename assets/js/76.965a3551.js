(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{494:function(e,t,s){"use strict";s.r(t);var o=s(20),a=Object(o.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"c-style"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#c-style"}},[e._v("#")]),e._v(" C++ style")]),e._v(" "),s("p",[e._v("We generally follow "),s("a",{attrs:{href:"https://google.github.io/styleguide/cppguide.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("Google C++ Style Guide"),s("OutboundLink")],1),e._v(".")]),e._v(" "),s("h2",{attrs:{id:"naming"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#naming"}},[e._v("#")]),e._v(" Naming")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("Variable names should consist of lowercase words connected by underscores, e.g. "),s("code",[e._v("llvm_context")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("Class and struct names should consist of words with first letters capitalized, e.g. "),s("code",[e._v("CodegenLLVM")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("Macros should be capital start with "),s("code",[e._v("TI")]),e._v(", such as "),s("code",[e._v("TI_INFO")]),e._v(", "),s("code",[e._v("TI_IMPLEMENTATION")]),e._v(".")]),e._v(" "),s("ul",[s("li",[e._v("We do not encourage the use of macro, although there are cases where macros are inevitable.")])])]),e._v(" "),s("li",[s("p",[e._v("Filenames should consist of lowercase words connected by underscores, e.g. "),s("code",[e._v("ir_printer.cpp")]),e._v(".")])])]),e._v(" "),s("h2",{attrs:{id:"dos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dos"}},[e._v("#")]),e._v(" Dos")]),e._v(" "),s("ul",[s("li",[e._v("Use "),s("code",[e._v("auto")]),e._v(" for local variables when appropriate.")]),e._v(" "),s("li",[e._v("Mark "),s("code",[e._v("override")]),e._v(" and "),s("code",[e._v("const")]),e._v(" when necessary.")])]),e._v(" "),s("h2",{attrs:{id:"don-ts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#don-ts"}},[e._v("#")]),e._v(" Don'ts")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("C language legacies:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("printf")]),e._v(" (Use "),s("code",[e._v("fmtlib::print")]),e._v(" instead).")]),e._v(" "),s("li",[s("code",[e._v("new")]),e._v(" and "),s("code",[e._v("free")]),e._v(". (Use smart pointers "),s("code",[e._v("std::unique_ptr, std::shared_ptr")]),e._v(" instead for ownership management).")]),e._v(" "),s("li",[s("code",[e._v("#include <math.h>")]),e._v(" (Use "),s("code",[e._v("#include <cmath>")]),e._v(" instead).")])])]),e._v(" "),s("li",[s("p",[e._v("Exceptions (We are on our way to "),s("strong",[e._v("remove")]),e._v(" all C++ exception usages in Taichi).")])]),e._v(" "),s("li",[s("p",[e._v("Prefix member functions with "),s("code",[e._v("m_")]),e._v(" or "),s("code",[e._v("_")]),e._v(".")])]),e._v(" "),s("li",[s("p",[e._v("Virtual function call in constructors/destructors.")])]),e._v(" "),s("li",[s("p",[s("code",[e._v("NULL")]),e._v(" (Use "),s("code",[e._v("nullptr")]),e._v(" instead).")])]),e._v(" "),s("li",[s("p",[s("code",[e._v("using namespace std;")]),e._v(" in the global scope.")])]),e._v(" "),s("li",[s("p",[s("code",[e._v("typedef")]),e._v(" (Use "),s("code",[e._v("using")]),e._v(" instead).")])])]),e._v(" "),s("h2",{attrs:{id:"automatic-code-formatting"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#automatic-code-formatting"}},[e._v("#")]),e._v(" Automatic code formatting")]),e._v(" "),s("ul",[s("li",[e._v("Please run "),s("code",[e._v("ti format")])])])])}),[],!1,null,null,null);t.default=a.exports}}]);