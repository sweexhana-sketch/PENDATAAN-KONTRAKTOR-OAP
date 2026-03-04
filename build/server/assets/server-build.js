import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withComponentProps, Outlet, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import * as React from 'react';
import { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback } from 'react';
import { useButton } from '@react-aria/button';
import { f as fetchWithHeaders } from './index-B0OumYWQ.js';
import { SessionProvider, useSession, signIn, signOut } from '@hono/auth-js/react';
import { toPng } from 'html-to-image';
import { serializeError } from 'serialize-error';
import { Toaster, toast } from 'sonner';
import { useIdleTimer } from 'react-idle-timer';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { LogOut, LayoutDashboard, Users, FileText, CheckCircle, Clock, ArrowLeft, Search, Filter, Eye, XCircle, User, Building, TrendingUp, Shield, AlertTriangle, Edit, Plus, X } from 'lucide-react';
import { useParams } from 'react-router-dom';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import 'node:fs';
import 'node:path';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-ignore
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match?.[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry]) => {
        const {
          width,
          height
        } = entry.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
const LoadFontsSSR = LoadFonts ;
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  const shouldScale = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  const scaleFactor = shouldScale ? 1.02 : 1;
  const copyButtonTextClass = shouldScale ? "text-sm" : "text-xs";
  const copyButtonPaddingClass = shouldScale ? "px-[10px] py-[5px]" : "px-[6px] py-[3px]";
  const postCountRef = useRef(0);
  const lastPostTimeRef = useRef(0);
  const lastErrorKeyRef = useRef(null);
  const MAX_ERROR_POSTS_PER_ERROR = 5;
  const THROTTLE_MS = 1e3;
  useEffect(() => {
    const serialized = serializeError(error);
    const errorKey = JSON.stringify(serialized);
    if (errorKey !== lastErrorKeyRef.current) {
      lastErrorKeyRef.current = errorKey;
      postCountRef.current = 0;
    }
    if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
      return;
    }
    const now = Date.now();
    const timeSinceLastPost = now - lastPostTimeRef.current;
    const post = () => {
      if (postCountRef.current >= MAX_ERROR_POSTS_PER_ERROR) {
        return;
      }
      postCountRef.current += 1;
      lastPostTimeRef.current = Date.now();
      window.parent.postMessage({
        type: "sandbox:error:detected",
        error: serialized
      }, "*");
    };
    if (timeSinceLastPost < THROTTLE_MS) {
      const timer = setTimeout(post, THROTTLE_MS - timeSinceLastPost);
      return () => clearTimeout(timer);
    }
    post();
  }, [error]);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      const toastScale = shouldScale ? 1.2 : 1;
      const toastStyle = {
        padding: `${16 * toastScale}px`,
        background: "#18191B",
        border: "1px solid #2C2D2F",
        color: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: `${280 * toastScale}px`,
        fontSize: `${13 * toastScale}px`,
        display: "flex",
        alignItems: "center",
        gap: `${6 * toastScale}px`,
        justifyContent: "flex-start",
        margin: "0 auto"
      };
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
      toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        style: toastStyle,
        renderId: "render-63211f1c",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor",
          height: "20",
          width: "20",
          children: [/* @__PURE__ */ jsx("title", {
            children: "Success"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            fillRule: "evenodd",
            d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
            clipRule: "evenodd",
            renderId: "render-a84022e0",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-e957312c",
          as: "span",
          children: "Copied successfully!"
        })]
      }), {
        id: "copy-error-success",
        duration: 3e3
      });
    }, [error, shouldScale])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(Fragment, {
    children: !isInIframe() && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-md z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
      style: {
        width: "75vw"
      },
      renderId: "render-35d60c7b",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 shadow-lg w-full",
        style: scaleFactor !== 1 ? {
          transform: `scale(${scaleFactor})`,
          transformOrigin: "bottom center"
        } : void 0,
        renderId: "render-8c2fbe7c",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start gap-3",
          renderId: "render-8f7a9b98",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-shrink-0",
            renderId: "render-2753d0bd",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
              renderId: "render-89635bcf",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-black text-[1.125rem] leading-none",
                renderId: "render-c63df4f2",
                as: "span",
                children: "!"
              })
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-2 flex-1",
            renderId: "render-c56c6135",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-col gap-1",
              renderId: "render-6e0d36cd",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "font-light text-[#F2F2F2] text-sm",
                renderId: "render-1d933e16",
                as: "p",
                children: "App Error Detected"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-[#959697] text-sm font-light",
                renderId: "render-3683ecad",
                as: "p",
                children: "It looks like an error occurred while trying to use your app."
              })]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: `flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white ${copyButtonTextClass} ${copyButtonPaddingClass} w-fit`,
              type: "button",
              ...copyButtonProps,
              renderId: "render-536e9416",
              as: "button",
              children: "Copy error"
            })]
          })]
        })
      })
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected,
      supportsErrorDetected: true
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(Toaster, {
        position: isMobile ? "top-center" : "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1e3 * 60 * 5,
      // 5 minutes
      cacheTime: 1e3 * 60 * 30,
      // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});
function RootLayout({
  children
}) {
  return /* @__PURE__ */ jsx(QueryClientProvider, {
    client: queryClient,
    children
  });
}

const useUser = () => {
  const {
    data: session,
    status
  } = useSession();
  const id = session?.user?.id;
  const [user, setUser] = React.useState(session?.user ?? null);
  const fetchUser = React.useCallback(async session => {
    return session?.user;
  }, []);
  const refetchUser = React.useCallback(() => {
    if (process.env.NEXT_PUBLIC_CREATE_ENV === "PRODUCTION") {
      if (id) {
        fetchUser(session).then(setUser);
      } else {
        setUser(null);
      }
    }
  }, [fetchUser, id]);
  React.useEffect(refetchUser, [refetchUser]);
  if (process.env.NEXT_PUBLIC_CREATE_ENV !== "PRODUCTION") {
    return {
      user,
      data: session?.user || null,
      loading: status === 'loading',
      refetch: refetchUser
    };
  }
  return {
    user,
    data: user,
    loading: status === 'loading' || status === 'authenticated' && !user,
    refetch: refetchUser
  };
};

function HomePage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [userRole, setUserRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setRoleLoading(false);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  if (userLoading || roleLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-d18a06c0",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-ac60c4e4",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  if (!user) {
    return null;
  }
  const navigate = (path) => {
    window.location.href = path;
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-ba59a088",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-ef2d3454",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto flex items-center justify-between",
        renderId: "render-55a62b29",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-0b8ee825",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-bold text-[#2A2E45]",
            renderId: "render-56ca06b1",
            as: "h1",
            children: "Sistem Pendataan Kontraktor OAP"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-24c6a590",
            as: "p",
            children: "Dinas PUPR Papua Barat Daya"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-1e0fdac9",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-right",
            renderId: "render-62b776b0",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-semibold text-[#2A2E45]",
              renderId: "render-3b9a0a35",
              as: "div",
              children: user.email
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-[#8A8FA6]",
              renderId: "render-387cab22",
              as: "div",
              children: userRole === "admin" ? "Administrator" : "Kontraktor"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => navigate("/account/logout"),
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            title: "Keluar",
            renderId: "render-9e57ae3d",
            as: "button",
            children: /* @__PURE__ */ jsx(LogOut, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto p-6",
      renderId: "render-638cecad",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "mb-6",
        renderId: "render-c14fc6ad",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#2A2E45] mb-2",
          renderId: "render-02fc2e17",
          as: "h2",
          children: "Selamat Datang"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-[#8A8FA6]",
          renderId: "render-fad8c0f4",
          as: "p",
          children: "Pilih menu di bawah untuk melanjutkan"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        renderId: "render-c9b755cb",
        as: "div",
        children: userRole === "admin" ? /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => navigate("/admin/dashboard"),
            className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
            renderId: "render-d468a353",
            as: "button",
            children: [/* @__PURE__ */ jsx(LayoutDashboard, {
              className: "w-8 h-8 text-[#1570FF] mb-3"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-semibold text-[#2A2E45] mb-2",
              renderId: "render-d684b2b2",
              as: "h3",
              children: "Dashboard Admin"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-238539bf",
              as: "p",
              children: "Lihat statistik dan kelola data kontraktor"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => navigate("/admin/contractors"),
            className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
            renderId: "render-2df87b05",
            as: "button",
            children: [/* @__PURE__ */ jsx(Users, {
              className: "w-8 h-8 text-[#1570FF] mb-3"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-semibold text-[#2A2E45] mb-2",
              renderId: "render-32ba576c",
              as: "h3",
              children: "Daftar Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-abdbf789",
              as: "p",
              children: "Kelola dan verifikasi data kontraktor"
            })]
          })]
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => navigate("/contractor/register"),
            className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
            renderId: "render-f39054fe",
            as: "button",
            children: [/* @__PURE__ */ jsx(FileText, {
              className: "w-8 h-8 text-[#1570FF] mb-3"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-semibold text-[#2A2E45] mb-2",
              renderId: "render-da0ce4cb",
              as: "h3",
              children: "Pendaftaran Data"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-1b19f175",
              as: "p",
              children: "Daftar atau update data kontraktor Anda"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => navigate("/contractor/profile"),
            className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
            renderId: "render-445f52e8",
            as: "button",
            children: [/* @__PURE__ */ jsx(CheckCircle, {
              className: "w-8 h-8 text-[#1570FF] mb-3"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-semibold text-[#2A2E45] mb-2",
              renderId: "render-40dbb717",
              as: "h3",
              children: "Profil Saya"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-3d37f808",
              as: "p",
              children: "Lihat status dan data pendaftaran Anda"
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-6 bg-blue-50 border border-blue-200 rounded p-4",
        renderId: "render-618bf87e",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-start space-x-3",
          renderId: "render-91e8e205",
          as: "div",
          children: [/* @__PURE__ */ jsx(Clock, {
            className: "w-5 h-5 text-blue-600 mt-0.5"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-0d7eaac8",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-semibold text-blue-900 mb-1",
              renderId: "render-403b28ae",
              as: "h4",
              children: "Informasi Penting"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-blue-800",
              renderId: "render-f4cf7d19",
              as: "p",
              children: userRole === "admin" ? "Sebagai admin, Anda dapat melihat, memverifikasi, dan mengelola semua data kontraktor yang terdaftar." : "Pastikan data yang Anda masukkan sesuai dengan dokumen resmi. Data akan diverifikasi oleh admin PUPR."
            })]
          })]
        })
      })]
    })]
  });
}

const page$a = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(HomePage, {
      ...props
    })
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$a
}, Symbol.toStringTag, { value: 'Module' }));

function useAuth() {
  const callbackUrl = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('callbackUrl') : null;
  const signInWithCredentials = useCallback(options => {
    return signIn("credentials", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signUpWithCredentials = useCallback(options => {
    return signIn("credentials", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signInWithGoogle = useCallback(options => {
    return signIn("google", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  const signInWithFacebook = useCallback(options => {
    return signIn("facebook", options);
  }, []);
  const signInWithTwitter = useCallback(options => {
    return signIn("twitter", options);
  }, []);
  const signInWithApple = useCallback(options => {
    return signIn("apple", {
      ...options,
      callbackUrl: callbackUrl ?? options.callbackUrl
    });
  }, [callbackUrl]);
  return {
    signInWithCredentials,
    signUpWithCredentials,
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithApple,
    signOut
  };
}

function LogoutPage() {
  const {
    signOut
  } = useAuth();
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/account/signin",
      redirect: true
    });
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen w-full items-center justify-center bg-[#F7F9FC]",
    renderId: "render-caf7c16a",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-full max-w-md rounded bg-white p-8 border border-[#E4E9F2]",
      renderId: "render-44491ff9",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mb-6 text-center text-2xl font-bold text-[#2A2E45]",
        renderId: "render-468a5fc1",
        as: "h1",
        children: "Keluar"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: handleSignOut,
        className: "w-full h-10 rounded bg-[#1570FF] text-white text-sm font-semibold hover:bg-[#0F5FE6]",
        renderId: "render-94a9001c",
        as: "button",
        children: "Keluar dari Sistem"
      })]
    })
  });
}

const page$9 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(LogoutPage, {
      ...props
    })
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$9
}, Symbol.toStringTag, { value: 'Module' }));

const logoPBD = "/assets/logo-papua-barat-daya-sTH_hmMQ.png";

function SignInPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!email || !password) {
      setError("Mohon isi semua kolom");
      setLoading(false);
      return;
    }
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard"
      });
      if (result?.error) {
        setError("Email atau password salah. Silakan coba lagi.");
        setLoading(false);
      } else {
        window.location.href = result?.url || "/dashboard";
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen flex",
    style: {
      fontFamily: "'Inter', sans-serif"
    },
    renderId: "render-0ebfda9c",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a3a6b] to-[#0d2447] flex-col items-center justify-center p-12 relative overflow-hidden",
      renderId: "render-1d3855d1",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0 opacity-10",
        renderId: "render-e3953fb9",
        as: "div",
        children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute rounded-full border border-white",
          style: {
            width: `${(i + 1) * 120}px`,
            height: `${(i + 1) * 120}px`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          },
          renderId: "render-f56a86f6",
          as: "div"
        }, i))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        src: logoPBD,
        alt: "Logo Papua Barat Daya",
        className: "w-44 h-44 object-contain mb-8 drop-shadow-2xl relative z-10",
        renderId: "render-060f09cf",
        as: "img"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-center relative z-10",
        renderId: "render-7511e9e2",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-white/70 text-base uppercase tracking-widest font-medium mb-2",
          renderId: "render-821dc53f",
          as: "p",
          children: "Pemerintah Provinsi"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-black text-white mb-1",
          renderId: "render-d4a28f9a",
          as: "h1",
          children: "Papua Barat Daya"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-20 h-1 bg-yellow-400 mx-auto rounded mb-6",
          renderId: "render-37c129e4",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xl font-bold text-yellow-300 mb-2",
          renderId: "render-cee57c78",
          as: "h2",
          children: "Dinas PUPR"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-white/80 text-sm leading-relaxed max-w-xs",
          renderId: "render-fdf8eeee",
          as: "p",
          children: ["Sistem Informasi Data Kontraktor", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-2b3b5685",
            as: "br"
          }), "Orang Asli Papua (OAP)"]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-white/50 text-xs mt-8 italic",
          renderId: "render-d49dc765",
          as: "p",
          children: '"Bersatu Membangun Negeri"'
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50",
      renderId: "render-83f0cc25",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "w-full max-w-md",
        renderId: "render-56457be3",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex lg:hidden flex-col items-center mb-8",
          renderId: "render-b6822233",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: logoPBD,
            alt: "Logo Papua Barat Daya",
            className: "w-20 h-20 object-contain mb-3",
            renderId: "render-67bf8650",
            as: "img"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-center",
            renderId: "render-0cde39d4",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-500 uppercase tracking-wider",
              renderId: "render-e12b5f82",
              as: "p",
              children: "Dinas PUPR"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-bold text-[#1a3a6b]",
              renderId: "render-45647888",
              as: "h1",
              children: "Provinsi Papua Barat Daya"
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-8",
          renderId: "render-7c26eb02",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-7",
            renderId: "render-67fc131b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl font-black text-gray-900",
              renderId: "render-46d5a91e",
              as: "h2",
              children: "Masuk ke Sistem"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 mt-1",
              renderId: "render-ee6fdb0c",
              as: "p",
              children: "Silakan masuk dengan akun yang telah terdaftar"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onSubmit,
            className: "space-y-5",
            noValidate: true,
            renderId: "render-d4501151",
            as: "form",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-cef98a68",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-semibold text-gray-700 mb-1.5",
                renderId: "render-c892196a",
                as: "label",
                children: "Alamat Email"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "Masukkan email Anda",
                className: "w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] transition-all",
                renderId: "render-794082bd",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-d853c03d",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-semibold text-gray-700 mb-1.5",
                renderId: "render-48cf5b4a",
                as: "label",
                children: "Password"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Masukkan password Anda",
                className: "w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] transition-all",
                renderId: "render-a8ea12f4",
                as: "input"
              })]
            }), error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-sm text-red-700",
              renderId: "render-8a77e5f2",
              as: "div",
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 flex-shrink-0",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  fillRule: "evenodd",
                  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                  clipRule: "evenodd",
                  renderId: "render-1de8dc31",
                  as: "path"
                })
              }), error]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "submit",
              disabled: loading,
              className: "w-full h-12 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-60",
              style: {
                background: loading ? "#6b7280" : "linear-gradient(135deg, #1a3a6b, #2563eb)"
              },
              renderId: "render-1d017fb5",
              as: "button",
              children: loading ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center justify-center gap-2",
                renderId: "render-3c575d5a",
                as: "span",
                children: [/* @__PURE__ */ jsxs("svg", {
                  className: "animate-spin w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    renderId: "render-5eca5769",
                    as: "circle"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8v8z",
                    renderId: "render-93e0a6fc",
                    as: "path"
                  })]
                }), "Memproses..."]
              }) : "MASUK"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-center pt-2 border-t border-gray-100",
              renderId: "render-000b3705",
              as: "div",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-sm text-gray-500",
                renderId: "render-b6171e82",
                as: "p",
                children: ["Belum memiliki akun?", " ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/account/signup",
                  className: "font-bold text-[#1a3a6b] hover:underline",
                  renderId: "render-e2272b45",
                  as: "a",
                  children: "Daftar Sekarang"
                })]
              })
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-center text-xs text-gray-400 mt-6",
          renderId: "render-b380042c",
          as: "p",
          children: ["© 2025 Dinas PUPR Provinsi Papua Barat Daya", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-57a6645d",
            as: "br"
          }), "Sistem Pendataan Kontraktor OAP — v1.0"]
        })]
      })
    })]
  });
}

