/**
 * The Header component of the application.
 */
class Header extends React.Component {
    /**
     * Initializing the component which will import set the data
     * needed to operate
     * @returns {Header}
     */
    constructor(props) {
        super(props);
        /**
         * The states of the application
         * @type {{ System: { route: string, color_scheme: string, status: number } }}
         */
        this.state = {
            System: {
                route: "",
                color_scheme: "",
                status: 200,
            },
        };
    }
    
    /**
     * Running the methods needed as soon as the component has been
     * successfully mounted.
     * @returns {void}
     */
    componentDidMount() {
        this.getRoute();
        this.getStatus();
    }

    /**
     * Setting the view route of the application.
     * @returns {void}
     */
    getRoute() {
        this.setState((previous) => ({
            System: {
                ...previous.System,
                route: window.location.pathname,
            },
        }));
    }
    
    /**
     * Retrieve the Status of the page.
     * @returns {void}
     */
    getStatus() {
        this.setState((previous) => ({
            System: {
                ...previous.System,
                status: Number(document.body.attributes["status"].value)
            }
        }));
    }

    /**
     * Verifying the path name of the application to render the
     * component correctly.
     * @returns {HTMLHeaderElement}
     */
    verifyRoute() {
        if (this.state.System.route == "/" || this.state.System.route == "" || this.state.System.route.includes("/Access")) {
            return <Homepage />;
        }
    }
    
    /**
     * Renders the components that are being returned
     * @returns {HTMLHeaderElement}
     */
    render() {
        if (this.state.System.status == 200) {
            return this.verifyRoute();
        } else {
            return this.handleError();
        }
    }
}

/**
 * The component to be rendered for the homepage.
 */
class Homepage extends Header {
    render() {
        return (
            <>
                <nav>
                    <div>
                        <a href="/">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsLink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xmlSpace="preserve">
                                <g>
                                    <path d="M65.656,56.521c0.119,0.029,0.208,0.029,0.297,0.029c3.889,0.416,7.689,1.068,11.489,2.02   c3.414,0.86,6.71,2.227,9.767,4.066c0.951,0.623,1.574,1.662,1.574,2.82c0,1.129-0.623,2.197-1.574,2.762   c-3.057,1.84-6.353,3.205-9.767,4.066c-3.8,0.95-7.601,1.662-11.489,2.049c-5.284,0.534-10.628,0.831-15.942,0.831   c-5.344,0-10.658-0.297-15.972-0.831c-3.83-0.387-7.689-1.099-11.43-2.049c-3.474-0.861-6.769-2.227-9.797-4.066   c-0.98-0.564-1.574-1.633-1.574-2.762c0-1.158,0.594-2.197,1.574-2.82c3.028-1.84,6.323-3.206,9.797-4.066   c3.74-0.951,7.6-1.604,11.43-2.02c0.119,0,0.237,0,0.297-0.029l0.742,5.433c-1.069,0.118-2.108,0.267-3.117,0.415   c-2.286,0.416-4.542,1.039-6.709,1.93c-0.445,0.209-0.772,0.654-0.772,1.158c0,0.475,0.327,0.95,0.772,1.129   c2.167,0.86,4.423,1.514,6.709,1.899c2.197,0.356,4.394,0.624,6.59,0.831L36.474,53.7c-1.098-0.653-2.197-1.426-3.176-2.256   c-4.898,3.057-10.896,3.829-16.417,2.137C6.371,50.345,0.493,39.183,3.758,28.703c3.266-10.479,14.398-16.358,24.878-13.092   c1.633-2.286,3.651-4.305,5.908-5.938c11.786-8.52,28.263-5.878,36.812,5.938c5.552-1.751,11.519-0.95,16.417,2.108   c9.322,5.819,12.172,18.08,6.354,27.402c-5.818,9.292-18.08,12.142-27.402,6.324c-1.009,0.83-2.107,1.603-3.205,2.256   l-2.078,15.615c2.227-0.207,4.423-0.475,6.619-0.831c2.287-0.386,4.514-1.039,6.71-1.899c0.476-0.179,0.742-0.654,0.742-1.129   c0-0.504-0.267-0.949-0.742-1.158c-2.196-0.891-4.423-1.514-6.71-1.93c-1.039-0.148-2.078-0.297-3.087-0.415L65.656,56.521z" fill="red"/>
                                </g>
                                <g>
                                    <path d="M35.494,78.133c-3.622,2.138-6.709,5.077-9.084,8.55c-4.423-0.861-8.698,2.02-9.56,6.442   c-0.148,0.742-0.208,1.454-0.148,2.196h66.589c0.355-4.482-2.998-8.431-7.512-8.758c-0.712-0.059-1.454-0.029-2.196,0.119   c-2.345-3.473-5.462-6.412-9.055-8.55C54.939,79.944,45.083,79.944,35.494,78.133z" fill="red"/>
                                </g>
                            </svg>
                        </a>
                    </div>
                    <div>
                        <a href="/Access">
                            <i class="fa-solid fa-user"></i>
                        </a>
                    </div>
                </nav>
            </>
        );
    }
}

/**
 * The component to be rendered when content is not found
 */
class NotFound extends Header {
    /**
     * Renders the components that are being returned
     * @returns {HTMLHeaderElement}
     */
    render() {
        return <>HTTP/404</>;
    }
}

ReactDOM.render(<Header />, document.querySelector("header"));