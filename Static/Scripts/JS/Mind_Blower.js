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
        this.init();
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
     * Initializing the application
     * @returns {void}
     */
    init() {
        this.setRequestURI(window.location.pathname);
        this.setBody(document.body);
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
        const root = document.querySelector(":root");
        const height = `${root.clientHeight}px`;
        const width = `${root.clientWidth}px`;
        root.style.setProperty("--height", height);
        root.style.setProperty("--width", width);

    }
}
const application = new Mind_Blower();