const page$8 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SignInPage, {
      ...props
    })
  });
});

const route3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$8
}, Symbol.toStringTag, { value: 'Module' }));

function SignUpPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!name || !email || !password || !confirm) {
      setError("Semua kolom wajib diisi");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak cocok");
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter");
      setLoading(false);
      return;
    }
    try {
      const result = await signIn("credentials", {
        email,
        password,
        name,
        redirect: false,
        callbackUrl: "/dashboard"
      });
      if (result?.error) {
        setError("Email sudah terdaftar atau terjadi kesalahan.");
        setLoading(false);
      } else {
        window.location.href = result?.url || "/dashboard";
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen flex",
    style: {
      fontFamily: "'Inter', sans-serif"
    },
    renderId: "render-f1069b08",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1a3a6b] to-[#0d2447] flex-col items-center justify-center p-12 relative overflow-hidden",
      renderId: "render-bfabc0f5",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "absolute inset-0 opacity-10",
        renderId: "render-f4e8d96a",
        as: "div",
        children: [...Array(6)].map((_, i) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute rounded-full border border-white",
          style: {
            width: `${(i + 1) * 120}px`,
            height: `${(i + 1) * 120}px`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)"
          },
          renderId: "render-4ecd4843",
          as: "div"
        }, i))
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        src: logoPBD,
        alt: "Logo Papua Barat Daya",
        className: "w-44 h-44 object-contain mb-8 drop-shadow-2xl relative z-10",
        renderId: "render-95484cd4",
        as: "img"
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-center relative z-10",
        renderId: "render-4f822653",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-white/70 text-base uppercase tracking-widest font-medium mb-2",
          renderId: "render-2e972a5f",
          as: "p",
          children: "Pemerintah Provinsi"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-3xl font-black text-white mb-1",
          renderId: "render-5308eb62",
          as: "h1",
          children: "Papua Barat Daya"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-20 h-1 bg-yellow-400 mx-auto rounded mb-6",
          renderId: "render-b02abd82",
          as: "div"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xl font-bold text-yellow-300 mb-3",
          renderId: "render-04f2097b",
          as: "h2",
          children: "Dinas PUPR"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-white/80 text-sm leading-relaxed max-w-xs",
          renderId: "render-dd74b90e",
          as: "p",
          children: ["Sistem Pendataan Kontraktor", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-1d231389",
            as: "br"
          }), "Orang Asli Papua (OAP)"]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-white/50 text-xs mt-8 italic",
          renderId: "render-60080ba5",
          as: "p",
          children: '"Bersatu Membangun Negeri"'
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "w-full lg:w-1/2 flex items-center justify-center p-6 bg-gray-50 overflow-y-auto",
      renderId: "render-01fd1610",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "w-full max-w-md py-6",
        renderId: "render-ec3416c6",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex lg:hidden flex-col items-center mb-6",
          renderId: "render-fed9ae05",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: logoPBD,
            alt: "Logo",
            className: "w-16 h-16 object-contain mb-2",
            renderId: "render-6a277616",
            as: "img"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-base font-bold text-[#1a3a6b]",
            renderId: "render-e358bdd8",
            as: "h1",
            children: "Dinas PUPR Provinsi Papua Barat Daya"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white rounded-2xl shadow-lg border border-gray-100 p-8",
          renderId: "render-b6c0038a",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "mb-6",
            renderId: "render-4566c9f1",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-2xl font-black text-gray-900",
              renderId: "render-00b6537b",
              as: "h2",
              children: "Daftar Akun"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 mt-1",
              renderId: "render-404ff497",
              as: "p",
              children: "Buat akun untuk mengakses sistem pendataan kontraktor OAP"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onSubmit,
            className: "space-y-4",
            noValidate: true,
            renderId: "render-9e5128c7",
            as: "form",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-7c0a02da",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-semibold text-gray-700 mb-1.5",
                renderId: "render-deccaf83",
                as: "label",
                children: "Nama Lengkap"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: name,
                onChange: (e) => setName(e.target.value),
                placeholder: "e.g. Ahmad Rumbiak",
                className: "w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] transition-all",
                renderId: "render-4abc931b",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-8c209a07",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-semibold text-gray-700 mb-1.5",
                renderId: "render-df212e5c",
                as: "label",
                children: "Alamat Email"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: "email@contoh.com",
                className: "w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] transition-all",
                renderId: "render-32f80afe",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-d1abf19b",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-semibold text-gray-700 mb-1.5",
                renderId: "render-b9b30cb5",
                as: "label",
                children: "Password"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "password",
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: "Minimal 6 karakter",
                className: "w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] transition-all",
                renderId: "render-7aefcee9",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-284142bc",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-semibold text-gray-700 mb-1.5",
                renderId: "render-a61f7da5",
                as: "label",
                children: "Konfirmasi Password"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "password",
                value: confirm,
                onChange: (e) => setConfirm(e.target.value),
                placeholder: "Ulangi password",
                className: "w-full h-12 px-4 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#1a3a6b] transition-all",
                renderId: "render-3a16e267",
                as: "input"
              })]
            }), error && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-sm text-red-700",
              renderId: "render-d7179cad",
              as: "div",
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 flex-shrink-0",
                fill: "currentColor",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  fillRule: "evenodd",
                  d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",
                  clipRule: "evenodd",
                  renderId: "render-715a13ff",
                  as: "path"
                })
              }), error]
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "submit",
              disabled: loading,
              className: "w-full h-12 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-60",
              style: {
                background: "linear-gradient(135deg, #1a3a6b, #2563eb)"
              },
              renderId: "render-3cdfe0f4",
              as: "button",
              children: loading ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center justify-center gap-2",
                renderId: "render-2d8a0dd4",
                as: "span",
                children: [/* @__PURE__ */ jsxs("svg", {
                  className: "animate-spin w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    renderId: "render-28ccc3a1",
                    as: "circle"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8v8z",
                    renderId: "render-2671488b",
                    as: "path"
                  })]
                }), "Memproses..."]
              }) : "DAFTAR SEKARANG"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-center pt-2 border-t border-gray-100",
              renderId: "render-c5fcd594",
              as: "div",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-sm text-gray-500",
                renderId: "render-de9d0725",
                as: "p",
                children: ["Sudah memiliki akun? ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  href: "/account/signin",
                  className: "font-bold text-[#1a3a6b] hover:underline",
                  renderId: "render-93642293",
                  as: "a",
                  children: "Masuk di sini"
                })]
              })
            })]
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-center text-xs text-gray-400 mt-4",
          renderId: "render-56513ee1",
          as: "p",
          children: "© 2025 Dinas PUPR Provinsi Papua Barat Daya"
        })]
      })
    })]
  });
}

const page$7 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(SignUpPage, {
      ...props
    })
  });
});

const route4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$7
}, Symbol.toStringTag, { value: 'Module' }));

function AdminContractorsPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            if (data.role !== "admin") {
              window.location.href = "/";
            }
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  useEffect(() => {
    const fetchContractors = async () => {
      if (userRole !== "admin") return;
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "all") params.append("status", statusFilter);
        if (searchQuery) params.append("search", searchQuery);
        const res = await fetch(`/api/contractors?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setContractors(data.contractors);
        }
      } catch (error) {
        console.error("Error fetching contractors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContractors();
  }, [userRole, statusFilter, searchQuery]);
  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: Clock,
        label: "Pending"
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle,
        label: "Approved"
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle,
        label: "Rejected"
      }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `inline-flex items-center space-x-1 px-2 py-1 rounded border ${style.bg} ${style.border}`,
      renderId: "render-9f52328e",
      as: "div",
      children: [/* @__PURE__ */ jsx(Icon, {
        className: `w-3 h-3 ${style.text}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-xs font-medium ${style.text}`,
        renderId: "render-7be6c83a",
        as: "span",
        children: style.label
      })]
    });
  };
  if (userLoading || !userRole) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-4bc19fdc",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-47822272",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-241a9381",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-ef0d73da",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto flex items-center space-x-4",
        renderId: "render-b22b0c1a",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/",
          className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
          renderId: "render-48534b5c",
          as: "button",
          children: /* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 text-[#6F7689]"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-68e3b8e4",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-bold text-[#2A2E45]",
            renderId: "render-a1db1d97",
            as: "h1",
            children: "Daftar Kontraktor"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-b81deb62",
            as: "p",
            children: "Dinas PUPR Papua Barat Daya"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto p-6",
      renderId: "render-bc7c89e5",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-4 mb-6",
        renderId: "render-327c8ad3",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-054b4494",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative",
            renderId: "render-17fc508c",
            as: "div",
            children: [/* @__PURE__ */ jsx(Search, {
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8FA6]"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "text",
              placeholder: "Cari NIK, nama, atau perusahaan...",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              className: "w-full h-10 pl-10 pr-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
              renderId: "render-77ab35eb",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "relative",
            renderId: "render-4a112c78",
            as: "div",
            children: [/* @__PURE__ */ jsx(Filter, {
              className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8FA6]"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              value: statusFilter,
              onChange: (e) => setStatusFilter(e.target.value),
              className: "w-full h-10 pl-10 pr-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
              renderId: "render-ff0ab8e6",
              as: "select",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "all",
                renderId: "render-c4226861",
                as: "option",
                children: "Semua Status"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "pending",
                renderId: "render-da841e7f",
                as: "option",
                children: "Menunggu Verifikasi"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "approved",
                renderId: "render-75715699",
                as: "option",
                children: "Terverifikasi"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: "rejected",
                renderId: "render-d83a354e",
                as: "option",
                children: "Ditolak"
              })]
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded",
        renderId: "render-a71bcffa",
        as: "div",
        children: loading ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-8 text-center text-[#8A8FA6]",
          renderId: "render-7f80779c",
          as: "div",
          children: "Memuat..."
        }) : contractors.length === 0 ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "p-8 text-center text-[#8A8FA6]",
          renderId: "render-a003cda3",
          as: "div",
          children: "Tidak ada data kontraktor"
        }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "overflow-x-auto",
          renderId: "render-7402ce11",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full",
            renderId: "render-fb252b1f",
            as: "table",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "bg-[#F7F9FC]",
              renderId: "render-762a8aa1",
              as: "thead",
              children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                renderId: "render-e2b720e1",
                as: "tr",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-bd0c29a9",
                  as: "th",
                  children: "NIK"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-644c68ee",
                  as: "th",
                  children: "Nama Lengkap"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-3dbcfc92",
                  as: "th",
                  children: "Perusahaan"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-d1146d46",
                  as: "th",
                  children: "Telepon"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-f459d9d7",
                  as: "th",
                  children: "Status"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-left text-xs font-semibold text-[#6F7689]",
                  renderId: "render-5b7becec",
                  as: "th",
                  children: "Tanggal Daftar"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-center text-xs font-semibold text-[#6F7689]",
                  renderId: "render-7dd1cc2e",
                  as: "th",
                  children: "Aksi"
                })]
              })
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "divide-y divide-[#E4E9F2]",
              renderId: "render-c4f299d2",
              as: "tbody",
              children: contractors.map((contractor) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "hover:bg-[#FAFBFD]",
                renderId: "render-c3a62df2",
                as: "tr",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45]",
                  renderId: "render-a129f0aa",
                  as: "td",
                  children: contractor.nik
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45] font-medium",
                  renderId: "render-787ac0b7",
                  as: "td",
                  children: contractor.full_name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45]",
                  renderId: "render-1ca6f89f",
                  as: "td",
                  children: contractor.company_name
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#2A2E45]",
                  renderId: "render-5e65a74a",
                  as: "td",
                  children: contractor.phone
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3",
                  renderId: "render-12a9629e",
                  as: "td",
                  children: getStatusBadge(contractor.status)
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-sm text-[#8A8FA6]",
                  renderId: "render-7b2b2114",
                  as: "td",
                  children: new Date(contractor.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "px-4 py-3 text-center",
                  renderId: "render-1eb9d0a5",
                  as: "td",
                  children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    onClick: () => window.location.href = `/admin/contractors/${contractor.id}`,
                    className: "inline-flex items-center space-x-1 px-3 py-1 bg-[#EDF3FF] text-[#1570FF] rounded text-xs font-semibold hover:bg-[#DBEAFE]",
                    renderId: "render-30b7f19a",
                    as: "button",
                    children: [/* @__PURE__ */ jsx(Eye, {
                      className: "w-3 h-3"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      renderId: "render-15f62ad2",
                      as: "span",
                      children: "Lihat"
                    })]
                  })
                })]
              }, contractor.id))
            })]
          })
        })
      })]
    })]
  });
}

const page$6 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminContractorsPage, {
      ...props
    })
  });
});

const route5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$6
}, Symbol.toStringTag, { value: 'Module' }));

function AdminContractorDetailPage({
  params
}) {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            if (data.role !== "admin") {
              window.location.href = "/";
            }
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  useEffect(() => {
    const fetchContractor = async () => {
      if (!userRole) return;
      try {
        const res = await fetch(`/api/contractors/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setContractor(data.contractor);
        }
      } catch (error) {
        console.error("Error fetching contractor:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userRole === "admin") {
      fetchContractor();
    }
  }, [userRole, params.id]);
  const handleApprove = async () => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/contractors/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contractor_id: contractor.id,
          status: "approved"
        })
      });
      if (res.ok) {
        const data = await res.json();
        setContractor(data.contractor);
      }
    } catch (error) {
      console.error("Error approving contractor:", error);
    } finally {
      setActionLoading(false);
    }
  };
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Mohon isi alasan penolakan");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/contractors/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contractor_id: contractor.id,
          status: "rejected",
          rejection_reason: rejectionReason
        })
      });
      if (res.ok) {
        const data = await res.json();
        setContractor(data.contractor);
        setShowRejectModal(false);
        setRejectionReason("");
      }
    } catch (error) {
      console.error("Error rejecting contractor:", error);
    } finally {
      setActionLoading(false);
    }
  };
  if (userLoading || loading || !userRole) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-bac6178e",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-566afe2b",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  if (!contractor) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-e1fb9ff0",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-1107af8e",
        as: "div",
        children: "Kontraktor tidak ditemukan"
      })
    });
  }
  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: Clock,
        label: "Menunggu Verifikasi"
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle,
        label: "Terverifikasi"
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle,
        label: "Ditolak"
      }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${style.bg} ${style.border}`,
      renderId: "render-8abf40dc",
      as: "div",
      children: [/* @__PURE__ */ jsx(Icon, {
        className: `w-4 h-4 ${style.text}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-sm font-medium ${style.text}`,
        renderId: "render-d547bd8f",
        as: "span",
        children: style.label
      })]
    });
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-64aa10a3",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-208d58d9",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto flex items-center justify-between",
        renderId: "render-37f30b85",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-013bcb7d",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/admin/contractors",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-ae823536",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-34cb190c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-0715a6ce",
              as: "h1",
              children: "Detail Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-c423ef0b",
              as: "p",
              children: contractor.full_name
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto p-6 space-y-6",
      renderId: "render-885964e2",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-6c325491",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-4",
          renderId: "render-c45cec60",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-c2592e2e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-lg font-semibold text-[#2A2E45] mb-2",
              renderId: "render-f6a025e3",
              as: "h2",
              children: "Status Verifikasi"
            }), getStatusBadge(contractor.status)]
          }), contractor.status === "pending" && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex space-x-3",
            renderId: "render-de9cfc02",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: handleApprove,
              disabled: actionLoading,
              className: "px-4 h-9 bg-green-600 text-white rounded text-sm font-semibold hover:bg-green-700 disabled:opacity-50 flex items-center space-x-2",
              renderId: "render-10d05bee",
              as: "button",
              children: [/* @__PURE__ */ jsx(CheckCircle, {
                className: "w-4 h-4"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-c6d067cc",
                as: "span",
                children: "Setujui"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              onClick: () => setShowRejectModal(true),
              disabled: actionLoading,
              className: "px-4 h-9 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-50 flex items-center space-x-2",
              renderId: "render-36ad2571",
              as: "button",
              children: [/* @__PURE__ */ jsx(XCircle, {
                className: "w-4 h-4"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                renderId: "render-17465490",
                as: "span",
                children: "Tolak"
              })]
            })]
          })]
        }), contractor.status === "rejected" && contractor.rejection_reason && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4",
          renderId: "render-9b5e0aa9",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-red-900 mb-1",
            renderId: "render-d525181a",
            as: "p",
            children: "Alasan Penolakan:"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-red-800",
            renderId: "render-d3c1a4d9",
            as: "p",
            children: contractor.rejection_reason
          })]
        }), contractor.status === "approved" && contractor.verified_at && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4",
          renderId: "render-b7c73a62",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-green-800",
            renderId: "render-f2aee735",
            as: "p",
            children: ["Diverifikasi pada:", " ", new Date(contractor.verified_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-2fbdcc00",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-2 mb-4",
          renderId: "render-bff53e8d",
          as: "div",
          children: [/* @__PURE__ */ jsx(User, {
            className: "w-5 h-5 text-[#1570FF]"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-1d325efe",
            as: "h2",
            children: "Data Pribadi"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-9a706d04",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-b526bb5b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-143a8b6b",
              as: "label",
              children: "NIK"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45] font-medium",
              renderId: "render-765cbe26",
              as: "p",
              children: contractor.nik
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-002d6f8e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-e711dfcb",
              as: "label",
              children: "Nama Lengkap"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45] font-medium",
              renderId: "render-87b16295",
              as: "p",
              children: contractor.full_name
            })]
          }), contractor.birth_place && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-8db1535a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-042b8c80",
              as: "label",
              children: "Tempat Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-54399e8c",
              as: "p",
              children: contractor.birth_place
            })]
          }), contractor.birth_date && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-66b89aeb",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-3b594d8b",
              as: "label",
              children: "Tanggal Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-9c9f9501",
              as: "p",
              children: new Date(contractor.birth_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-f333722b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-2a60fe9c",
              as: "label",
              children: "No. Telepon"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-633f2b2f",
              as: "p",
              children: contractor.phone
            })]
          }), contractor.email && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-cb203519",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-c9f6413b",
              as: "label",
              children: "Email"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-d69e00b3",
              as: "p",
              children: contractor.email
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-d8bc6689",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-aacef325",
              as: "label",
              children: "Alamat"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-4829d6e5",
              as: "p",
              children: contractor.address
            })]
          }), contractor.city && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-2b265b66",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-04b81635",
              as: "label",
              children: "Kota/Kabupaten"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-6c8ba76f",
              as: "p",
              children: contractor.city
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-eacd2c50",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-2b7ba9f3",
              as: "label",
              children: "Provinsi"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-87f6a5ea",
              as: "p",
              children: contractor.province
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-fbec0d5c",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-2 mb-4",
          renderId: "render-8424c8cd",
          as: "div",
          children: [/* @__PURE__ */ jsx(Building, {
            className: "w-5 h-5 text-[#1570FF]"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-d5e2acb5",
            as: "h2",
            children: "Data Perusahaan"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-42563522",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-4d9f246a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-5b32ae36",
              as: "label",
              children: "Nama Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45] font-medium",
              renderId: "render-2b5f17c3",
              as: "p",
              children: contractor.company_name
            })]
          }), contractor.company_type && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-799f91bc",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-cf7f683a",
              as: "label",
              children: "Jenis Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-98af2b90",
              as: "p",
              children: contractor.company_type
            })]
          }), contractor.npwp && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-237df360",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-f57a0103",
              as: "label",
              children: "NPWP"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-1afb3b2b",
              as: "p",
              children: contractor.npwp
            })]
          }), contractor.company_address && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-efcd16e3",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-fed94e5a",
              as: "label",
              children: "Alamat Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-dac88a15",
              as: "p",
              children: contractor.company_address
            })]
          }), contractor.company_phone && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-ee3e090a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-97c2bfa9",
              as: "label",
              children: "Telepon Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-2c089d23",
              as: "p",
              children: contractor.company_phone
            })]
          }), contractor.establishment_year && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-5eb96403",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-b7f8c2f5",
              as: "label",
              children: "Tahun Berdiri"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-583b07eb",
              as: "p",
              children: contractor.establishment_year
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-6258d126",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-9f0de86d",
          as: "h2",
          children: "Klasifikasi & Bidang Usaha"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-1ff48360",
          as: "div",
          children: [(contractor.small_classification || contractor.medium_classification || contractor.large_classification) && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-299a7f48",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-72a153a2",
              as: "label",
              children: "Klasifikasi"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-ffa14099",
              as: "div",
              children: [contractor.small_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200",
                renderId: "render-ff00eb86",
                as: "span",
                children: ["Kecil: ", contractor.small_classification]
              }), contractor.medium_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200",
                renderId: "render-d0370086",
                as: "span",
                children: ["Menengah: ", contractor.medium_classification]
              }), contractor.large_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200",
                renderId: "render-4faeb090",
                as: "span",
                children: ["Besar: ", contractor.large_classification]
              })]
            })]
          }), contractor.business_field && contractor.business_field.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-d740bd0f",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-08bce914",
              as: "label",
              children: "Bidang Usaha"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-bc1fd260",
              as: "div",
              children: contractor.business_field.map((field, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-[#EDF3FF] text-[#1570FF] text-sm rounded-full border border-[#BFDBFE]",
                renderId: "render-8a26102d",
                as: "span",
                children: field
              }, index))
            })]
          })]
        })]
      })]
    }), showRejectModal && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50",
      renderId: "render-8f91d926",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white rounded max-w-md w-full p-6",
        renderId: "render-849f187b",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-f3de765c",
          as: "h3",
          children: "Tolak Pendaftaran"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mb-4",
          renderId: "render-1fbd9135",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "block text-sm font-medium text-[#2A2E45] mb-2",
            renderId: "render-f4c0d36d",
            as: "label",
            children: ["Alasan Penolakan ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-red-500",
              renderId: "render-bfcda9e4",
              as: "span",
              children: "*"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: rejectionReason,
            onChange: (e) => setRejectionReason(e.target.value),
            rows: 4,
            className: "w-full px-3 py-2 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
            placeholder: "Masukkan alasan penolakan...",
            renderId: "render-63050646",
            as: "textarea"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex justify-end space-x-3",
          renderId: "render-b02343db",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => {
              setShowRejectModal(false);
              setRejectionReason("");
            },
            className: "px-4 h-9 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC]",
            renderId: "render-8977a4e0",
            as: "button",
            children: "Batal"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: handleReject,
            disabled: actionLoading || !rejectionReason.trim(),
            className: "px-4 h-9 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700 disabled:opacity-50",
            renderId: "render-3eabba32",
            as: "button",
            children: actionLoading ? "Memproses..." : "Tolak"
          })]
        })]
      })
    })]
  });
}

const page$5 = UNSAFE_withComponentProps(function WrappedPage(props) {
  const params = useParams();
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminContractorDetailPage, {
      ...props,
      id: params.id
    })
  });
});

const route6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$5
}, Symbol.toStringTag, { value: 'Module' }));

function AdminDashboardPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.id) {
        try {
          const res = await fetch("/api/user/role");
          if (res.ok) {
            const data = await res.json();
            if (data.role !== "admin") {
              window.location.href = "/";
            }
            setUserRole(data.role);
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      }
    };
    fetchUserRole();
  }, [user]);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    if (userRole === "admin") {
      fetchStats();
    }
  }, [userRole]);
  if (userLoading || loading || !userRole) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-bb260006",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-437c4878",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-461ff7b3",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-67e064e8",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-7xl mx-auto flex items-center space-x-4",
        renderId: "render-928a2695",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/",
          className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
          renderId: "render-01a1e494",
          as: "button",
          children: /* @__PURE__ */ jsx(ArrowLeft, {
            className: "w-4 h-4 text-[#6F7689]"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          renderId: "render-5d768358",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-bold text-[#2A2E45]",
            renderId: "render-42330ba6",
            as: "h1",
            children: "Dashboard Admin"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-ab8c7667",
            as: "p",
            children: "Dinas PUPR Papua Barat Daya"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-7xl mx-auto p-6",
      renderId: "render-0e657e8d",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6",
        renderId: "render-1fbbc981",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-06d4b781",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-c13a727a",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center",
              renderId: "render-163535d5",
              as: "div",
              children: /* @__PURE__ */ jsx(Users, {
                className: "w-5 h-5 text-blue-600"
              })
            }), /* @__PURE__ */ jsx(TrendingUp, {
              className: "w-4 h-4 text-green-500"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-d4ce3c7d",
            as: "div",
            children: stats?.stats?.total || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-36c97244",
            as: "div",
            children: "Total Kontraktor"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-b604538d",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-73aaa23b",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-green-50 rounded-full flex items-center justify-center",
              renderId: "render-8b67863f",
              as: "div",
              children: /* @__PURE__ */ jsx(CheckCircle, {
                className: "w-5 h-5 text-green-600"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-6d022771",
            as: "div",
            children: stats?.stats?.approved || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-12f946ae",
            as: "div",
            children: "Terverifikasi"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-60064b2c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-e2fc2620",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center",
              renderId: "render-c8a96042",
              as: "div",
              children: /* @__PURE__ */ jsx(Clock, {
                className: "w-5 h-5 text-yellow-600"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-21c0cd92",
            as: "div",
            children: stats?.stats?.pending || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-479dd7c1",
            as: "div",
            children: "Menunggu Verifikasi"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-3da4ad41",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex items-center justify-between mb-2",
            renderId: "render-fcd67f4c",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-10 h-10 bg-red-50 rounded-full flex items-center justify-center",
              renderId: "render-ac202a54",
              as: "div",
              children: /* @__PURE__ */ jsx(XCircle, {
                className: "w-5 h-5 text-red-600"
              })
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-bold text-[#2A2E45] mb-1",
            renderId: "render-bf6c6459",
            as: "div",
            children: stats?.stats?.rejected || 0
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-2d8fd7fb",
            as: "div",
            children: "Ditolak"
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-ea406a22",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-4",
          renderId: "render-9a863eab",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-eefb9716",
            as: "h2",
            children: "Pendaftaran Terbaru"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/admin/contractors",
            className: "text-sm text-[#1570FF] hover:text-[#0F5FE6] font-semibold",
            renderId: "render-10275be6",
            as: "button",
            children: "Lihat Semua →"
          })]
        }), stats?.recentSubmissions && stats.recentSubmissions.length > 0 ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "space-y-3",
          renderId: "render-33e6587f",
          as: "div",
          children: stats.recentSubmissions.map((contractor) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between p-4 bg-[#FAFBFD] rounded border border-[#E4E9F2] hover:bg-[#F7F9FC] cursor-pointer transition-colors",
            onClick: () => window.location.href = `/admin/contractors/${contractor.id}`,
            renderId: "render-c9a6eb45",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex-1",
              renderId: "render-7629875e",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold text-[#2A2E45] mb-1",
                renderId: "render-de4d86bd",
                as: "h3",
                children: contractor.full_name
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-[#8A8FA6]",
                renderId: "render-57af653e",
                as: "p",
                children: contractor.company_name
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex items-center space-x-3",
              renderId: "render-1c74bb80",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-right mr-4",
                renderId: "render-d765df9a",
                as: "div",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-[#8A8FA6]",
                  renderId: "render-c16bde01",
                  as: "p",
                  children: new Date(contractor.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  })
                })
              }), contractor.status === "pending" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-2 py-1 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-200",
                renderId: "render-9c6c4a90",
                as: "span",
                children: "Pending"
              }), contractor.status === "approved" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-2 py-1 bg-green-50 text-green-700 text-xs rounded border border-green-200",
                renderId: "render-ef342a14",
                as: "span",
                children: "Approved"
              }), contractor.status === "rejected" && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-2 py-1 bg-red-50 text-red-700 text-xs rounded border border-red-200",
                renderId: "render-ee7cbff7",
                as: "span",
                children: "Rejected"
              })]
            })]
          }, contractor.id))
        }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-center py-8 text-[#8A8FA6]",
          renderId: "render-64df346c",
          as: "div",
          children: "Belum ada pendaftaran"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-6",
        renderId: "render-5e5237cd",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/admin/contractors?status=pending",
          className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
          renderId: "render-b767776c",
          as: "button",
          children: [/* @__PURE__ */ jsx(Clock, {
            className: "w-8 h-8 text-yellow-600 mb-3"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-2",
            renderId: "render-547836e3",
            as: "h3",
            children: "Verifikasi Kontraktor"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-56ac84de",
            as: "p",
            children: ["Tinjau dan verifikasi ", stats?.stats?.pending || 0, " kontraktor yang menunggu"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/admin/contractors",
          className: "bg-white border border-[#E4E9F2] rounded p-6 hover:bg-[#FAFBFD] text-left transition-colors",
          renderId: "render-05400395",
          as: "button",
          children: [/* @__PURE__ */ jsx(Users, {
            className: "w-8 h-8 text-[#1570FF] mb-3"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-2",
            renderId: "render-633fe91c",
            as: "h3",
            children: "Kelola Kontraktor"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-[#8A8FA6]",
            renderId: "render-9b18ace0",
            as: "p",
            children: "Lihat dan kelola semua data kontraktor terdaftar"
          })]
        })]
      })]
    })]
  });
}

const page$4 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(AdminDashboardPage, {
      ...props
    })
  });
});

const route7 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$4
}, Symbol.toStringTag, { value: 'Module' }));

function MakeAdminPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const handleMakeAdmin = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/make-admin", {
        method: "POST"
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Terjadi kesalahan");
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 2e3);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-2b011cc8",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-1d974730",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  if (!user) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-6a047234",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-5c76a7d1",
        as: "div",
        children: "Silakan login terlebih dahulu"
      })
    });
  }
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "flex min-h-screen items-center justify-center bg-[#F7F9FC] p-4",
    renderId: "render-19edbb60",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "w-full max-w-md",
      renderId: "render-324daa46",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-8",
        renderId: "render-4a81be48",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-center mb-6",
          renderId: "render-1d7caa53",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-16 h-16 bg-[#EDF3FF] rounded-full flex items-center justify-center",
            renderId: "render-136584e4",
            as: "div",
            children: /* @__PURE__ */ jsx(Shield, {
              className: "w-8 h-8 text-[#1570FF]"
            })
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-2xl font-bold text-[#2A2E45] text-center mb-2",
          renderId: "render-397af495",
          as: "h1",
          children: "Buat Admin Pertama"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-sm text-[#8A8FA6] text-center mb-6",
          renderId: "render-a75923cd",
          as: "p",
          children: ["Akun: ", user.email]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-yellow-50 border border-yellow-200 rounded p-4 mb-6",
          renderId: "render-2dbfac94",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-start space-x-3",
            renderId: "render-b0ec8235",
            as: "div",
            children: [/* @__PURE__ */ jsx(AlertTriangle, {
              className: "w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-62408fc9",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-semibold text-yellow-900 mb-1",
                renderId: "render-ba032997",
                as: "p",
                children: "Peringatan Penting!"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "text-sm text-yellow-800 space-y-1",
                renderId: "render-1d5fcd2e",
                as: "ul",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-6e941739",
                  as: "li",
                  children: "• Halaman ini harus DIHAPUS setelah admin pertama dibuat"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-af1bfc1b",
                  as: "li",
                  children: "• Siapapun yang mengakses halaman ini dapat menjadi admin"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-5a7a26e8",
                  as: "li",
                  children: "• Gunakan hanya untuk setup awal aplikasi"
                })]
              })]
            })]
          })
        }), success && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4 mb-4",
          renderId: "render-6a1c74f2",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-green-800 text-center",
            renderId: "render-e78bddd7",
            as: "p",
            children: "✓ Akun berhasil dijadikan admin! Mengalihkan..."
          })
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4 mb-4",
          renderId: "render-33e60e5a",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-red-800 text-center",
            renderId: "render-267ddcf5",
            as: "p",
            children: error
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: handleMakeAdmin,
          disabled: loading || success,
          className: "w-full h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50",
          renderId: "render-8141c8c0",
          as: "button",
          children: loading ? "Memproses..." : "Jadikan Admin"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/",
          className: "w-full h-10 mt-3 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC]",
          renderId: "render-cbbf0b9a",
          as: "button",
          children: "Kembali ke Beranda"
        })]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "mt-4 bg-red-50 border border-red-200 rounded p-4",
        renderId: "render-0e19e90c",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-xs text-red-800 text-center",
          renderId: "render-fd389f4b",
          as: "p",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-f43ef9c7",
            as: "strong",
            children: "JANGAN LUPA:"
          }), " Hapus file /apps/web/src/app/admin/make-first-admin/page.jsx setelah admin pertama dibuat!"]
        })
      })]
    })
  });
}

const page$3 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(MakeAdminPage, {
      ...props
    })
  });
});

const route8 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$3
}, Symbol.toStringTag, { value: 'Module' }));

function ContractorProfilePage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/contractors/my-profile");
        if (res.ok) {
          const data = await res.json();
          setContractor(data.contractor);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchProfile();
    }
  }, [user]);
  if (userLoading || loading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-0b5ae4de",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-939d9a8b",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  const getStatusBadge = (status) => {
    const styles = {
      pending: {
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-200",
        icon: Clock
      },
      approved: {
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-200",
        icon: CheckCircle
      },
      rejected: {
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-200",
        icon: XCircle
      }
    };
    const style = styles[status] || styles.pending;
    const Icon = style.icon;
    const labels = {
      pending: "Menunggu Verifikasi",
      approved: "Terverifikasi",
      rejected: "Ditolak"
    };
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: `inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${style.bg} ${style.border}`,
      renderId: "render-f5d55310",
      as: "div",
      children: [/* @__PURE__ */ jsx(Icon, {
        className: `w-4 h-4 ${style.text}`
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: `text-sm font-medium ${style.text}`,
        renderId: "render-197066a9",
        as: "span",
        children: labels[status]
      })]
    });
  };
  if (!contractor) {
    return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "min-h-screen bg-[#F7F9FC]",
      renderId: "render-93891d1d",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
        renderId: "render-bbffe48a",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "max-w-4xl mx-auto flex items-center space-x-4",
          renderId: "render-c313f16b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-87e6497a",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-23c7d4b4",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-c0807907",
              as: "h1",
              children: "Profil Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-8d91c933",
              as: "p",
              children: "Dinas PUPR Papua Barat Daya"
            })]
          })]
        })
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto p-6",
        renderId: "render-e6937e49",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-12 text-center",
          renderId: "render-29f858c4",
          as: "div",
          children: [/* @__PURE__ */ jsx(FileText, {
            className: "w-16 h-16 text-[#8A8FA6] mx-auto mb-4"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xl font-semibold text-[#2A2E45] mb-2",
            renderId: "render-c49fbf00",
            as: "h2",
            children: "Anda Belum Terdaftar"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-[#8A8FA6] mb-6",
            renderId: "render-e38a5c1e",
            as: "p",
            children: "Silakan lengkapi data kontraktor Anda terlebih dahulu"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/contractor/register",
            className: "px-6 h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6]",
            renderId: "render-1bfdf31d",
            as: "button",
            children: "Daftar Sekarang"
          })]
        })
      })]
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-13a6255b",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-72bdbc67",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto flex items-center justify-between",
        renderId: "render-ada0bee0",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-6755ca37",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-b156d70f",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-2a719506",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-e5bc313d",
              as: "h1",
              children: "Profil Kontraktor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-b501f2d3",
              as: "p",
              children: "Dinas PUPR Papua Barat Daya"
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          onClick: () => window.location.href = "/contractor/register",
          className: "px-4 h-9 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC] flex items-center space-x-2",
          renderId: "render-c17538b9",
          as: "button",
          children: [/* @__PURE__ */ jsx(Edit, {
            className: "w-4 h-4"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-1f98bf50",
            as: "span",
            children: "Edit Data"
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto p-6 space-y-6",
      renderId: "render-42f1200c",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-b5074cf4",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between mb-4",
          renderId: "render-20579cbd",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45]",
            renderId: "render-19789ecb",
            as: "h2",
            children: "Status Verifikasi"
          }), getStatusBadge(contractor.status)]
        }), contractor.status === "rejected" && contractor.rejection_reason && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4",
          renderId: "render-b7114525",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-red-900 mb-1",
            renderId: "render-6b0a2a1d",
            as: "p",
            children: "Alasan Penolakan:"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-red-800",
            renderId: "render-42c1d798",
            as: "p",
            children: contractor.rejection_reason
          })]
        }), contractor.status === "approved" && contractor.verified_at && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4",
          renderId: "render-b9cb658e",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-green-800",
            renderId: "render-7f2c0033",
            as: "p",
            children: ["Diverifikasi pada:", " ", new Date(contractor.verified_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-61ece977",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-f91a0b48",
          as: "h2",
          children: "Data Pribadi"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-c8095c36",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-f513e5cd",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-7280076c",
              as: "label",
              children: "NIK"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-1e4d54ca",
              as: "p",
              children: contractor.nik
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-d59679fe",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-c07183be",
              as: "label",
              children: "Nama Lengkap"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-e6a69d6f",
              as: "p",
              children: contractor.full_name
            })]
          }), contractor.birth_place && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-10b98712",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-e1db7581",
              as: "label",
              children: "Tempat Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-1d10a916",
              as: "p",
              children: contractor.birth_place
            })]
          }), contractor.birth_date && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-c49011a3",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-452d1925",
              as: "label",
              children: "Tanggal Lahir"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-7f02f454",
              as: "p",
              children: new Date(contractor.birth_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-b2e5927b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-5017ab14",
              as: "label",
              children: "No. Telepon"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-8e2543d0",
              as: "p",
              children: contractor.phone
            })]
          }), contractor.email && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-008dd03b",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-f4009875",
              as: "label",
              children: "Email"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-85a378eb",
              as: "p",
              children: contractor.email
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-89e41cda",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-c61bfff7",
              as: "label",
              children: "Alamat"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-0196592e",
              as: "p",
              children: contractor.address
            })]
          }), contractor.city && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-a6696286",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-f25646d0",
              as: "label",
              children: "Kota/Kabupaten"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-226d70f0",
              as: "p",
              children: contractor.city
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-a433642c",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-102cbb6c",
              as: "label",
              children: "Provinsi"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-7cf73262",
              as: "p",
              children: contractor.province
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-928a8678",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-86a79ef7",
          as: "h2",
          children: "Data Perusahaan"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-1 md:grid-cols-2 gap-4",
          renderId: "render-40931193",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-ae219e97",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-bfd0eda1",
              as: "label",
              children: "Nama Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-be823dc6",
              as: "p",
              children: contractor.company_name
            })]
          }), contractor.company_type && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-ddc1c447",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-da36d889",
              as: "label",
              children: "Jenis Perusahaan"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-d1dcac46",
              as: "p",
              children: contractor.company_type
            })]
          }), contractor.npwp && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-0825c5b4",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-e221034e",
              as: "label",
              children: "NPWP"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-7d19c804",
              as: "p",
              children: contractor.npwp
            })]
          }), contractor.company_address && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "md:col-span-2",
            renderId: "render-a4fd1358",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-5e955d19",
              as: "label",
              children: "Alamat Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-465354b7",
              as: "p",
              children: contractor.company_address
            })]
          }), contractor.company_phone && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-b9b431ea",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-7aa2dfcf",
              as: "label",
              children: "Telepon Kantor"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-feb95956",
              as: "p",
              children: contractor.company_phone
            })]
          }), contractor.establishment_year && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-9bf2732e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-1",
              renderId: "render-50bcfff9",
              as: "label",
              children: "Tahun Berdiri"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#2A2E45]",
              renderId: "render-b13b4975",
              as: "p",
              children: contractor.establishment_year
            })]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white border border-[#E4E9F2] rounded p-6",
        renderId: "render-7d389364",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-lg font-semibold text-[#2A2E45] mb-4",
          renderId: "render-9d2c5316",
          as: "h2",
          children: "Klasifikasi & Bidang Usaha"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-4",
          renderId: "render-b8d268f3",
          as: "div",
          children: [(contractor.small_classification || contractor.medium_classification || contractor.large_classification) && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-fceb48b1",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-48f25e4d",
              as: "label",
              children: "Klasifikasi"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-acc4fbb4",
              as: "div",
              children: [contractor.small_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200",
                renderId: "render-5319bb92",
                as: "span",
                children: ["Kecil: ", contractor.small_classification]
              }), contractor.medium_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full border border-green-200",
                renderId: "render-0cca84df",
                as: "span",
                children: ["Menengah: ", contractor.medium_classification]
              }), contractor.large_classification && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-200",
                renderId: "render-c7710baf",
                as: "span",
                children: ["Besar: ", contractor.large_classification]
              })]
            })]
          }), contractor.business_field && contractor.business_field.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-6cdd1af0",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-xs font-medium text-[#8A8FA6] mb-2",
              renderId: "render-131d54f0",
              as: "label",
              children: "Bidang Usaha"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-004a9a8a",
              as: "div",
              children: contractor.business_field.map((field, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "px-3 py-1 bg-[#EDF3FF] text-[#1570FF] text-sm rounded-full border border-[#BFDBFE]",
                renderId: "render-bde40fcf",
                as: "span",
                children: field
              }, index))
            })]
          })]
        })]
      })]
    })]
  });
}

const page$2 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ContractorProfilePage, {
      ...props
    })
  });
});

const route9 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$2
}, Symbol.toStringTag, { value: 'Module' }));

function useUpload() {
  const [loading, setLoading] = React.useState(false);
  const upload = React.useCallback(async input => {
    try {
      setLoading(true);
      let response;
      if ("file" in input && input.file) {
        const formData = new FormData();
        formData.append("file", input.file);
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          body: formData
        });
      } else if ("url" in input) {
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            url: input.url
          })
        });
      } else if ("base64" in input) {
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            base64: input.base64
          })
        });
      } else {
        response = await fetch("/_create/api/upload/", {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream"
          },
          body: input.buffer
        });
      }
      if (!response.ok) {
        if (response.status === 413) {
          throw new Error("Upload failed: File too large.");
        }
        throw new Error("Upload failed");
      }
      const data = await response.json();
      return {
        url: data.url,
        mimeType: data.mimeType || null
      };
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        return {
          error: uploadError.message
        };
      }
      if (typeof uploadError === "string") {
        return {
          error: uploadError
        };
      }
      return {
        error: "Upload failed"
      };
    } finally {
      setLoading(false);
    }
  }, []);
  return [upload, {
    loading
  }];
}

function ContractorRegisterPage() {
  const {
    data: user,
    loading: userLoading
  } = useUser();
  const [upload, {
    loading: uploadLoading
  }] = useUpload();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [existingData, setExistingData] = useState(null);
  const [nik, setNik] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyType, setCompanyType] = useState("PT");
  const [npwp, setNpwp] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [establishmentYear, setEstablishmentYear] = useState("");
  const [businessFields, setBusinessFields] = useState([]);
  const [newBusinessField, setNewBusinessField] = useState("");
  const [smallClassification, setSmallClassification] = useState("");
  const [mediumClassification, setMediumClassification] = useState("");
  const [largeClassification, setLargeClassification] = useState("");
  useEffect(() => {
    if (!userLoading && !user) {
      window.location.href = "/account/signin";
    }
  }, [user, userLoading]);
  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const res = await fetch("/api/contractors/my-profile");
        if (res.ok) {
          const data = await res.json();
          if (data.contractor) {
            setExistingData(data.contractor);
            setNik(data.contractor.nik || "");
            setFullName(data.contractor.full_name || "");
            setBirthPlace(data.contractor.birth_place || "");
            setBirthDate(data.contractor.birth_date || "");
            setPhone(data.contractor.phone || "");
            setEmail(data.contractor.email || user?.email || "");
            setAddress(data.contractor.address || "");
            setCity(data.contractor.city || "");
            setCompanyName(data.contractor.company_name || "");
            setCompanyType(data.contractor.company_type || "PT");
            setNpwp(data.contractor.npwp || "");
            setCompanyAddress(data.contractor.company_address || "");
            setCompanyPhone(data.contractor.company_phone || "");
            setEstablishmentYear(data.contractor.establishment_year || "");
            setBusinessFields(data.contractor.business_field || []);
            setSmallClassification(data.contractor.small_classification || "");
            setMediumClassification(data.contractor.medium_classification || "");
            setLargeClassification(data.contractor.large_classification || "");
          } else {
            setEmail(user?.email || "");
          }
        }
      } catch (err) {
        console.error("Error fetching existing data:", err);
      }
    };
    if (user) {
      fetchExistingData();
    }
  }, [user]);
  const addBusinessField = () => {
    if (newBusinessField.trim()) {
      setBusinessFields([...businessFields, newBusinessField.trim()]);
      setNewBusinessField("");
    }
  };
  const removeBusinessField = (index) => {
    setBusinessFields(businessFields.filter((_, i) => i !== index));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const contractorData = {
        nik,
        full_name: fullName,
        birth_place: birthPlace,
        birth_date: birthDate,
        phone,
        email,
        address,
        city,
        company_name: companyName,
        company_type: companyType,
        npwp,
        company_address: companyAddress,
        company_phone: companyPhone,
        establishment_year: establishmentYear ? parseInt(establishmentYear) : null,
        business_field: businessFields,
        small_classification: smallClassification,
        medium_classification: mediumClassification,
        large_classification: largeClassification
      };
      let res;
      if (existingData) {
        res = await fetch(`/api/contractors/${existingData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contractorData)
        });
      } else {
        res = await fetch("/api/contractors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contractorData)
        });
      }
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Terjadi kesalahan");
      }
      setSuccess(existingData ? "Data berhasil diupdate!" : "Pendaftaran berhasil! Data Anda akan diverifikasi oleh admin.");
      setTimeout(() => {
        window.location.href = "/contractor/profile";
      }, 2e3);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  if (userLoading) {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex min-h-screen items-center justify-center bg-[#F7F9FC]",
      renderId: "render-2b93682b",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-[#8A8FA6]",
        renderId: "render-647c2979",
        as: "div",
        children: "Memuat..."
      })
    });
  }
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-[#F7F9FC]",
    renderId: "render-ae2f6e90",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b border-[#E4E9F2] px-6 py-4",
      renderId: "render-6c80569a",
      as: "div",
      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "max-w-4xl mx-auto flex items-center justify-between",
        renderId: "render-32f22a4d",
        as: "div",
        children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center space-x-4",
          renderId: "render-adfed155",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onClick: () => window.location.href = "/",
            className: "w-8 h-8 bg-white border border-[#E4E9F2] rounded-full flex items-center justify-center hover:bg-[#F7F9FC]",
            renderId: "render-a6f559e3",
            as: "button",
            children: /* @__PURE__ */ jsx(ArrowLeft, {
              className: "w-4 h-4 text-[#6F7689]"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-3695b526",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xl font-bold text-[#2A2E45]",
              renderId: "render-d4667cf5",
              as: "h1",
              children: existingData ? "Update Data Kontraktor" : "Pendaftaran Kontraktor OAP"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-[#8A8FA6]",
              renderId: "render-cffebb3f",
              as: "p",
              children: "Dinas PUPR Papua Barat Daya"
            })]
          })]
        })
      })
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "max-w-4xl mx-auto p-6",
      renderId: "render-55f21181",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: handleSubmit,
        className: "space-y-6",
        renderId: "render-80ffa27c",
        as: "form",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-85dda09d",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-4",
            renderId: "render-5716858e",
            as: "h2",
            children: "Data Pribadi"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            renderId: "render-1c11ffb0",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-c578a0e0",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-a56ae224",
                as: "label",
                children: ["NIK ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-54d13b6a",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: nik,
                onChange: (e) => setNik(e.target.value),
                required: true,
                maxLength: 16,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "16 digit NIK",
                renderId: "render-c1407283",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-7f0ee1fa",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-81133395",
                as: "label",
                children: ["Nama Lengkap ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-497511dc",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: fullName,
                onChange: (e) => setFullName(e.target.value),
                required: true,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-d67ddbd2",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-eedbebfb",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-2d420791",
                as: "label",
                children: "Tempat Lahir"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: birthPlace,
                onChange: (e) => setBirthPlace(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-681db309",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-d62fd5d7",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-4f209d0e",
                as: "label",
                children: "Tanggal Lahir"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "date",
                value: birthDate,
                onChange: (e) => setBirthDate(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-7dd23f91",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-245b9d9a",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-18133428",
                as: "label",
                children: ["No. Telepon ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-166baf86",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "tel",
                value: phone,
                onChange: (e) => setPhone(e.target.value),
                required: true,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "08xxxxxxxxxx",
                renderId: "render-90737cd2",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-0aed3399",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-40f42b8b",
                as: "label",
                children: "Email"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "email",
                value: email,
                onChange: (e) => setEmail(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-bbd1360c",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "md:col-span-2",
              renderId: "render-12b8186f",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-d36124f9",
                as: "label",
                children: ["Alamat ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-72875132",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: address,
                onChange: (e) => setAddress(e.target.value),
                required: true,
                rows: 3,
                className: "w-full px-3 py-2 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-ac66a9be",
                as: "textarea"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-8ff3af94",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-462b4bfc",
                as: "label",
                children: "Kota/Kabupaten"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: city,
                onChange: (e) => setCity(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-ce5adf20",
                as: "input"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-b70572ba",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-4",
            renderId: "render-a8dccd7f",
            as: "h2",
            children: "Data Perusahaan"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
            renderId: "render-94711cdf",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "md:col-span-2",
              renderId: "render-80201d73",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-2faa20f9",
                as: "label",
                children: ["Nama Perusahaan ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-red-500",
                  renderId: "render-1257c906",
                  as: "span",
                  children: "*"
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: companyName,
                onChange: (e) => setCompanyName(e.target.value),
                required: true,
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-ee272db7",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-fbd69f6d",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-9b951887",
                as: "label",
                children: "Jenis Perusahaan"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                value: companyType,
                onChange: (e) => setCompanyType(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-27736aa4",
                as: "select",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "PT",
                  renderId: "render-b70c7636",
                  as: "option",
                  children: "PT (Perseroan Terbatas)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "CV",
                  renderId: "render-ed2cd4f8",
                  as: "option",
                  children: "CV (Commanditaire Vennootschap)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "UD",
                  renderId: "render-5ddd34ac",
                  as: "option",
                  children: "UD (Usaha Dagang)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: "Perorangan",
                  renderId: "render-cee65ffc",
                  as: "option",
                  children: "Perorangan"
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-db20de0b",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-abf567a7",
                as: "label",
                children: "NPWP"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: npwp,
                onChange: (e) => setNpwp(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "00.000.000.0-000.000",
                renderId: "render-ca7bb5c4",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "md:col-span-2",
              renderId: "render-80037549",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-869493fc",
                as: "label",
                children: "Alamat Kantor"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                value: companyAddress,
                onChange: (e) => setCompanyAddress(e.target.value),
                rows: 2,
                className: "w-full px-3 py-2 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-a6db6189",
                as: "textarea"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-b51b1d0d",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-e841552b",
                as: "label",
                children: "Telepon Kantor"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "tel",
                value: companyPhone,
                onChange: (e) => setCompanyPhone(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                renderId: "render-ec79ec21",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-fbe21037",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-2c0be78b",
                as: "label",
                children: "Tahun Berdiri"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "number",
                value: establishmentYear,
                onChange: (e) => setEstablishmentYear(e.target.value),
                min: "1900",
                max: (/* @__PURE__ */ new Date()).getFullYear(),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "2020",
                renderId: "render-ccacc629",
                as: "input"
              })]
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white border border-[#E4E9F2] rounded p-6",
          renderId: "render-31c093cd",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-lg font-semibold text-[#2A2E45] mb-4",
            renderId: "render-98e0eb76",
            as: "h2",
            children: "Klasifikasi & Bidang Usaha"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-4",
            renderId: "render-888d1e64",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-62a6fb4a",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-f23f6fae",
                as: "label",
                children: "Kelas Kecil"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: smallClassification,
                onChange: (e) => setSmallClassification(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "K1, K2, K3",
                renderId: "render-018375f8",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-4271c4b1",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-8256665b",
                as: "label",
                children: "Kelas Menengah"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: mediumClassification,
                onChange: (e) => setMediumClassification(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "M1, M2",
                renderId: "render-bee53bbf",
                as: "input"
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              renderId: "render-e80b86b0",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "block text-sm font-medium text-[#2A2E45] mb-2",
                renderId: "render-e7711540",
                as: "label",
                children: "Kelas Besar"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: largeClassification,
                onChange: (e) => setLargeClassification(e.target.value),
                className: "w-full h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "B1, B2",
                renderId: "render-5f73dd06",
                as: "input"
              })]
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-df7c9aa2",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "block text-sm font-medium text-[#2A2E45] mb-2",
              renderId: "render-72526c68",
              as: "label",
              children: "Bidang Usaha"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "flex space-x-2 mb-2",
              renderId: "render-70dfe1b5",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                type: "text",
                value: newBusinessField,
                onChange: (e) => setNewBusinessField(e.target.value),
                onKeyPress: (e) => e.key === "Enter" && (e.preventDefault(), addBusinessField()),
                className: "flex-1 h-10 px-3 border border-[#E4E9F2] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1570FF]",
                placeholder: "Contoh: Pembangunan Jalan",
                renderId: "render-5f180a7b",
                as: "input"
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                type: "button",
                onClick: addBusinessField,
                className: "px-4 h-10 bg-[#1570FF] text-white rounded text-sm flex items-center space-x-2 hover:bg-[#0F5FE6]",
                renderId: "render-0217cb19",
                as: "button",
                children: [/* @__PURE__ */ jsx(Plus, {
                  className: "w-4 h-4"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  renderId: "render-5b1e53e2",
                  as: "span",
                  children: "Tambah"
                })]
              })]
            }), businessFields.length > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "flex flex-wrap gap-2",
              renderId: "render-722c57e6",
              as: "div",
              children: businessFields.map((field, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center space-x-2 bg-[#EDF3FF] px-3 py-1 rounded-full",
                renderId: "render-f3e6cb24",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-sm text-[#1570FF]",
                  renderId: "render-c5b31230",
                  as: "span",
                  children: field
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "button",
                  onClick: () => removeBusinessField(index),
                  className: "text-[#1570FF] hover:text-[#0F5FE6]",
                  renderId: "render-0af69901",
                  as: "button",
                  children: /* @__PURE__ */ jsx(X, {
                    className: "w-4 h-4"
                  })
                })]
              }, index))
            })]
          })]
        }), error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-red-50 border border-red-200 rounded p-4 text-sm text-red-800",
          renderId: "render-068c93b8",
          as: "div",
          children: error
        }), success && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-green-50 border border-green-200 rounded p-4 text-sm text-green-800",
          renderId: "render-8480d928",
          as: "div",
          children: success
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex justify-end space-x-3",
          renderId: "render-7c85a536",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => window.location.href = "/",
            className: "px-6 h-10 bg-white border border-[#E4E9F2] text-[#2A2E45] rounded text-sm font-semibold hover:bg-[#F7F9FC]",
            renderId: "render-8491f152",
            as: "button",
            children: "Batal"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            type: "submit",
            disabled: loading,
            className: "px-6 h-10 bg-[#1570FF] text-white rounded text-sm font-semibold hover:bg-[#0F5FE6] disabled:opacity-50",
            renderId: "render-c8257097",
            as: "button",
            children: loading ? "Menyimpan..." : existingData ? "Update Data" : "Daftar"
          })]
        })]
      })
    })]
  });
}

