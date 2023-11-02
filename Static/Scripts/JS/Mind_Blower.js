/**
 * The main script that will initialize the application as
 * needed
 */
class Mind_Blower {
    /**
     * Setting the data needed as well as initalizing the application
     * @returns {Mind_Blower}
     */
    constructor() {
        /**
         * The request URI of the page needed
         * @type {string}
         */
        this.__requestUniformRequestInformation;
        /**
         * The ID of the body
         * @type {string}
         */
        this.__bodyId;
        /**
         * Stylesheets of the application
         * @type {string[]}
         */
        this._stylesheets = [
            "/Static/Stylesheets/Mind_Blower.css",
            "/Static/Stylesheets/desktop.css",
            "/Static/Stylesheets/mobile.css",
            "/Static/Stylesheets/tablet.css",
        ];
        /**
         * Relationship of the object
         * @type {string}
         */
        this.__relationship;
        /**
         * MIME Type of the object
         * @type {string}
         */
        this.__mimeType;
        /**
         * Media queries for the stylesheets
         * @type {string[]}
         */
        this._mediaQueries = [
            "screen and (min-width: 1024px)",
            "screen and (min-width: 640px) and (max-width: 1023px)",
            "screen and (max-width: 639px)",
        ];
        /**
         * The body of the page
         * @type {HTMLBodyElement}
         */
        this.__body;
        /**
         * The root element of the application.
         * @type {HTMLElement|null}
         */
        this.__root;
        /**
         * The name of the application
         * @type {string}
         */
        this.__name;
        /**
         * The assets of the application
         * @type {string[]}
         */
        this.__assets;
        this.init();
        this.install();
    }

    /**
     * @returns {string}
     */
    getRequestURI() {
        return this.__requestUniformRequestInformation;
    }

    /**
     * @param {string} request_uri
     * @returns {void}
     */
    setRequestURI(request_uri) {
        this.__requestUniformRequestInformation = request_uri;
    }

    /**
     * @returns {string}
     */
    getBodyId() {
        return this.__bodyId;
    }

    /**
     * @param {string} body_id
     * @returns {void}
     */
    setBodyId(body_id) {
        this.__bodyId = body_id;
    }

    /**
     * @returns {string}
     */
    getRelationship() {
        return this.__relationship;
    }

    /**
     * @param {string} relationship
     * @returns {void}
     */
    setRelationship(relationship) {
        this.__relationship = relationship;
    }

    /**
     * @returns {string}
     */
    getMimeType() {
        return this.__mimeType;
    }

    /**
     * @param {string} mime_type
     * @returns {void}
     */
    setMimeType(mime_type) {
        this.__mimeType = mime_type;
    }

    /**
     * @returns {HTMLBodyElement}
     */
    getBody() {
        return this.__body;
    }

    /**
     * @param {HTMLBodyElement} body
     * @returns {void}
     */
    setBody(body) {
        this.__body = body;
    }

    /**
     * @returns {HTMLElement|null}
     */
    getRoot() {
        return this.__root;
    }

    /**
     * @param {HTMLElement|null} root
     * @returns {void}
     */
    setRoot(root) {
        this.__root = root;
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.__name;
    }

    /**
     * @param {string} name
     * @returns {void}
     */
    setName(name) {
        this.__name = name;
    }

    /**
     * @returns {string[]}
     */
    getAssets() {
        return this.__assets;
    }

    /**
     * @param {string[]} assets
     * @returns {void}
     */
    setAssets(assets) {
        this.__assets = assets;
    }

    /**
     * Initializing the application
     * @returns {void}
     */
    init() {
        this.setRequestURI(window.location.pathname);
        this.setBody(document.body);
        this.setRoot(document.querySelector(":root"));
        this.setName("Mind-Blower-v0.0.0");
        this.setAssets([]);
        fetch(this.getRequestURI(), {
            method: "HEAD",
        })
        .then((response) => this.handleHeadResponse(response.status));
        this.style();
    }

