/**
 * The Main component of the application.
 */
class Main extends React.Component {
    /**
     * Initializing the component which will import set the data
     * needed to operate
     * @returns {Main}
     */
    constructor(props) {
        super(props);
        /**
         * The states of the application
         * @type {{ System: { route: string, color_scheme: string, status: number, features: [ { logo: string, description: string } ] } }}
         */
        this.state = {
            System: {
                route: "",
                color_scheme: "",
                status: 200,
                features: [
                    {
                        logo: "fa-solid fa-phone",
                        description: "Contact Management",
                    }
                ],
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
     * @returns {HTMLMainElement}
     */
    verifyRoute() {
        if (this.state.System.route == "/" || this.state.System.route == "") {
            return <Homepage />;
        } else if (this.state.System.route.includes("/Access")) {
            return <Access />;
        }
    }

    /**
     * Renders the components that are being returned
     * @returns {HTMLMainElement}
     */
    render() {
        if (this.state.System.status == 404) {
            return <NotFound />;
        } else {
            return this.verifyRoute();
        }
    }
}

/**
 * The component to be rendered for the Homepage.
 */
class Homepage extends Main {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <>
                Welcome to Mind Blower.  It is a CRM that will help you to manage the relationships with your customers.
            </>
        );
    }
}

/**
 * The component to be rendered for the pages that are related
 * the access portal.
 */
class Access extends Main {
    constructor(props) {
        super(props);
    }

    /**
     * Verifying the route of the state during the Access Portal to
     * render the correct Portal.
     * @returns {HTMLDivElement}
     */
    verifyAccess() {
        if (this.state.System.route == "/Access") {
            return (
                <div class={this.state.System.route.replace("/", "")}>
                    <div>In order to use the system you need to have an account.</div>
                    <div>
                        <div>
                            <a href="/Access/Login">Login</a>
                        </div>
                        <div>
                            <a href="/Access/Register">Register</a>
                        </div>
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <>
                <div>
                    <div>Features of the application</div>
                    <Features />
                </div>
                {this.verifyAccess()}
            </>
        );
    }
}

/**
 * The component that will render the features that the
 * application offers.
 */
class Features extends Access {
    constructor(props) {
        super(props);
    }

    /**
     * Rendering the features of the application dynamically.
     * @param {{ logo: string, description: string }} feature
     * @returns {HTMLDivElement}
     */
    renderFeature(feature) {
        return (
            <div>
                <div>
                    <i class={feature.logo}></i>
                </div>
                <div>{feature.description}</div>
            </div>
        );
    }

    render() {
        return (
            <div class="Features">
                {this.state.System.features.map((feature) => this.renderFeature(feature))}
            </div>
        );
    }
}

/**
 * The component to be rendered when content is not found
 */
class NotFound extends Main {
    /**
     * Renders the components that are being returned
     * @returns {HTMLMainElement}
     */
    render() {
        return <>The content does not exist!</>;
    }
}

ReactDOM.render(<Main />, document.querySelector("main"));