const page$1 = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(ContractorRegisterPage, {
      ...props
    })
  });
});

const route10 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page$1
}, Symbol.toStringTag, { value: 'Module' }));

const TABS = [{
  id: "identitas",
  label: "Identitas Perusahaan",
  icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
}, {
  id: "akta",
  label: "Akta Perusahaan",
  icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
}, {
  id: "npwp",
  label: "NPWP",
  icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
}, {
  id: "siujk",
  label: "SIUJK",
  icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
}, {
  id: "smk3",
  label: "SMK3",
  icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
}, {
  id: "tenagaAhli",
  label: "Tenaga Ahli",
  icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
}, {
  id: "rekening",
  label: "Rekening Bank",
  icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
}];
const initialForm = {
  // Identitas
  namaPerusahaan: "",
  jenisUsaha: "",
  alamat: "",
  kota: "",
  provinsi: "Papua Barat Daya",
  telepon: "",
  email: "",
  website: "",
  namaDirektur: "",
  nikDirektur: "",
  // Akta
  aktaNo: "",
  aktaTanggal: "",
  aktaNotaris: "",
  aktaTempat: "",
  skKemenkumham: "",
  aktaPerubahanNo: "",
  aktaPerubahanTanggal: "",
  aktaPerubahanNotaris: "",
  // NPWP
  npwpDirekturNo: "",
  npwpDirekturNama: "",
  npwpPerusahaanNo: "",
  npwpPerusahaanNama: "",
  // SIUJK
  siujkNo: "",
  siujkTanggal: "",
  siujkBerlaku: "",
  siujkKlasifikasi: "",
  siujkKualifikasi: "",
  siujkPenerbit: "",
  // SMK3
  smk3No: "",
  smk3Tanggal: "",
  smk3Berlaku: "",
  smk3Lembaga: "",
  smk3Tingkat: "",
  // Rekening
  bankNama: "",
  bankNoRek: "",
  bankAtasNama: "",
  bankCabang: ""
};
function SectionHeader({
  icon,
  title,
  subtitle
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "flex items-center gap-3 mb-6 pb-4 border-b-2 border-gray-100",
    renderId: "render-407aa46e",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
      style: {
        background: "linear-gradient(135deg, #1a3a6b, #2563eb)"
      },
      renderId: "render-11a32984",
      as: "div",
      children: /* @__PURE__ */ jsx("svg", {
        className: "w-5 h-5 text-white",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 1.8,
          d: icon,
          renderId: "render-f78d8f74",
          as: "path"
        })
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      renderId: "render-50effd55",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-base font-bold text-gray-900",
        renderId: "render-f91e9e58",
        as: "h3",
        children: title
      }), subtitle && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-xs text-gray-500",
        renderId: "render-1b9abb2f",
        as: "p",
        children: subtitle
      })]
    })]
  });
}
function Field({
  label,
  required,
  children,
  half
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: half ? "" : "md:col-span-2",
    renderId: "render-06084d77",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide",
      renderId: "render-c74e788f",
      as: "label",
      children: [label, " ", required && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "text-red-500 normal-case",
        renderId: "render-35b1f061",
        as: "span",
        children: "*"
      })]
    }), children]
  });
}
const inputCls = "w-full h-11 px-3 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a3a6b] transition-all bg-white";
const fileCls = "w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer";
const selectCls = inputCls;
function DashboardPage() {
  const {
    data: session,
    status
  } = useSession();
  const [activeTab, setActiveTab] = useState("identitas");
  const [form, setForm] = useState(initialForm);
  const [files, setFiles] = useState({});
  const [tenagaAhli, setTenagaAhli] = useState([{
    nama: "",
    bidang: "",
    jenisSertifikat: "",
    noSertifikat: "",
    berlaku: "",
    tingkat: "",
    docSertifikat: null
  }]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [records, setRecords] = useState([]);
  useEffect(() => {
    if (status === "unauthenticated") window.location.href = "/account/signin";
  }, [status]);
  useEffect(() => {
    try {
      setRecords(JSON.parse(localStorage.getItem("oap_records") || "[]"));
    } catch {
    }
  }, []);
  const set = (field) => (e) => setForm((p) => ({
    ...p,
    [field]: e.target.value
  }));
  const handleFileChange = (field, taIndex = null) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5MB");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const base64Data = reader.result;
      if (taIndex !== null) {
        setTenagaAhli((p) => p.map((ta, idx) => idx === taIndex ? {
          ...ta,
          [field]: {
            name: file.name,
            type: file.type,
            data: base64Data
          }
        } : ta));
      } else {
        setFiles((p) => ({
          ...p,
          [field]: {
            name: file.name,
            type: file.type,
            data: base64Data
          }
        }));
      }
    };
    reader.readAsDataURL(file);
  };
  const addTenagaAhli = () => setTenagaAhli((p) => [...p, {
    nama: "",
    bidang: "",
    jenisSertifikat: "",
    noSertifikat: "",
    berlaku: "",
    tingkat: "",
    docSertifikat: null
  }]);
  const removeTenagaAhli = (i) => setTenagaAhli((p) => p.filter((_, idx) => idx !== i));
  const setTA = (i, field) => (e) => setTenagaAhli((p) => p.map((ta, idx) => idx === i ? {
    ...ta,
    [field]: e.target.value
  } : ta));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    if (!form.namaPerusahaan || !form.namaDirektur) {
      setResult({
        ok: false,
        message: "Minimal isi Nama Perusahaan dan Nama Direktur"
      });
      setSubmitting(false);
      return;
    }
    try {
      const payload = {
        ...form,
        files,
        tenagaAhli,
        penggunaEmail: session?.user?.email,
        penggunaNama: session?.user?.name,
        waktuInput: (/* @__PURE__ */ new Date()).toLocaleString("id-ID")
      };
      const res = await fetch("/api/submit-kontraktor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        setResult({
          ok: true,
          message: `Data perusahaan "${form.namaPerusahaan}" berhasil disimpan dan dikirim ke Google Sheets!`
        });
        const updated = [{
          ...payload,
          id: Date.now()
        }, ...records].slice(0, 100);
        setRecords(updated);
        localStorage.setItem("oap_records", JSON.stringify(updated));
        setFiles({});
      } else {
        setResult({
          ok: false,
          message: data.error || "Gagal menyimpan data."
        });
      }
    } catch {
      setResult({
        ok: false,
        message: "Terjadi kesalahan koneksi."
      });
    } finally {
      setSubmitting(false);
    }
  };
  if (status === "loading") {
    return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "min-h-screen flex items-center justify-center bg-gray-50",
      renderId: "render-baced863",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-center",
        renderId: "render-ff0902f9",
        as: "div",
        children: [/* @__PURE__ */ jsxs("svg", {
          className: "animate-spin w-10 h-10 text-[#1a3a6b] mx-auto mb-3",
          viewBox: "0 0 24 24",
          fill: "none",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            strokeWidth: "4",
            renderId: "render-f1a91dd2",
            as: "circle"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8v8z",
            renderId: "render-df76ce68",
            as: "path"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm",
          renderId: "render-fad56aae",
          as: "p",
          children: "Memuat sistem..."
        })]
      })
    });
  }
  const currentTabIdx = TABS.findIndex((t) => t.id === activeTab);
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "min-h-screen bg-gray-50",
    style: {
      fontFamily: "'Inter', sans-serif"
    },
    renderId: "render-f9f50581",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-white border-b-2 border-gray-100 shadow-sm sticky top-0 z-30",
      renderId: "render-996e5161",
      as: "header",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-screen-xl mx-auto px-4 flex items-center justify-between h-16",
        renderId: "render-bd902809",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3",
          renderId: "render-2922bc71",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: logoPBD,
            alt: "Logo PBD",
            className: "w-10 h-10 object-contain",
            renderId: "render-9e2955bd",
            as: "img"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-9b5fe626",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-400 uppercase tracking-wider font-medium",
              renderId: "render-5cfe91fa",
              as: "div",
              children: "Dinas PUPR"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-black text-[#1a3a6b] leading-tight",
              renderId: "render-e2378f68",
              as: "div",
              children: "Provinsi Papua Barat Daya"
            })]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "hidden md:block text-center",
          renderId: "render-f240f4ac",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-gray-400 uppercase tracking-wider",
            renderId: "render-b71102f0",
            as: "div",
            children: "Sistem Pendataan"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-bold text-gray-800",
            renderId: "render-51e90c24",
            as: "div",
            children: "Kontraktor OAP"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-3",
          renderId: "render-acc2a685",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "hidden sm:block text-right",
            renderId: "render-4f8ced0e",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-semibold text-gray-800",
              renderId: "render-3f6eb417",
              as: "div",
              children: session?.user?.name || "Pengguna"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-400",
              renderId: "render-10a0ab70",
              as: "div",
              children: session?.user?.email
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm text-white",
            style: {
              background: "linear-gradient(135deg, #1a3a6b, #2563eb)"
            },
            renderId: "render-380b29ee",
            as: "div",
            children: (session?.user?.name || "U")[0].toUpperCase()
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            onClick: () => signOut({
              callbackUrl: "/account/signin"
            }),
            className: "flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition px-2.5 py-1.5 rounded-lg hover:bg-red-50 border border-gray-200",
            renderId: "render-e7b6a2bf",
            as: "button",
            children: [/* @__PURE__ */ jsx("svg", {
              className: "w-3.5 h-3.5",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
                renderId: "render-a9a53f1a",
                as: "path"
              })
            }), "Keluar"]
          })]
        })]
      })
    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-screen-xl mx-auto px-4 py-8",
      renderId: "render-692fa026",
      as: "main",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "rounded-2xl mb-8 p-6 text-white relative overflow-hidden",
        style: {
          background: "linear-gradient(135deg, #1a3a6b 0%, #1d4ed8 60%, #7c3aed 100%)"
        },
        renderId: "render-98685751",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "absolute right-0 top-0 bottom-0 w-64 opacity-10 flex items-center justify-end pr-6",
          renderId: "render-6a02aa1f",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: logoPBD,
            alt: "",
            className: "w-40 h-40 object-contain",
            renderId: "render-abeefa09",
            as: "img"
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "relative z-10",
          renderId: "render-b3992cf0",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs uppercase tracking-wider text-blue-200 font-semibold mb-1",
            renderId: "render-2f036cad",
            as: "div",
            children: "Sistem Informasi"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-2xl font-black mb-1",
            renderId: "render-71b06b15",
            as: "h2",
            children: "Pendataan Kontraktor OAP"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-blue-100 text-sm max-w-xl",
            renderId: "render-29075aff",
            as: "p",
            children: ["Selamat datang, ", /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-cc6c8eeb",
              as: "strong",
              children: session?.user?.name
            }), ". Isi data perusahaan kontraktor Orang Asli Papua secara lengkap. Data yang diinput akan otomatis tersimpan ke Google Sheets Dinas PUPR."]
          })]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onSubmit: handleSubmit,
        renderId: "render-88a1f956",
        as: "form",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "bg-white rounded-2xl shadow-sm border border-gray-100 mb-4",
          renderId: "render-362ae795",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex overflow-x-auto scrollbar-hide",
            renderId: "render-1bcd5df8",
            as: "div",
            children: TABS.map((tab, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              type: "button",
              onClick: () => setActiveTab(tab.id),
              className: `flex items-center gap-2 px-5 py-4 text-xs font-semibold whitespace-nowrap transition-all border-b-3 flex-shrink-0 ${activeTab === tab.id ? "border-b-2 border-[#1a3a6b] text-[#1a3a6b] bg-blue-50" : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"}`,
              renderId: "render-e940e0a4",
              as: "button",
              children: [/* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4 flex-shrink-0",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.8,
                  d: tab.icon,
                  renderId: "render-25cf4902",
                  as: "path"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "hidden sm:inline",
                renderId: "render-0e3a1f16",
                as: "span",
                children: tab.label
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "sm:hidden",
                renderId: "render-cc9bf867",
                as: "span",
                children: i + 1
              })]
            }, tab.id))
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "mb-4 flex items-center gap-3",
          renderId: "render-cb1f12ff",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex-1 h-2 bg-gray-200 rounded-full overflow-hidden",
            renderId: "render-5b08ec44",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "h-full bg-gradient-to-r from-[#1a3a6b] to-[#2563eb] rounded-full transition-all",
              style: {
                width: `${(currentTabIdx + 1) / TABS.length * 100}%`
              },
              renderId: "render-8fce6b74",
              as: "div"
            })
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500 font-medium whitespace-nowrap",
            renderId: "render-c2136ba3",
            as: "span",
            children: [currentTabIdx + 1, " / ", TABS.length]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-5",
          renderId: "render-fb6e6969",
          as: "div",
          children: [activeTab === "identitas" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[0].icon,
              title: "Identitas Perusahaan",
              subtitle: "Data dasar perusahaan kontraktor OAP"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              renderId: "render-444701dd",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "md:col-span-2",
                renderId: "render-f7e2053b",
                as: "div",
                children: /* @__PURE__ */ jsx(Field, {
                  label: "Nama Perusahaan",
                  required: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.namaPerusahaan,
                    onChange: set("namaPerusahaan"),
                    placeholder: "PT / CV / UD nama perusahaan",
                    className: inputCls,
                    renderId: "render-59c92e63",
                    as: "input"
                  })
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Jenis Badan Usaha",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  value: form.jenisUsaha,
                  onChange: set("jenisUsaha"),
                  className: selectCls,
                  renderId: "render-a5135e81",
                  as: "select",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "",
                    renderId: "render-7cce013d",
                    as: "option",
                    children: "Pilih Jenis Usaha"
                  }), ["PT (Perseroan Terbatas)", "CV (Comanditaire Vennootschap)", "Firma", "UD (Usaha Dagang)", "Koperasi"].map((v) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: v,
                    renderId: "render-0e9db301",
                    as: "option",
                    children: v
                  }, v))]
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Nama Direktur Utama",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.namaDirektur,
                  onChange: set("namaDirektur"),
                  placeholder: "Nama lengkap direktur",
                  className: inputCls,
                  renderId: "render-e7d1b78f",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "NIK Direktur",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.nikDirektur,
                  onChange: set("nikDirektur"),
                  placeholder: "16 digit NIK",
                  maxLength: 16,
                  className: inputCls,
                  renderId: "render-aeb79237",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Nomor Telepon",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.telepon,
                  onChange: set("telepon"),
                  placeholder: "08xx-xxxx-xxxx",
                  className: inputCls,
                  renderId: "render-ca76d8b8",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Email Perusahaan",
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "email",
                  value: form.email,
                  onChange: set("email"),
                  placeholder: "email@perusahaan.com",
                  className: inputCls,
                  renderId: "render-fca4f23e",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Website",
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.website,
                  onChange: set("website"),
                  placeholder: "www.perusahaan.com (opsional)",
                  className: inputCls,
                  renderId: "render-23386129",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "md:col-span-2",
                renderId: "render-b307721b",
                as: "div",
                children: /* @__PURE__ */ jsx(Field, {
                  label: "Alamat Lengkap Perusahaan",
                  required: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.alamat,
                    onChange: set("alamat"),
                    rows: 2,
                    placeholder: "Jalan, kelurahan, kecamatan",
                    className: "w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#1a3a6b] transition-all resize-none",
                    renderId: "render-432f413d",
                    as: "textarea"
                  })
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Kota / Kabupaten",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.kota,
                  onChange: set("kota"),
                  placeholder: "Kota / Kabupaten",
                  className: inputCls,
                  renderId: "render-0bb7ad29",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Provinsi",
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.provinsi,
                  onChange: set("provinsi"),
                  className: inputCls,
                  readOnly: true,
                  renderId: "render-5ac602d1",
                  as: "input"
                })
              })]
            })]
          }), activeTab === "akta" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[1].icon,
              title: "Akta Perusahaan",
              subtitle: "Data akta pendirian dan perubahan perusahaan"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "mb-6",
              renderId: "render-c4fd356e",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2 mb-4",
                renderId: "render-747f4a16",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "w-2 h-2 rounded-full bg-[#1a3a6b]",
                  renderId: "render-a9947a49",
                  as: "div"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-sm font-bold text-gray-800",
                  renderId: "render-97ce8f28",
                  as: "h4",
                  children: "Akta Pendirian Perusahaan"
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                renderId: "render-291e6db6",
                as: "div",
                children: [/* @__PURE__ */ jsx(Field, {
                  label: "Nomor Akta",
                  required: true,
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.aktaNo,
                    onChange: set("aktaNo"),
                    placeholder: "Nomor akta pendirian",
                    className: inputCls,
                    renderId: "render-1d79fab9",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsx(Field, {
                  label: "Tanggal Akta",
                  required: true,
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "date",
                    value: form.aktaTanggal,
                    onChange: set("aktaTanggal"),
                    className: inputCls,
                    renderId: "render-89b1602c",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsx(Field, {
                  label: "Nama Notaris",
                  required: true,
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.aktaNotaris,
                    onChange: set("aktaNotaris"),
                    placeholder: "Nama notaris penerbit",
                    className: inputCls,
                    renderId: "render-247b6160",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsx(Field, {
                  label: "Tempat / Kota Notaris",
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.aktaTempat,
                    onChange: set("aktaTempat"),
                    placeholder: "Kota tempat akta dibuat",
                    className: inputCls,
                    renderId: "render-cb49c056",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsxs(Field, {
                  label: "Upload Akta Pendirian (PDF/JPG)",
                  required: true,
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "file",
                    onChange: handleFileChange("docAkta"),
                    accept: ".pdf,.jpg,.jpeg,.png",
                    className: fileCls,
                    renderId: "render-18399451",
                    as: "input"
                  }), files.docAkta && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "text-[10px] text-green-600 mt-1 font-medium",
                    renderId: "render-d8ebaabb",
                    as: "p",
                    children: ["✓ ", files.docAkta.name]
                  })]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "md:col-span-2",
                  renderId: "render-3f36904a",
                  as: "div",
                  children: /* @__PURE__ */ jsx(Field, {
                    label: "SK Pengesahan Kemenkumham",
                    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: form.skKemenkumham,
                      onChange: set("skKemenkumham"),
                      placeholder: "Nomor SK Kemenkumham (jika ada)",
                      className: inputCls,
                      renderId: "render-5e464c1e",
                      as: "input"
                    })
                  })
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "pt-5 border-t border-dashed border-gray-200",
              renderId: "render-2b3d3cdd",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "flex items-center gap-2 mb-4",
                renderId: "render-533b9697",
                as: "div",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "w-2 h-2 rounded-full bg-yellow-500",
                  renderId: "render-4f1322bd",
                  as: "div"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-sm font-bold text-gray-800",
                  renderId: "render-25fd0f02",
                  as: "h4",
                  children: "Akta Perubahan (Jika Ada)"
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "text-xs text-gray-400 italic",
                  renderId: "render-31a88124",
                  as: "span",
                  children: "— opsional"
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                renderId: "render-1013f8a9",
                as: "div",
                children: [/* @__PURE__ */ jsx(Field, {
                  label: "Nomor Akta Perubahan",
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.aktaPerubahanNo,
                    onChange: set("aktaPerubahanNo"),
                    placeholder: "Nomor akta perubahan terakhir",
                    className: inputCls,
                    renderId: "render-9f8b42d0",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsx(Field, {
                  label: "Tanggal Perubahan",
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "date",
                    value: form.aktaPerubahanTanggal,
                    onChange: set("aktaPerubahanTanggal"),
                    className: inputCls,
                    renderId: "render-98600185",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsx(Field, {
                  label: "Notaris Perubahan",
                  half: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.aktaPerubahanNotaris,
                    onChange: set("aktaPerubahanNotaris"),
                    placeholder: "Nama notaris akta perubahan",
                    className: inputCls,
                    renderId: "render-3341990d",
                    as: "input"
                  })
                }), /* @__PURE__ */ jsxs(Field, {
                  label: "Upload Akta Perubahan (PDF/JPG)",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    type: "file",
                    onChange: handleFileChange("docAktaPerubahan"),
                    accept: ".pdf,.jpg,.jpeg,.png",
                    className: fileCls,
                    renderId: "render-cafe6eab",
                    as: "input"
                  }), files.docAktaPerubahan && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "text-[10px] text-green-600 mt-1 font-medium",
                    renderId: "render-8716c823",
                    as: "p",
                    children: ["✓ ", files.docAktaPerubahan.name]
                  })]
                })]
              })]
            })]
          }), activeTab === "npwp" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[2].icon,
              title: "Nomor Pokok Wajib Pajak (NPWP)",
              subtitle: "NPWP Direktur dan NPWP Perusahaan"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "grid grid-cols-1 md:grid-cols-2 gap-8",
              renderId: "render-9f51c771",
              as: "div",
              children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "bg-blue-50 rounded-xl p-5 border border-blue-100",
                renderId: "render-f3157223",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center gap-2 mb-4",
                  renderId: "render-bc74ddfe",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "w-8 h-8 bg-[#1a3a6b] rounded-lg flex items-center justify-center",
                    renderId: "render-f5310b60",
                    as: "div",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-4 h-4 text-white",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                        renderId: "render-dfe10858",
                        as: "path"
                      })
                    })
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-sm font-bold text-gray-800",
                    renderId: "render-75d38267",
                    as: "h4",
                    children: "NPWP Direktur"
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "space-y-3",
                  renderId: "render-a70d50e6",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(Field, {
                    label: "Nomor NPWP Direktur",
                    required: true,
                    half: true,
                    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: form.npwpDirekturNo,
                      onChange: set("npwpDirekturNo"),
                      placeholder: "XX.XXX.XXX.X-XXX.XXX",
                      className: inputCls,
                      renderId: "render-5de952e3",
                      as: "input"
                    })
                  }), /* @__PURE__ */ jsx(Field, {
                    label: "Atas Nama",
                    required: true,
                    half: true,
                    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: form.npwpDirekturNama,
                      onChange: set("npwpDirekturNama"),
                      placeholder: "Nama sesuai NPWP direktur",
                      className: inputCls,
                      renderId: "render-280a5f7d",
                      as: "input"
                    })
                  }), /* @__PURE__ */ jsxs(Field, {
                    label: "Upload NPWP Direktur (PDF/JPG)",
                    required: true,
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      type: "file",
                      onChange: handleFileChange("docNpwpDirektur"),
                      accept: ".pdf,.jpg,.jpeg,.png",
                      className: fileCls,
                      renderId: "render-d86546bc",
                      as: "input"
                    }), files.docNpwpDirektur && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "text-[10px] text-green-600 mt-1 font-medium",
                      renderId: "render-69bbb304",
                      as: "p",
                      children: ["✓ ", files.docNpwpDirektur.name]
                    })]
                  })]
                })]
              }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "bg-green-50 rounded-xl p-5 border border-green-100",
                renderId: "render-21595628",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center gap-2 mb-4",
                  renderId: "render-6ab4589b",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center",
                    renderId: "render-6f151dd6",
                    as: "div",
                    children: /* @__PURE__ */ jsx("svg", {
                      className: "w-4 h-4 text-white",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5",
                        renderId: "render-63b16813",
                        as: "path"
                      })
                    })
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "text-sm font-bold text-gray-800",
                    renderId: "render-9bd78c84",
                    as: "h4",
                    children: "NPWP Perusahaan"
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "space-y-3",
                  renderId: "render-7f6fc898",
                  as: "div",
                  children: [/* @__PURE__ */ jsx(Field, {
                    label: "Nomor NPWP Perusahaan",
                    required: true,
                    half: true,
                    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: form.npwpPerusahaanNo,
                      onChange: set("npwpPerusahaanNo"),
                      placeholder: "XX.XXX.XXX.X-XXX.XXX",
                      className: inputCls,
                      renderId: "render-bea8f1bc",
                      as: "input"
                    })
                  }), /* @__PURE__ */ jsx(Field, {
                    label: "Atas Nama",
                    required: true,
                    half: true,
                    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: form.npwpPerusahaanNama,
                      onChange: set("npwpPerusahaanNama"),
                      placeholder: "Nama sesuai NPWP perusahaan",
                      className: inputCls,
                      renderId: "render-6aa102f5",
                      as: "input"
                    })
                  }), /* @__PURE__ */ jsxs(Field, {
                    label: "Upload NPWP Perusahaan (PDF/JPG)",
                    required: true,
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      type: "file",
                      onChange: handleFileChange("docNpwpPerusahaan"),
                      accept: ".pdf,.jpg,.jpeg,.png",
                      className: fileCls,
                      renderId: "render-b7f2ee65",
                      as: "input"
                    }), files.docNpwpPerusahaan && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "text-[10px] text-green-600 mt-1 font-medium",
                      renderId: "render-34645080",
                      as: "p",
                      children: ["✓ ", files.docNpwpPerusahaan.name]
                    })]
                  })]
                })]
              })]
            })]
          }), activeTab === "siujk" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[3].icon,
              title: "Surat Izin Usaha Jasa Konstruksi (SIUJK)",
              subtitle: "Izin usaha resmi bidang konstruksi"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              renderId: "render-359b4c39",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "md:col-span-2",
                renderId: "render-18e17f68",
                as: "div",
                children: /* @__PURE__ */ jsx(Field, {
                  label: "Nomor SIUJK",
                  required: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.siujkNo,
                    onChange: set("siujkNo"),
                    placeholder: "Nomor SIUJK",
                    className: inputCls,
                    renderId: "render-245d9a7c",
                    as: "input"
                  })
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Tanggal Terbit",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "date",
                  value: form.siujkTanggal,
                  onChange: set("siujkTanggal"),
                  className: inputCls,
                  renderId: "render-8ee13e00",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Masa Berlaku s/d",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "date",
                  value: form.siujkBerlaku,
                  onChange: set("siujkBerlaku"),
                  className: inputCls,
                  renderId: "render-f26e11a8",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Klasifikasi",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  value: form.siujkKlasifikasi,
                  onChange: set("siujkKlasifikasi"),
                  className: selectCls,
                  renderId: "render-36c8e7ca",
                  as: "select",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "",
                    renderId: "render-c8bf527c",
                    as: "option",
                    children: "Pilih Klasifikasi"
                  }), ["Sipil", "Mekanikal", "Elektrikal", "Tata Lingkungan", "Manajemen Pelaksanaan"].map((v) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: v,
                    renderId: "render-8b125e81",
                    as: "option",
                    children: v
                  }, v))]
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Kualifikasi",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  value: form.siujkKualifikasi,
                  onChange: set("siujkKualifikasi"),
                  className: selectCls,
                  renderId: "render-94295e34",
                  as: "select",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "",
                    renderId: "render-9133ee26",
                    as: "option",
                    children: "Pilih Kualifikasi"
                  }), ["Kecil (K1)", "Kecil (K2)", "Kecil (K3)", "Menengah (M1)", "Menengah (M2)", "Besar (B1)", "Besar (B2)"].map((v) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: v,
                    renderId: "render-173e1290",
                    as: "option",
                    children: v
                  }, v))]
                })
              }), /* @__PURE__ */ jsxs(Field, {
                label: "Upload SIUJK (PDF/JPG)",
                required: true,
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "file",
                  onChange: handleFileChange("docSiujk"),
                  accept: ".pdf,.jpg,.jpeg,.png",
                  className: fileCls,
                  renderId: "render-45f0eb25",
                  as: "input"
                }), files.docSiujk && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "text-[10px] text-green-600 mt-1 font-medium",
                  renderId: "render-c00456d3",
                  as: "p",
                  children: ["✓ ", files.docSiujk.name]
                })]
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "md:col-span-2",
                renderId: "render-2ee01da9",
                as: "div",
                children: /* @__PURE__ */ jsx(Field, {
                  label: "Lembaga / Instansi Penerbit",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.siujkPenerbit,
                    onChange: set("siujkPenerbit"),
                    placeholder: "Nama instansi yang menerbitkan SIUJK",
                    className: inputCls,
                    renderId: "render-b6dadb93",
                    as: "input"
                  })
                })
              })]
            })]
          }), activeTab === "smk3" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[4].icon,
              title: "Sistem Manajemen K3 (SMK3)",
              subtitle: "Sertifikat Keselamatan dan Kesehatan Kerja"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              renderId: "render-8ad1d861",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "md:col-span-2",
                renderId: "render-383ed915",
                as: "div",
                children: /* @__PURE__ */ jsx(Field, {
                  label: "Nomor Sertifikat SMK3",
                  required: true,
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: form.smk3No,
                    onChange: set("smk3No"),
                    placeholder: "Nomor sertifikat SMK3",
                    className: inputCls,
                    renderId: "render-848cedc1",
                    as: "input"
                  })
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Tanggal Terbit",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "date",
                  value: form.smk3Tanggal,
                  onChange: set("smk3Tanggal"),
                  className: inputCls,
                  renderId: "render-96b0880a",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Masa Berlaku s/d",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "date",
                  value: form.smk3Berlaku,
                  onChange: set("smk3Berlaku"),
                  className: inputCls,
                  renderId: "render-ac0e8309",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Lembaga Sertifikasi",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.smk3Lembaga,
                  onChange: set("smk3Lembaga"),
                  placeholder: "Nama lembaga sertifikasi K3",
                  className: inputCls,
                  renderId: "render-b666b6ed",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Tingkat Penilaian",
                half: true,
                children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  value: form.smk3Tingkat,
                  onChange: set("smk3Tingkat"),
                  className: selectCls,
                  renderId: "render-a0d8cd73",
                  as: "select",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "",
                    renderId: "render-d2372fc8",
                    as: "option",
                    children: "Pilih Tingkat"
                  }), ["Memuaskan (≥85%)", "Baik (64%-85%)", "Perlu Peningkatan (<64%)", "Belum Tersertifikasi"].map((v) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: v,
                    renderId: "render-c7396785",
                    as: "option",
                    children: v
                  }, v))]
                })
              }), /* @__PURE__ */ jsxs(Field, {
                label: "Upload Sertifikat SMK3 (PDF/JPG)",
                required: true,
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "file",
                  onChange: handleFileChange("docSmk3"),
                  accept: ".pdf,.jpg,.jpeg,.png",
                  className: fileCls,
                  renderId: "render-ebd21b5d",
                  as: "input"
                }), files.docSmk3 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "text-[10px] text-green-600 mt-1 font-medium",
                  renderId: "render-56aaf767",
                  as: "p",
                  children: ["✓ ", files.docSmk3.name]
                })]
              })]
            })]
          }), activeTab === "tenagaAhli" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[5].icon,
              title: "Tenaga Ahli & Tenaga Terampil",
              subtitle: "Daftar SKA / SKT yang dimiliki perusahaan"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "space-y-4",
              renderId: "render-afcca6de",
              as: "div",
              children: [tenagaAhli.map((ta, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "bg-gray-50 rounded-xl p-4 border border-gray-200 relative",
                renderId: "render-abc4c719",
                as: "div",
                children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex items-center justify-between mb-3",
                  renderId: "render-b05bf4ea",
                  as: "div",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "text-xs font-bold text-[#1a3a6b] uppercase tracking-wide",
                    renderId: "render-b1befbaf",
                    as: "span",
                    children: ["Personil #", i + 1]
                  }), tenagaAhli.length > 1 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    type: "button",
                    onClick: () => removeTenagaAhli(i),
                    className: "text-xs text-red-500 hover:text-red-700 flex items-center gap-1",
                    renderId: "render-7afada02",
                    as: "button",
                    children: [/* @__PURE__ */ jsx("svg", {
                      className: "w-3.5 h-3.5",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M6 18L18 6M6 6l12 12",
                        renderId: "render-05547545",
                        as: "path"
                      })
                    }), "Hapus"]
                  })]
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "grid grid-cols-1 md:grid-cols-3 gap-3",
                  renderId: "render-1871a8a7",
                  as: "div",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-00311149",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                      renderId: "render-c5a35eba",
                      as: "label",
                      children: "Nama Lengkap *"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: ta.nama,
                      onChange: setTA(i, "nama"),
                      placeholder: "Nama tenaga ahli",
                      className: inputCls,
                      renderId: "render-2891f4ff",
                      as: "input"
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-e736fa47",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                      renderId: "render-1b949a2d",
                      as: "label",
                      children: "Bidang Keahlian *"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: ta.bidang,
                      onChange: setTA(i, "bidang"),
                      placeholder: "e.g. Sipil, Arsitektur",
                      className: inputCls,
                      renderId: "render-355bcb18",
                      as: "input"
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-33b77f90",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                      renderId: "render-daccf338",
                      as: "label",
                      children: "Jenis Sertifikat"
                    }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      value: ta.jenisSertifikat,
                      onChange: setTA(i, "jenisSertifikat"),
                      className: selectCls,
                      renderId: "render-049e3c95",
                      as: "select",
                      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        value: "",
                        renderId: "render-b2f07e2b",
                        as: "option",
                        children: "Pilih Jenis"
                      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        value: "SKA",
                        renderId: "render-5d72cdeb",
                        as: "option",
                        children: "SKA (Sertifikat Keahlian)"
                      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        value: "SKT",
                        renderId: "render-38b7d9b9",
                        as: "option",
                        children: "SKT (Sertifikat Ketrampilan)"
                      })]
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-dcddf1f1",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                      renderId: "render-3eb78143",
                      as: "label",
                      children: "Nomor Sertifikat"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      value: ta.noSertifikat,
                      onChange: setTA(i, "noSertifikat"),
                      placeholder: "Nomor SKA/SKT",
                      className: inputCls,
                      renderId: "render-cb2b3f1b",
                      as: "input"
                    })]
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    renderId: "render-77643987",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                      renderId: "render-a0cf92f3",
                      as: "label",
                      children: "Masa Berlaku"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      type: "date",
                      value: ta.berlaku,
                      onChange: setTA(i, "berlaku"),
                      className: inputCls,
                      renderId: "render-25f78f6f",
                      as: "input"
                    })]
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    renderId: "render-3a6f758f",
                    as: "div",
                    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      renderId: "render-07813c1b",
                      as: "div",
                      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                        className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                        renderId: "render-7bc3cd67",
                        as: "label",
                        children: "Tingkat"
                      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                        value: ta.tingkat,
                        onChange: setTA(i, "tingkat"),
                        className: selectCls,
                        renderId: "render-cbfdc97f",
                        as: "select",
                        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          value: "",
                          renderId: "render-b99f2f48",
                          as: "option",
                          children: "Pilih Tingkat"
                        }), ["Muda", "Madya", "Utama", "Terampil"].map((v) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                          value: v,
                          renderId: "render-f102f8be",
                          as: "option",
                          children: v
                        }, v))]
                      })]
                    })
                  }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "md:col-span-3",
                    renderId: "render-e3d95e40",
                    as: "div",
                    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      className: "block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wide",
                      renderId: "render-303b0fc5",
                      as: "label",
                      children: "Upload Sertifikat SKA/SKT *"
                    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                      type: "file",
                      onChange: handleFileChange("docSertifikat", i),
                      accept: ".pdf,.jpg,.jpeg,.png",
                      className: fileCls,
                      renderId: "render-98e9ce06",
                      as: "input"
                    }), ta.docSertifikat && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                      className: "text-[10px] text-green-600 mt-1 font-medium",
                      renderId: "render-245b7a9a",
                      as: "p",
                      children: ["✓ ", ta.docSertifikat.name]
                    })]
                  })]
                })]
              }, i)), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                type: "button",
                onClick: addTenagaAhli,
                className: "flex items-center gap-2 text-sm text-[#1a3a6b] font-semibold py-3 px-4 border-2 border-dashed border-[#1a3a6b] rounded-xl hover:bg-blue-50 transition w-full justify-center",
                renderId: "render-a47cc937",
                as: "button",
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-5 h-5",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M12 4v16m8-8H4",
                    renderId: "render-81f2793b",
                    as: "path"
                  })
                }), "Tambah Tenaga Ahli"]
              })]
            })]
          }), activeTab === "rekening" && /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(SectionHeader, {
              icon: TABS[6].icon,
              title: "Rekening Bank Perusahaan",
              subtitle: "Informasi rekening resmi atas nama perusahaan"
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "grid grid-cols-1 md:grid-cols-2 gap-4",
              renderId: "render-c0bf0a02",
              as: "div",
              children: [/* @__PURE__ */ jsx(Field, {
                label: "Nama Bank",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  value: form.bankNama,
                  onChange: set("bankNama"),
                  className: selectCls,
                  renderId: "render-9221ccd5",
                  as: "select",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: "",
                    renderId: "render-0c76db1f",
                    as: "option",
                    children: "Pilih Bank"
                  }), ["Bank Papua", "Bank BRI", "Bank Mandiri", "Bank BNI", "Bank BTN", "Bank BCA", "Bank Muamalat", "Bank Syariah Indonesia (BSI)", "Lainnya"].map((v) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    value: v,
                    renderId: "render-5fa1d1e2",
                    as: "option",
                    children: v
                  }, v))]
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Cabang / Unit",
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.bankCabang,
                  onChange: set("bankCabang"),
                  placeholder: "Nama cabang bank",
                  className: inputCls,
                  renderId: "render-82a561d1",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Nomor Rekening",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.bankNoRek,
                  onChange: set("bankNoRek"),
                  placeholder: "Nomor rekening perusahaan",
                  className: inputCls,
                  renderId: "render-4cb22b09",
                  as: "input"
                })
              }), /* @__PURE__ */ jsx(Field, {
                label: "Atas Nama Rekening",
                required: true,
                half: true,
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  value: form.bankAtasNama,
                  onChange: set("bankAtasNama"),
                  placeholder: "Nama pemilik rekening",
                  className: inputCls,
                  renderId: "render-a5d40672",
                  as: "input"
                })
              }), /* @__PURE__ */ jsxs(Field, {
                label: "Upload Buku Tabungan / Surat Bank (PDF/JPG)",
                required: true,
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  type: "file",
                  onChange: handleFileChange("docRekening"),
                  accept: ".pdf,.jpg,.jpeg,.png",
                  className: fileCls,
                  renderId: "render-e30448cb",
                  as: "input"
                }), files.docRekening && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "text-[10px] text-green-600 mt-1 font-medium",
                  renderId: "render-f36ac763",
                  as: "p",
                  children: ["✓ ", files.docRekening.name]
                })]
              })]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "mt-8 bg-blue-50 rounded-xl p-5 border border-blue-100",
              renderId: "render-e7da9bf8",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm font-bold text-[#1a3a6b] mb-3",
                renderId: "render-233eb91f",
                as: "h4",
                children: "Ringkasan Data yang Akan Disimpan:"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "grid grid-cols-2 gap-x-6 gap-y-1 text-sm",
                renderId: "render-f4e46619",
                as: "div",
                children: [["Perusahaan", form.namaPerusahaan || "—"], ["Jenis Usaha", form.jenisUsaha || "—"], ["Direktur", form.namaDirektur || "—"], ["NPWP Direktur", form.npwpDirekturNo || "—"], ["NPWP Perusahaan", form.npwpPerusahaanNo || "—"], ["No. SIUJK", form.siujkNo || "—"], ["Kualifikasi", form.siujkKualifikasi || "—"], ["SMK3", form.smk3No || "—"], ["Tenaga Ahli", `${tenagaAhli.filter((t) => t.nama).length} orang`], ["Rekening", form.bankNoRek ? `${form.bankNama} — ${form.bankNoRek}` : "—"]].map(([k, v]) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "flex gap-2",
                  renderId: "render-e8de44d1",
                  as: "div",
                  children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                    className: "text-gray-500 w-36 flex-shrink-0",
                    renderId: "render-dfafcb44",
                    as: "span",
                    children: [k, ":"]
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "font-semibold text-gray-800 truncate",
                    renderId: "render-9630d3db",
                    as: "span",
                    children: v
                  })]
                }, k))
              })]
            })]
          })]
        }), result && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `rounded-xl p-4 mb-5 flex items-start gap-3 text-sm ${result.ok ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`,
          renderId: "render-b335e955",
          as: "div",
          children: [/* @__PURE__ */ jsx("svg", {
            className: "w-5 h-5 flex-shrink-0 mt-0.5",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: result.ok ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              renderId: "render-0c6df12b",
              as: "path"
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-0a96ef5e",
            as: "p",
            children: result.message
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center justify-between",
          renderId: "render-d85904d7",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => setActiveTab(TABS[Math.max(0, currentTabIdx - 1)].id),
            disabled: currentTabIdx === 0,
            className: "flex items-center gap-2 px-5 h-11 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition disabled:opacity-40",
            renderId: "render-5610c8e4",
            as: "button",
            children: [/* @__PURE__ */ jsx("svg", {
              className: "w-4 h-4",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M15 19l-7-7 7-7",
                renderId: "render-2da34a41",
                as: "path"
              })
            }), "Sebelumnya"]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "flex gap-3",
            renderId: "render-ecdc1442",
            as: "div",
            children: currentTabIdx < TABS.length - 1 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              type: "button",
              onClick: () => setActiveTab(TABS[currentTabIdx + 1].id),
              className: "flex items-center gap-2 px-6 h-11 text-white rounded-xl text-sm font-bold transition",
              style: {
                background: "linear-gradient(135deg, #1a3a6b, #2563eb)"
              },
              renderId: "render-ec315446",
              as: "button",
              children: ["Selanjutnya", /* @__PURE__ */ jsx("svg", {
                className: "w-4 h-4",
                fill: "none",
                viewBox: "0 0 24 24",
                stroke: "currentColor",
                children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M9 5l7 7-7 7",
                  renderId: "render-6276dc32",
                  as: "path"
                })
              })]
            }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "submit",
              disabled: submitting,
              className: "flex items-center gap-2 px-7 h-11 text-white rounded-xl text-sm font-bold transition active:scale-[0.98] disabled:opacity-60",
              style: {
                background: "linear-gradient(135deg, #166534, #16a34a)"
              },
              renderId: "render-2b63249c",
              as: "button",
              children: submitting ? /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsxs("svg", {
                  className: "animate-spin w-4 h-4",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4",
                    renderId: "render-7a02d915",
                    as: "circle"
                  }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8v8z",
                    renderId: "render-940cf978",
                    as: "path"
                  })]
                }), "Menyimpan..."]
              }) : /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx("svg", {
                  className: "w-4 h-4",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  stroke: "currentColor",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12",
                    renderId: "render-6a654f6b",
                    as: "path"
                  })
                }), "Simpan & Kirim ke Spreadsheet"]
              })
            })
          })]
        })]
      }), records.length > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-8",
        renderId: "render-df7d2614",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-base font-bold text-gray-900 mb-4",
          renderId: "render-ef6732b0",
          as: "h3",
          children: ["Data Kontraktor yang Telah Diinput (", records.length, ")"]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "overflow-x-auto",
          renderId: "render-7c0569ff",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "w-full text-sm",
            renderId: "render-7976e37f",
            as: "table",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-17528b6e",
              as: "thead",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-left text-xs uppercase text-gray-400 bg-gray-50 border-b",
                renderId: "render-3105c8ce",
                as: "tr",
                children: ["No", "Nama Perusahaan", "Direktur", "Jenis Usaha", "SIUJK Klasifikasi", "Waktu Input"].map((h) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "py-3 px-3 font-semibold whitespace-nowrap",
                  renderId: "render-bebf90b6",
                  as: "th",
                  children: h
                }, h))
              })
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              renderId: "render-6f3cc9b5",
              as: "tbody",
              children: records.map((r, i) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                className: "border-b border-gray-50 hover:bg-blue-50/30 transition",
                renderId: "render-c39b547b",
                as: "tr",
                children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "py-3 px-3 text-gray-400 text-center",
                  renderId: "render-07372fe5",
                  as: "td",
                  children: i + 1
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "py-3 px-3 font-semibold text-[#1a3a6b]",
                  renderId: "render-fd5b54aa",
                  as: "td",
                  children: r.namaPerusahaan
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "py-3 px-3 text-gray-700",
                  renderId: "render-b57fe3d9",
                  as: "td",
                  children: r.namaDirektur
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "py-3 px-3",
                  renderId: "render-80dfe43f",
                  as: "td",
                  children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                    className: "bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full",
                    renderId: "render-c2d25b1a",
                    as: "span",
                    children: r.jenisUsaha
                  })
                }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
                  className: "py-3 px-3 text-gray-600",
                  renderId: "render-571d1b4d",
                  as: "td",
                  children: [r.siujkKlasifikasi, " — ", r.siujkKualifikasi]
                }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                  className: "py-3 px-3 text-gray-400 text-xs",
                  renderId: "render-0599786f",
                  as: "td",
                  children: r.waktuInput
                })]
              }, r.id || i))
            })]
          })
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "mt-12 border-t border-gray-200 bg-white py-5",
      renderId: "render-45a6efe1",
      as: "footer",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2",
        renderId: "render-5493c5a6",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-2842caf8",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: logoPBD,
            alt: "",
            className: "w-6 h-6 object-contain",
            renderId: "render-3201a42b",
            as: "img"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs text-gray-500",
            renderId: "render-e5be626a",
            as: "span",
            children: "Dinas PUPR Provinsi Papua Barat Daya"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-400",
          renderId: "render-0d5db369",
          as: "p",
          children: 'Sistem Pendataan Kontraktor OAP — © 2025 — "Bersatu Membangun Negeri"'
        })]
      })
    })]
  });
}