    /**
     * Verifying the request status of the of the request to be
     * able to initialize the application correctly.
     * @param {number} status_code
     * @returns {void}
     */
    handleHeadResponse(status_code) {
        this.getBody().setAttribute("status", status_code);
        if (status_code == 200) {
            this.verifyRoute();
        }
    }

    /**
     * Verifying the request uniform resource locator of the
     * route.
     * @returns {void}
     */
    verifyRoute() {
        if (this.getRequestURI() == "/") {
            this.setBodyId("Homepage");
        } else {
            this.setBodyId(this.getRequestURI().replaceAll("/", ""));
        }
        this.getBody().id = this.getBodyId();
    }

    /**
     * Styling the application
     * @returns {void}
     */
    style() {
        this.setRelationship("stylesheet");
        this.setMimeType("text/css");
        for (let index = 0; index < this._stylesheets.length; index++) {
            const link = document.createElement("link");
            link.href = this._stylesheets[index];
            if (link.href.includes("desktop")) {
                link.media = this._mediaQueries[0];
            } else if (link.href.includes("mobile")) {
                link.media = this._mediaQueries[2];
            } else if (link.href.includes("tablet")) {
                link.media = this._mediaQueries[1];
            }
            link.rel = this.getRelationship();
            link.type = this.getMimeType();
            document.head.appendChild(link);
        }
        this.resizeApplication();
    }

    /**
     * Resizing the application which depends on the client's size
     * @returns {void}
     */
    resizeApplication() {
        const height = `${this.getRoot().clientHeight}px`;
        const width = `${this.getRoot().clientWidth}px`;
        this.getRoot().style.setProperty("--height", height);
        this.getRoot().style.setProperty("--width", width);
        this.setColorScheme();
    }

    /**
     * Verifying the preferred color scheme of the user in order to
     * set the default application's color scheme.
     * @returns {void}
     */
    setColorScheme() {
        let color1 = "";
        let color2 = "";
        let color3 = "";
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            color1 = "rgb(calc(var(--percentage) * (255 / 255)), calc(var(--percentage) * (255 / 255)), calc(var(--percentage) * (192 / 255)))";
            color2 = "rgb(calc(var(--percentage) * (185 / 255)), calc(var(--percentage) * (0 / 255)), calc(var(--percentage) * (255 / 255)))";
            color3 = "rgb(calc(var(--percentage) * (0 / 255)), calc(var(--percentage) * (0 / 255)), calc(var(--percentage) * (82 / 255)))";
        } else {
            color1 = "rgb(calc(var(--percentage) * (185 / 255)), calc(var(--percentage) * (0 / 255)), calc(var(--percentage) * (255 / 255)))";
            color2 = "rgb(calc(var(--percentage) * (255 / 255)), calc(var(--percentage) * (255 / 255)), calc(var(--percentage) * (192 / 255)))";
            color3 = "rgb(calc(var(--percentage) * (0 / 255)), calc(var(--percentage) * (0 / 255)), calc(var(--percentage) * (82 / 255)))";
        }
        this.getRoot().style.setProperty("--color1", color1);
        this.getRoot().style.setProperty("--color2", color2);
        this.getRoot().style.setProperty("--color3", color3);
    }
    
    /**
     * Allowing the application to be installed by the web-browser
     * @returns {void}
     */
    install() {
        this.getAssets().push(
            "/",
            "/Templates/Template.html",
            "/Static/Stylesheets/Mind_Blower.css",
            "/Static/Stylesheets/desktop.css",
            "/Static/Stylesheets/mobile.css",
            "/Static/Stylesheets/tablet.css",
            "/Static/Scripts/JS/Mind_Blower.js",
            "/Static/SVG/Logo.svg",
            "/Components/Header.js",
            "/Components/Main.js",
            "/Components/Footer.js",
        );
        self.addEventListener("install", installEvent => {
            installEvent.waitUntil(
                caches.open(this.getName())
                .then((cache) => cache.addAll(this.getAssets()))
            )
        });
    }
}
const application = new Mind_Blower();