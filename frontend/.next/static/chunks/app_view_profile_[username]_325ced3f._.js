(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/view_profile/[username]/viewProfile.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backDropContainer": "viewProfile-module__rrYFRW__backDropContainer",
  "card": "viewProfile-module__rrYFRW__card",
  "card__profileContainer": "viewProfile-module__rrYFRW__card__profileContainer",
  "connectBtn": "viewProfile-module__rrYFRW__connectBtn",
  "container": "viewProfile-module__rrYFRW__container",
  "profileContainer__details": "viewProfile-module__rrYFRW__profileContainer__details",
});
}),
"[project]/app/view_profile/[username]/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ViewProfileClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$redux$2f$action$2f$postAction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/redux/action/postAction/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/app/view_profile/[username]/viewProfile.module.css [app-client] (css module)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/index.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function ViewProfileClient(param) {
    let { userProfile, username } = param;
    var _userProfile_userId, _userProfile_userId1, _userProfile_userId2;
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const postReducer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ViewProfileClient.useSelector[postReducer]": (state)=>state.postReducer
    }["ViewProfileClient.useSelector[postReducer]"]);
    const authState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "ViewProfileClient.useSelector[authState]": (state)=>state.auth
    }["ViewProfileClient.useSelector[authState]"]);
    const [userPosts, setUserPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isCurrentUserInConnection, setIsCurrentUserInConnection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isConnectionNull, setIsConnectionNull] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Fetch posts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ViewProfileClient.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$redux$2f$action$2f$postAction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAllPosts"])());
        }
    }["ViewProfileClient.useEffect"], [
        dispatch
    ]);
    // Filter posts of the current user
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ViewProfileClient.useEffect": ()=>{
            const posts = postReducer.posts.filter({
                "ViewProfileClient.useEffect.posts": (post)=>post.userId.username === username
            }["ViewProfileClient.useEffect.posts"]);
            setUserPosts(posts);
        }
    }["ViewProfileClient.useEffect"], [
        postReducer.posts,
        username
    ]);
    // Check connection status
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ViewProfileClient.useEffect": ()=>{
            var _authState_connections;
            if ((_authState_connections = authState.connections) === null || _authState_connections === void 0 ? void 0 : _authState_connections.some({
                "ViewProfileClient.useEffect": (user)=>user.connectionId._id === userProfile.userId._id
            }["ViewProfileClient.useEffect"])) {
                setIsCurrentUserInConnection(true);
                if (authState.connections.find({
                    "ViewProfileClient.useEffect": (user)=>user.connectionId._id === userProfile.userId._id
                }["ViewProfileClient.useEffect"]).status_accepted === "true") {
                    setIsConnectionNull(false);
                }
            }
        }
    }["ViewProfileClient.useEffect"], [
        authState.connections,
        userProfile.userId._id
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backDropContainer,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backDrop,
                    src: (userProfile === null || userProfile === void 0 ? void 0 : (_userProfile_userId = userProfile.userId) === null || _userProfile_userId === void 0 ? void 0 : _userProfile_userId.profilePicture) ? userProfile.userId.profilePicture.startsWith("/") ? userProfile.userId.profilePicture : "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_URL"], "/upload/").concat(userProfile.userId.profilePicture) : "/images/default.jpg",
                    alt: "backdrop"
                }, void 0, false, {
                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/view_profile/[username]/page.jsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profileContainer__details,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: "flex",
                        gap: "0.7rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: "0.8"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        width: "fit-content",
                                        alignItems: "center",
                                        gap: "1.2rem"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            children: userProfile === null || userProfile === void 0 ? void 0 : (_userProfile_userId1 = userProfile.userId) === null || _userProfile_userId1 === void 0 ? void 0 : _userProfile_userId1.name
                                        }, void 0, false, {
                                            fileName: "[project]/app/view_profile/[username]/page.jsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: "grey"
                                            },
                                            children: userProfile === null || userProfile === void 0 ? void 0 : (_userProfile_userId2 = userProfile.userId) === null || _userProfile_userId2 === void 0 ? void 0 : _userProfile_userId2.username
                                        }, void 0, false, {
                                            fileName: "[project]/app/view_profile/[username]/page.jsx",
                                            lineNumber: 59,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                                    lineNumber: 57,
                                    columnNumber: 13
                                }, this),
                                userProfile && !isCurrentUserInConnection ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].connectBtn,
                                    onClick: ()=>{
                                        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$redux$2f$action$2f$postAction$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sendConnectionRequest"])({
                                            token: localStorage.getItem("token"),
                                            connectionId: userProfile.userId._id
                                        }));
                                        setIsConnectionNull(false);
                                    },
                                    children: isConnectionNull ? "Connect" : "Pending"
                                }, void 0, false, {
                                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].connectedButton,
                                    children: "Connected"
                                }, void 0, false, {
                                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                                    lineNumber: 76,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: userProfile === null || userProfile === void 0 ? void 0 : userProfile.bio
                                    }, void 0, false, {
                                        fileName: "[project]/app/view_profile/[username]/page.jsx",
                                        lineNumber: 80,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: "0.2"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "Recent Activity"
                                        }, void 0, false, {
                                            fileName: "[project]/app/view_profile/[username]/page.jsx",
                                            lineNumber: 84,
                                            columnNumber: 15
                                        }, this),
                                        userPosts.map((posts)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].postCard,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$view_profile$2f5b$username$5d2f$viewProfile$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card__profileContainer,
                                                    children: posts.media !== "" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: "".concat(__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$index$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BASE_URL"], "/").concat(posts.media),
                                                        alt: ""
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/view_profile/[username]/page.jsx",
                                                        lineNumber: 89,
                                                        columnNumber: 23
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: "3.4rem",
                                                            height: "3.4rem"
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/view_profile/[username]/page.jsx",
                                                        lineNumber: 91,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this)
                                            }, posts._id, false, {
                                                fileName: "[project]/app/view_profile/[username]/page.jsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                                    lineNumber: 83,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/view_profile/[username]/page.jsx",
                            lineNumber: 56,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                flex: "0.2"
                            }
                        }, void 0, false, {
                            fileName: "[project]/app/view_profile/[username]/page.jsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/view_profile/[username]/page.jsx",
                    lineNumber: 55,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/view_profile/[username]/page.jsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/view_profile/[username]/page.jsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(ViewProfileClient, "yPnwbYEad7SITDDPkhhy/lZf/ZQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = ViewProfileClient;
var _c;
__turbopack_context__.k.register(_c, "ViewProfileClient");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_view_profile_%5Busername%5D_325ced3f._.js.map