const page = UNSAFE_withComponentProps(function WrappedPage(props) {
  return /* @__PURE__ */jsx(RootLayout, {
    children: /* @__PURE__ */jsx(DashboardPage, {
      ...props
    })
  });
});

const route11 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/**/page.{js,jsx,ts,tsx}");
  return {
    path: `/${params["*"]}`,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path === "/" ? "Homepage" : path;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-7df921a1",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-852a2291",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-e9dd83c5",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-d9255957",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-06097189",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-17cc7e69",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-282173dc",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-1c58abd8",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-fc9d4adc",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-37340efa",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-a926e3ea",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-272d1309",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-1c3172c6",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-8773e85e",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-5425d129",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-f420ab97",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-b97b85cd",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-c78888c4",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-7f76fc79",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-82050406",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-28d90290",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-f3f3edc2",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-611d607d",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-15b88ac6",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-1d465bc9",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-6749ac71",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-7a0a961a",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-674f6c25",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-3b491927",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-1a047159",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-8637c702",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-9e361490",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-97661c8d",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-cbee0c11",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-5d9d7462",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-8a67b1fb",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route12 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-HHC5BQds.js','imports':['/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/index-BznDj7aO.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/root-BtCFOZYZ.js','imports':['/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/index-BznDj7aO.js','/assets/PolymorphicComponent-DDE2kZdg.js','/assets/react-B1_RP8Ul.js'],'css':['/assets/root-8GWqgzpy.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-B7UXS30-.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/users-P0WKRRdv.js','/assets/file-text-BpNe9mQN.js','/assets/clock-CB8VxAQC.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/logout/page':{'id':'account/logout/page','parentId':'root','path':'account/logout','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-kzfOGdzm.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signin/page':{'id':'account/signin/page','parentId':'root','path':'account/signin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-Bbq0qc8P.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/react-B1_RP8Ul.js','/assets/logo-papua-barat-daya-jIY4wwmQ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'account/signup/page':{'id':'account/signup/page','parentId':'root','path':'account/signup','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-2DiaBRLt.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/react-B1_RP8Ul.js','/assets/logo-papua-barat-daya-jIY4wwmQ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/contractors/page':{'id':'admin/contractors/page','parentId':'root','path':'admin/contractors','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DU3wGDNX.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/arrow-left-DDvIOLzU.js','/assets/circle-x-Dw6gwPEr.js','/assets/clock-CB8VxAQC.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/contractors/[id]/page':{'id':'admin/contractors/[id]/page','parentId':'root','path':'admin/contractors/:id','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-DcD1daXz.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/arrow-left-DDvIOLzU.js','/assets/clock-CB8VxAQC.js','/assets/circle-x-Dw6gwPEr.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/dashboard/page':{'id':'admin/dashboard/page','parentId':'root','path':'admin/dashboard','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-CzEu5tYC.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/arrow-left-DDvIOLzU.js','/assets/users-P0WKRRdv.js','/assets/clock-CB8VxAQC.js','/assets/circle-x-Dw6gwPEr.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'admin/make-first-admin/page':{'id':'admin/make-first-admin/page','parentId':'root','path':'admin/make-first-admin','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-Dw9PMWQA.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'contractor/profile/page':{'id':'contractor/profile/page','parentId':'root','path':'contractor/profile','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-t01Gdevo.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/arrow-left-DDvIOLzU.js','/assets/file-text-BpNe9mQN.js','/assets/circle-x-Dw6gwPEr.js','/assets/clock-CB8VxAQC.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'contractor/register/page':{'id':'contractor/register/page','parentId':'root','path':'contractor/register','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page--YO1pGsE.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/createLucideIcon-BGIhaqTb.js','/assets/arrow-left-DDvIOLzU.js','/assets/react-B1_RP8Ul.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'dashboard/page':{'id':'dashboard/page','parentId':'root','path':'dashboard','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/page-C-KAd-gK.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js','/assets/layout-CszGJ7B2.js','/assets/react-B1_RP8Ul.js','/assets/logo-papua-barat-daya-jIY4wwmQ.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*?','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasDefaultExport':true,'hasErrorBoundary':false,'module':'/assets/not-found-B1sDuxDb.js','imports':['/assets/PolymorphicComponent-DDE2kZdg.js','/assets/chunk-LFPYN7LY-B4Ti7GfX.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-027d895a.js','version':'027d895a','sri':undefined};

const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":false,"unstable_subResourceIntegrity":false,"unstable_trailingSlashAwareDataRequests":false,"unstable_previewServerPrerendering":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = ["/*?"];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "account/logout/page": {
          id: "account/logout/page",
          parentId: "root",
          path: "account/logout",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        },
  "account/signin/page": {
          id: "account/signin/page",
          parentId: "root",
          path: "account/signin",
          index: undefined,
          caseSensitive: undefined,
          module: route3
        },
  "account/signup/page": {
          id: "account/signup/page",
          parentId: "root",
          path: "account/signup",
          index: undefined,
          caseSensitive: undefined,
          module: route4
        },
  "admin/contractors/page": {
          id: "admin/contractors/page",
          parentId: "root",
          path: "admin/contractors",
          index: undefined,
          caseSensitive: undefined,
          module: route5
        },
  "admin/contractors/[id]/page": {
          id: "admin/contractors/[id]/page",
          parentId: "root",
          path: "admin/contractors/:id",
          index: undefined,
          caseSensitive: undefined,
          module: route6
        },
  "admin/dashboard/page": {
          id: "admin/dashboard/page",
          parentId: "root",
          path: "admin/dashboard",
          index: undefined,
          caseSensitive: undefined,
          module: route7
        },
  "admin/make-first-admin/page": {
          id: "admin/make-first-admin/page",
          parentId: "root",
          path: "admin/make-first-admin",
          index: undefined,
          caseSensitive: undefined,
          module: route8
        },
  "contractor/profile/page": {
          id: "contractor/profile/page",
          parentId: "root",
          path: "contractor/profile",
          index: undefined,
          caseSensitive: undefined,
          module: route9
        },
  "contractor/register/page": {
          id: "contractor/register/page",
          parentId: "root",
          path: "contractor/register",
          index: undefined,
          caseSensitive: undefined,
          module: route10
        },
  "dashboard/page": {
          id: "dashboard/page",
          parentId: "root",
          path: "dashboard",
          index: undefined,
          caseSensitive: undefined,
          module: route11
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*?",
          index: undefined,
          caseSensitive: undefined,
          module: route12
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
