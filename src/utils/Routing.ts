import { IRoutItem, IRoutOptions } from "../types/index";

class Router {
  private routes: IRoutItem[];
  private mode: string;
  private root: string;

  constructor(options: IRoutOptions) {
    this.routes = [];
    this.mode = options.mode;
    this.root = "/";

    if (options.root) {
      this.root = options.root;
      // this.listen();
    }
  }

  add = (path: RegExp | string, cb: (param?: string) => void) => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: RegExp | string) => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (this.routes[i].path === path) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = () => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: RegExp | string) =>
    path.toString().replace(/\/$/, "").replace(/^\//, "");

  getFragment = () => {
    let fragment = "";
    if (this.mode === "history") {
      fragment = this.clearSlashes(
        decodeURI(window.location.pathname + window.location.search)
      );
      fragment = fragment.replace(/\?(.*)$/, "");
      fragment = this.root !== "/" ? fragment.replace(this.root, "") : fragment;
    } else {
      const match: string[] | null = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : "";
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = "") => {
    if (this.mode === "history") {
      window.history.pushState(null, "", this.root + this.clearSlashes(path));
    } else {
      window.location.href = `${window.location.href.replace(
        /#(.*)$/,
        ""
      )}#${path}`;
    }
    return this;
  };

  // listen = () => {
  //   clearInterval(this.interval) ;
  //   this.interval = setInterval(this.interval, 50);
  // };

  // interval = () => {
  //   if (this.current === this.getFragment()) return;
  //   this.current = this.getFragment();

  //   this.routes.some((route) => {
  //     const match = this.current.match(route.path);
  //     if (match) {
  //       match.shift();
  //       route.cb.apply({}, match);
  //       return match;
  //     }
  //     return false;
  //   });
  // };
}

export default Router;
